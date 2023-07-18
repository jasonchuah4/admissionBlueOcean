FROM node:16-alpine
WORKDIR /code
COPY package*.json ./
RUN npm ci && npm install
COPY . .
EXPOSE 3000
CMD cd ./code
CMD ll
CMD ["node", "server.js"]
