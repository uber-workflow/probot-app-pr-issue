FROM node:8.11.3@sha256:625d0b446f63b2d051c7b2a468f6cee63536dec716f09afcf9ae1c575d9b953a

WORKDIR /probot-app-pr-issue

COPY package.json yarn.lock /probot-app-pr-issue/

RUN yarn
