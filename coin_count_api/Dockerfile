# Use the official Node.js image as the base image
FROM node as builder

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package.json ./

# Install dependencies in the container
RUN npm ci --only=production

# Copy the rest of your project's files into the container
COPY . .

# Use TypeScript compiler to build the project
RUN npm run build

# Use a Node.js image to run the application
FROM node as runner
WORKDIR /app

# Copy the build output from the builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expose the port the API server listens on
EXPOSE 5036

# Define the command to run your application
CMD ["npm", "run", "start"]
