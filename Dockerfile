# Use the official Node.js 18 image
FROM node:18

# Create and change to the app directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application
COPY . .

# Build the app
RUN npm run build

# Expose the port the app runs on
EXPOSE 4000

# Run Prisma migrations
RUN npx prisma migrate deploy

# Start the app
CMD ["npm", "run", "start"]
