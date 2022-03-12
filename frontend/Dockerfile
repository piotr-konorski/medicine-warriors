# build stage
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/

WORKDIR /app

## add permissions
RUN addgroup -g 10000 unginx && \
    adduser -u 10000 -G unginx -h /home/unginx -D unginx && \
    chown -R unginx:unginx /app && \
    chmod -R 755 /app && \
    chown -R unginx:unginx /var/cache/nginx && \
    chown -R unginx:unginx /var/log/nginx && \
    chown -R unginx:unginx /etc/nginx/conf.d
RUN touch /var/run/nginx.pid && chown -R unginx:unginx /var/run/nginx.pid

## switch to non-root user
USER 10000:10001

# run
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
