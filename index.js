/** Copyright (c) 2017 Uber Technologies, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const issueRegex = require('issue-regex');

module.exports = robot => {
  robot.on('pull_request.opened', check);
  robot.on('pull_request.edited', check);
  robot.on('pull_request.labeled', check);
  robot.on('pull_request.unlabeled', check);
  robot.on('pull_request.synchronized', check);

  async function check(context) {
    const {github} = context;
    const pr = context.payload.pull_request;

    setStatus({
      state: 'pending',
      description: 'Checking if PR correctly references an issue',
    });

    const config = await context.config('pr-issue.yml', {
      ignore: ['release'],
    });

    const labels = await github.issues.getIssueLabels(context.issue());

    const shouldIgnore = labels.data.some(label => {
      let name = label.name.toLowerCase();
      return config.ignore.some(ignored => ignored === name);
    });

    if (shouldIgnore) {
      setStatus({
        state: 'success',
        description: 'PR does not need to reference an issue',
      });
      return;
    }

    function hasIssue() {
      const issues = pr.body.match(issueRegex());
      if (issues !== null) {
        return true;
      }
      const repo = context.payload.repository.full_name;
      const urlRegex = new RegExp(`${repo}/issues/\\d+`, 'g');
      return pr.body.match(urlRegex) !== null;
    }

    const status = hasIssue()
      ? {
          state: 'success',
          description: 'PR references an issue',
        }
      : {
          state: 'failure',
          description: 'PR does not reference an issue',
        };

    setStatus(status);

    function setStatus(status) {
      const params = Object.assign(
        {
          sha: pr.head.sha,
          context: 'probot/pr-issue',
        },
        status,
      );
      return github.repos.createStatus(context.repo(params));
    }
  }
};
