FROM node:19.5-alpine as budget-server
LABEL authors="Sergio Molina and Agustin Barcia"

WORKDIR /app

COPY ./common/deploy/containers/budget-servers .
RUN node create-links.js create

CMD ["node", "./apps/budget-servers/dist/backend/main.js"]
