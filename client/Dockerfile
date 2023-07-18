FROM node:16-alpine
WORKDIR /code
COPY package*.json ./
RUN npm ci && npm install
COPY . .
EXPOSE 3000
RUN ls
CMD ["npm", "run", "serve"]
