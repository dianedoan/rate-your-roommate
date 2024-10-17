# Use Node.js LTS image
FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire backend source code
COPY . .

# Expose the port defined in your .env file or the default port
EXPOSE 5000

# Start the application
CMD ["npm", "run", "dev"]
