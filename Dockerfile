# current node:lts-alpine
FROM node:14.15.4-alpine3.11 as build

WORKDIR /app

# use node user for security
RUN chown node:node /app

# created in node image
USER node

COPY --chown=node:node \
  package.json \
  yarn.lock \
  ./

# what is yarn all about anyway?
RUN yarn --production --pure-lockfile --silent --non-interactive

# leverage .dockerignore to pull in only what we need
COPY --chown=node:node . .

RUN yarn build

# serve in nginx container
FROM nginx:1.18-alpine as production

WORKDIR /usr/share/nginx/html

COPY --from=build /app/build ./build
COPY index.html ./

# nginx serves content on port 80