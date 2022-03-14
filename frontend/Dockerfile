# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM nginx:1.21.6 as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

RUN groupadd -g 10001 app && \
    useradd -u 10000 -g app app && \
    mkdir -p /var/run/nginx /var/tmp/nginx &&\
    chown -R app:app /usr/share/nginx /var/run/nginx /var/tmp/nginx

COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./nginx_default.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html
COPY ./env.sh .env ./
RUN chmod +x env.sh

USER 10000:10001

EXPOSE 8080

CMD ["/bin/sh", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]
