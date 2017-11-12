FROM node:8.9.0

WORKDIR /probot-app-pr-issue

COPY package.json yarn.lock /probot-app-pr-issue/

RUN yarn
