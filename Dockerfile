FROM node:20-alpine AS base

#Installing Node Dependencies
WORKDIR /

#Dockerize a Node JS Server
# RUN apk add --no-cache libc6-compat
# RUN apk update
# RUN apk add --no-cache tzdata
# RUN apk add --no-cache nodejs
# RUN apk add --no-cache npm

# COPY package.json package-lock.json* ./
COPY ./ ./
# COPY index.ts ./

RUN npm install

EXPOSE 3016

CMD HOSTNAME="0.0.0.0" npm run start