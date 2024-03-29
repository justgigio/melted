FROM node:20.11-slim

EXPOSE 3000
EXPOSE 51204

WORKDIR /app

COPY package.json /app
COPY yarn.lock /app
RUN yarn install

COPY . /app


CMD ["yarn dev"]
