FROM node:16.13.1-buster-slim

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

WORKDIR /app

ARG PORT=5000
ENV PORT $PORT

COPY package.json package-lock.json ./

RUN npm ci

COPY . /app

USER node

CMD [ "node", "src/server.js" ]
