FROM node:16-alpine
WORKDIR /code
COPY package*.json ./
RUN npm ci && npm install
COPY . .
EXPOSE 3000
RUN ls
# COPY pg-data /var/lib/postgresql/data
COPY src/Database/migration.sql /docker-entrypoint-initdb.d/
COPY src/Database/seed.sql /docker-entrypoint-initdb.d/
COPY src/scripts/student.csv /docker-entrypoint-initdb.d/
COPY src/scripts/interview.csv /docker-entrypoint-initdb.d/
RUN cd /docker-entrypoint-initdb.d
RUN ls
CMD ["node", "src/server.js"]
