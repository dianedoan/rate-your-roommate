# Use Node.js LTS image
FROM node:16

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire frontend source code
COPY . .

# Expose the port for the React development server
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
