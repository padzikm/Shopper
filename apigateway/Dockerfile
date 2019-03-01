FROM node:11.10

LABEL maintainer="shopper"

RUN npm install -g nodemon

VOLUME [ "/data" ]

WORKDIR /data

COPY package.json .

EXPOSE 4000

ENTRYPOINT npm install && npm run watch
