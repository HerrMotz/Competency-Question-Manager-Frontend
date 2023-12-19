# Use the official Node.js image as the base image
FROM node:latest

WORKDIR /app

# Install all dependencies from package.json
RUN npm install

# Build the application using npm run build
RUN npm run dev

EXPOSE 5173