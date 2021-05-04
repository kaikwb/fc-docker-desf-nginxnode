FROM node:latest

WORKDIR /node/src/app

COPY . .

EXPOSE 3000

RUN npm install && \
    chmod +x wait-for-it.sh

ENTRYPOINT [ "./wait-for-it.sh", "db:3306", "--timeout=600", "--", "node", "index.js" ]
