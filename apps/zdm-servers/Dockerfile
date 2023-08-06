FROM node:19.5-alpine as zdm-server
LABEL authors="Sergio"

WORKDIR /app

COPY ./common/deploy/containers/zdm-servers .
RUN node create-links.js create

CMD ["node", "./apps/zdm-servers/dist/backend/main.js"]
