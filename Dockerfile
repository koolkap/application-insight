FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy the rest of the source
COPY . .

# Expose your app port (matches app.listen)
EXPOSE 8080

# Start the app
CMD ["npm", "start"]
