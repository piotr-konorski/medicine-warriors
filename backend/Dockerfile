FROM node:16.13.1-buster-slim

RUN apt-get update && apt-get install -y netcat

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

ARG PORT=5000
ENV PORT $PORT

WORKDIR /home/med

RUN groupadd -g 10001 med && \
    useradd -u 10000 -g med med && \
    mkdir -p /home/med && \
    chown -R med:med /home/med
USER 10000:10001

COPY package.json package-lock.json ./
RUN npm ci

COPY --chown=med:med ./prestart.sh ./start.sh ./
RUN chmod +x ./start.sh ./prestart.sh

COPY . /home/med

CMD ["/bin/sh", "./start.sh"]
