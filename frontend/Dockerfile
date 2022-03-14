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

RUN groupadd -g 5001 app && \
    useradd -u 5000 -g app app && \
    mkdir -p /var/run/nginx /var/tmp/nginx &&\
    chown -R app:app /usr/share/nginx /var/run/nginx /var/tmp/nginx

COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./nginx_default.conf /etc/nginx/conf.d/

WORKDIR /usr/share/nginx/html
COPY ./env.sh .env ./
RUN chmod +x env.sh

USER 5000:5001

EXPOSE 8080

CMD ["/bin/sh", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]
