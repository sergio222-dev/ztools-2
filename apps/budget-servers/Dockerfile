FROM node:19.5-alpine as budget-server

WORKDIR /app

COPY ./common/deploy/containers/@ztools/budget-servers .
RUN node create-links.js create

CMD ["node", "./apps/budget-servers/dist/backend/main.js"]
