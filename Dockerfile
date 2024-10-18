FROM node:20-slim AS base

WORKDIR /app

COPY ./server/ /app/
COPY . /app/dist

RUN npm i

EXPOSE 5173

CMD node server.js