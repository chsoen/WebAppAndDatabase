# syntax=docker/dockerfile:1

FROM node:21
 
WORKDIR /usr/src/WebAppAndDatabase

# Copy code
COPY . .
WORKDIR /usr/src/WebAppAndDatabase/App
# Install dependencies
RUN npm ci
EXPOSE 3000/tcp
# Run the webpage
CMD ["npm", "run", "dev", "--", "--host"]