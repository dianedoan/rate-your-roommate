# Use Node.js LTS image
FROM node:16

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json into the container
COPY ./package*.json /app/

# Set the working directory to /app
WORKDIR /app

# Install dependencies
RUN npm install && npm install react-bootstrap bootstrap

# Copy the entire frontend directory (including public, src, etc.) into the container
COPY ./ /app/

# Expose the port for the React development server
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
