# BASE
FROM node:18-alpine AS base

WORKDIR /usr/src/api
RUN corepack enable pnpm && corepack install -g pnpm@latest
COPY --chown=node:node pnpm-lock.yaml package.json ./
RUN pnpm fetch --prod
RUN pnpm install
USER node

# BUILD
FROM node:18-alpine AS build 
RUN npm install -g pnpm
WORKDIR /usr/src/api
COPY --chown=node:node pnpm-lock.yaml ./
COPY --chown=node:node --from=BASE /usr/src/api/node_modules ./node_modules
COPY --chown=node:node . .
RUN pnpm build
USER node

FROM node:18-alpine AS production 

ENV PORT=$PORT
ENV NODE_ENV=production
ENV DATABASE_NAME=$DATABASE_NAME
ENV DATABASE_USER=$DATABASE_USER
ENV DATABASE_PASSWORD=$DATABASE_PASSWORD
ENV DATABASE_HOST=$DATABASE_HOST
ENV DATABASE_PORT=$DATABASE_PORT
ENV REDIS_HOST=$REDIS_HOST
ENV REDIS_PORT=$REDIS_PORT
COPY --chown=node:node --from=build /usr/src/api/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/api/dist ./dist
CMD [ "node", "dist/main"]
EXPOSE $PORT
