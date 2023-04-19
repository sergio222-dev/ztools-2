FROM node:19.5-alpine as builder

WORKDIR /app

RUN npm i -g @microsoft/rush

COPY ./apps ./apps
COPY ./common ./common
COPY ./rush.json .

RUN rush update
RUN rush build
RUN rush deploy

FROM node:19.5-alpine as budget-server

WORKDIR /app

COPY --from=builder /app/common/deploy/ .

CMD ["node", "./apps/budget-servers/dist/backend/main.js"]
