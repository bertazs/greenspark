# Use an official Node.js LTS (Long Term Support) image as the base image
FROM node:lts

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application source code to the container
COPY . .

# Build the Vue 3 app
RUN npm run build

# Install the 'serve' package globally
RUN npm install -g serve@14.2.1

# Expose the port that your Vue 3 app will run on (for example, 80)
EXPOSE 80

# Command to start the web server
CMD ["serve", "-s", "dist"]
