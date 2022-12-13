FROM node:16-alpine AS local
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN yarn install && \
  yarn build:dev
EXPOSE 3000
CMD [ "yarn", "start"]

FROM node:16-alpine AS dev
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN rm .env.local && \
  yarn install && \
  yarn build:dev
EXPOSE 3000
CMD [ "yarn", "start"]

FROM node:16-alpine AS prod
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN rm .env.local && \
  yarn install --production && \
  yarn build
EXPOSE 3000
CMD [ "yarn", "start"]