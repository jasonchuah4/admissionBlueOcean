FROM node:16-alpine
WORKDIR /code
COPY package*.json ./
RUN npm ci && npm install
COPY . .
EXPOSE 3000
RUN ls
RUN apk --no-cache add postgresql-client
# COPY pg-data /var/lib/postgresql/data
COPY src/Database/migration.sql /docker-entrypoint-initdb.d/migration.sql
COPY src/Database/seed.sql /docker-entrypoint-initdb.d/seed.sql
COPY src/scripts/student.csv /docker-entrypoint-initdb.d/student.csv
COPY src/scripts/interview.csv /docker-entrypoint-initdb.d/interview.csv
# RUN docker-entrypoint.sh postgres && sleep 5
# RUN echo '\\COPY students FROM \'/docker-entrypoint-initdb.d/student.csv\' WITH (FORMAT csv, DELIMITER ',');' >> /docker-entrypoint-initdb.d/seed.sql
# RUN echo '\\COPY interviewers FROM \'/docker-entrypoint-initdb.d/interview.csv\' WITH (FORMAT csv, DELIMITER ',');' >> /docker-entrypoint-initdb.d/seed.sql
RUN PGPASSWORD=1TEPFBJ4pl40Yd9KwcA7rzchcp6GKTZ2 psql -h dpg-cir0crlph6ev5r98kiig-a.oregon-postgres.render.com -U postgres_blueocean blueocean_t86e && \
    echo '\\COPY students FROM '/docker-entrypoint-initdb.d/student.csv' WITH (FORMAT csv, DELIMITER ',');' >> /docker-entrypoint-initdb.d/seed.sql && \
    docker-entrypoint.sh postgres

# CMD ["docker-entrypoint.sh postgres && sleep 5 && docker-entrypoint.sh postgres"]
CMD ["node", "src/server.js"]
