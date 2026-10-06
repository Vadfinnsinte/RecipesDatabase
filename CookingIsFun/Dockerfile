FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build


FROM nginx:alpine

RUN sed -i '/^[[:space:]]*pid /d' /etc/nginx/nginx.conf

RUN addgroup -S app && adduser -S app -G app

RUN chown -R app:app /usr/share/nginx/html /var/cache/nginx /var/log/nginx /etc/nginx

COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN mkdir -p /run/nginx && chown -R app:app /run/nginx

RUN chown -R app:app /usr/share/nginx/html /etc/nginx

USER app

EXPOSE 80

CMD ["nginx", "-g", "daemon off; pid /tmp/nginx.pid;"]