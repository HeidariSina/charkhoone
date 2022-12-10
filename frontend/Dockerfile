FROM node:16.14.0-buster-slim

ENV PORT 3000

# Create app directory
RUN mkdir -p /usr/src/app/frontend
WORKDIR /usr/src/app/frontend

# Installing dependencies
COPY package*.json /usr/src/app/frontend
RUN npm install

# Copying source files
COPY . /usr/src/app/frontend

# Building app
# RUN npm run dev
# EXPOSE 3000

# Running the app
CMD "npm" "run" "dev"