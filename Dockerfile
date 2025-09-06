FROM node:24.7-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .
RUN npm ci

EXPOSE 80
CMD ["index.js"]
