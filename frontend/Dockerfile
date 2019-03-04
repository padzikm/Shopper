FROM node:11.10 as dev

WORKDIR /app

VOLUME ["/app"]

EXPOSE 8081

CMD npm install && npm run start



FROM node:11.10 as test

WORKDIR /app

RUN npm install -g --unsafe-perm=true polymer-cli

COPY package.json /app

RUN npm install

WORKDIR /install

RUN apt update -y && \
    apt install -y xvfb && \
    apt install -y default-jre && \
    echo deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main >> /etc/apt/sources.list && \
    wget https://dl.google.com/linux/linux_signing_key.pub && \
    apt-key add linux_signing_key.pub && \
    apt update -y && \
    apt install -y google-chrome-stable

WORKDIR /app

COPY . /app

RUN npm run build:app

ENV DISPLAY=0:0

CMD  (Xvfb :0 -ac -screen 0 1920x1080x24 &) && npm run test:unit



FROM node:11.10 as prod

WORKDIR /app

RUN npm install -g --unsafe-perm=true polymer-cli

COPY --from=test /app/index.html /app/

COPY --from=test /app/manifest.json /app/

COPY --from=test /app/build /app/build/

COPY --from=test /app/images /app/images/

EXPOSE 8081

CMD polymer serve --port 8081 --hostname 0.0.0.0
