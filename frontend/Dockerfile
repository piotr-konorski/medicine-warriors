FROM node:17.7.1-buster-slim as build

ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

WORKDIR /code

COPY package.json ./

RUN npm install

COPY . /code
RUN npm run build

FROM nginx:1.20.2

COPY --from=build /code/build /usr/share/nginx/html

RUN groupadd -g 10001 app && \
    useradd -u 10000 -g app app && \
    mkdir -p /var/run/nginx /var/tmp/nginx && \
    chown -R app:app /usr/share/nginx /var/run/nginx /var/tmp/nginx
USER 10000:10001

COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./default.conf /etc/nginx/conf.d/

WORKDIR /usr/share/nginx/html
COPY --chown=app:app ./env.sh .env ./
RUN chmod +x env.sh

EXPOSE 8080

CMD ["/bin/sh", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]
