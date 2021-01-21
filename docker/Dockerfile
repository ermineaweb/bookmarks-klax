FROM node:14-slim as build-client-stage
WORKDIR /client
COPY ./client/package*.json ./
RUN npm install --silent 
COPY ./client/ ./
RUN npm run build

FROM node:14-slim as build-server-stage
WORKDIR /server
COPY ./server/package*.json ./
RUN npm install --silent 
COPY ./server/ ./
RUN npm run build

FROM node:14-slim
WORKDIR /app
COPY --from=build-client-stage /client/build ./client/build
COPY --from=build-server-stage /server ./server

EXPOSE 80

CMD ["node","./server/dist/index.js"]