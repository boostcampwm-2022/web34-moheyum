FROM node:16-alpine
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN apk --no-cache add --virtual make gcc g++ python3 && \
  yarn install && \
  yarn rebuild bcrypt && \
  yarn build
EXPOSE 4000
CMD [ "yarn", "start:prod" ]