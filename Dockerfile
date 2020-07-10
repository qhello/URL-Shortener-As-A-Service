FROM node:12.18.0

WORKDIR /opt/api

COPY . .

RUN npm install

CMD npm run start:watch