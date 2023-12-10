# Use the official Node.js 14 image as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install


# Install dependencies
RUN npm install sqlite3
RUN npm install rebuild


RUN npm uninstall bcrypt && npm install bcrypt

RUN npm install rebuild

RUN npm rebuild bcrypt --build-from-source

# Copy the rest of the application files to the working directory
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Command to start the API
CMD ["npm", "start"]
