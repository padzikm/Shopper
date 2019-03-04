FROM node:11.10

RUN npm install -g nodemon

VOLUME [ "/app" ]

WORKDIR /app

EXPOSE 4000

ENTRYPOINT npm install && npm run watch
