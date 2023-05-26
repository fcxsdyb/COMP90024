# COMP90024 GROUP48
# Yuhang Zhou     ID:1243037
# Jitao Feng      ID:1265994
# Hui Liu         ID:1336645
# Jihang Yu       ID:1341312
# Xinran Ren      ID:1309373

# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install any needed dependencies
RUN npm ci

# Copy the rest of the application to the working directory
COPY . .

# Build the application
RUN npm run build

# Use a lightweight Node.js parent image for the final build
FROM node:14-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the build folder from the previous step
COPY --from=0 /app/build /app/build

# Install serve to serve the application
RUN npm install -g serve

# Expose the port the app will run on
EXPOSE 3000

# Start the application
CMD ["serve", "-s", "build", "-l", "3000"]
