FROM node:16-alpine
WORKDIR /code
COPY package*.json ./
RUN npm ci && npm install
COPY . .
EXPOSE 3000
RUN ls
RUN apk --no-cache add postgresql-client
RUN PGPASSWORD=1TEPFBJ4pl40Yd9KwcA7rzchcp6GKTZ2 psql -h dpg-cir0crlph6ev5r98kiig-a.oregon-postgres.render.com -U postgres_blueocean -d blueocean_t86e \
    -a -f src/Database/migration.sql -f src/Database/seed.sql
CMD ["node", "src/server.js"]
