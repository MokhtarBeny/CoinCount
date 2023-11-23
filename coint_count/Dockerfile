# Step 1: Use the official Node.js 16 image as the base image
FROM node as builder

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy the package.json and package-lock.json files
COPY package.json ./

# Step 4: Install dependencies in the container
RUN npm ci --only=production

# Step 5: Copy the rest of your project's files into the container
COPY . .

# Step 6: Build your Next.js application
RUN npm run build

# Step 7: Use a Node.js 16 image to run the application
FROM node as runner
WORKDIR /app

# Step 8: Copy the build output from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Step 9: Expose port 3000 on the container
EXPOSE 3000

# Step 10: Define the command to run your application
CMD ["npm", "start"]
