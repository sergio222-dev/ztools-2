FROM nginx:alpine as z-economy
LABEL authors="Sergio Molina and Agustin Barcia"

WORKDIR /app

COPY ./dist .

COPY ./nginx.conf /etc/nginx/nginx.conf

