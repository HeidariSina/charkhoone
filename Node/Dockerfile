FROM node:16.14.0-buster-slim

# Create app directory
RUN mkdir -p /usr/src/app/node
WORKDIR /usr/src/app/node

# Installing dependencies
COPY package*.json /usr/src/app/node
RUN npm install

# Copying source files
COPY . /usr/src/app/node

# Building app
RUN node readdata.js