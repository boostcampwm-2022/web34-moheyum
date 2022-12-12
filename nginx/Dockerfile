FROM nginx:1.23.2-alpine AS local
COPY conf.d/moheyum-local.conf /etc/nginx/conf.d/moheyum-local.conf
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80

FROM nginx:1.23.2-alpine AS dev
COPY conf.d/moheyum-dev.conf /etc/nginx/conf.d/moheyum-dev.conf
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80