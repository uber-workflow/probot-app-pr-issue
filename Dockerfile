FROM node:8.11.3@sha256:98755b9281c251f9e712069978975181a9d9b43efcbe0f2270ff6206ebc86dda

WORKDIR /probot-app-pr-issue

COPY package.json yarn.lock /probot-app-pr-issue/

RUN yarn
