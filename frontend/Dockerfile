FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5173

# We pass --host to Vite so it listens on all interfaces (0.0.0.0) 
# which is required to access it from outside the Docker container.
CMD ["npm", "run", "dev", "--", "--host"]
