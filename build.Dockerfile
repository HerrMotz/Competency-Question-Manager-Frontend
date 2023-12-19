# Use the official Node.js image as the base image
FROM node:latest

# Copy the package.json and package-lock.json files into the container
COPY package*.json .

# Install all dependencies from package.json
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Build the application using npm run build
RUN npm run build

# Copy the built application into the host dist directory
COPY dist dist

CMD ["echo", "Build finished. The static distribution files are located in ./dist/"]