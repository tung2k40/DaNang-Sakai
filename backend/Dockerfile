FROM node:20-alpine

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install dependencies (will run inside Alpine Linux environment)
RUN npm install

# Copy all source code
COPY . .

# Expose backend port
EXPOSE 3000

# Start server using nodemon for hot-reload
CMD ["npm", "run", "dev"]
