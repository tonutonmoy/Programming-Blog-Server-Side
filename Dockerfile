# Use the official Node.js 18 image.
FROM node:18

# Create and change to the app directory.
WORKDIR /app

# Install production dependencies.
COPY package*.json ./
RUN npm ci --only=production

# Copy app files.
COPY . .

# Build the app
RUN npm run build

# Run Prisma migrations
RUN npx prisma migrate deploy

# Start the app
CMD ["npm", "run", "start"]
