FROM node:18-alpine

# Install build tools for native modules
RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY package*.json ./

# Install dependencies
RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "run", "dev"]