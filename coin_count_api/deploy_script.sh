#!/bin/bash

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

# Check if the PM2 process exists and stop it if it does
if pm2 describe coinCountApi > /dev/null; then
    pm2 delete coinCountApi
fi

# Remove old backup and move current version to backup
rm -rf ~/coin_count_api_old
mv ~/coin_count_api ~/coin_count_api_old

mkdir ~/coin_count_api
tar -xzf ~/coin_count_api.tgz -C ~/coin_count_api
cd ~/coin_count_api

npm install | tee npm_install_log.txt

npm run init:env 

npm run build | tee npm_build_log.txt
if [ ${PIPESTATUS[0]} -ne 0 ]; then
    echo "Build failed, check npm_build_log.txt for details."
    exit 1
fi

# Start the application with PM2
pm2 start ./dist/index.js --name coinCountApi -f

# Add your health check logic here
# Example: curl -f http://localhost:3000/health
if [ $? -ne 0 ]; then
    echo "Health check failed. Attempting to revert to previous version."
    pm2 delete coinCountApi
    mv ~/coin_count_api_old ~/coin_count_api
    cd ~/coin_count_api
    pm2 start ./dist/index.js --name coinCountApi -f
else
    echo "Deployment successful. Cleaning up old version."
    rm -rf ~/coin_count_api_old
fi