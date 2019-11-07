FROM node:alpine AS build-env

WORKDIR /app
COPY package*.json .
RUN npm install
COPY . .
RUN npm run build && rm -rf node_modules && npm install --production

FROM gcr.io/distroless/nodejs
COPY --from=build-env /app /app
WORKDIR /app
CMD ["./lib/index.js"]

