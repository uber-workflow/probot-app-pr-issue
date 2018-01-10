# probot-app-pr-issue

[![build status][build-badge]][build-href]
[![dependencies status][deps-badge]][deps-href]
[![npm version][npm-badge]][npm-href]

> a GitHub App built with [probot](https://github.com/probot/probot) that ensures PRs have an associated issue

## Setup

```
# Install dependencies
npm install

# Run the bot
npm start
```

See [docs/deploy.md](docs/deploy.md) if you would like to run your own instance of this app.

## Config

This app can be configured to ignore PRs with specific labels. The default configuration is:

`.github/pr-issue.yml`
```yml
ignore:
- release
- docs
```

[build-badge]: https://badge.buildkite.com/f610b44e27ccb64b9ba97d9c659c13f83313be09bfb7c6f6b0.svg?branch=master
[build-href]: https://buildkite.com/uberopensource/probot-app-pr-issue
[deps-badge]: https://david-dm.org/uber-web/probot-app-pr-issue.svg
[deps-href]: https://david-dm.org/uber-web/probot-app-pr-issue
[npm-badge]: https://badge.fury.io/js/probot-app-pr-issue.svg
[npm-href]: https://www.npmjs.com/package/probot-app-pr-issue
