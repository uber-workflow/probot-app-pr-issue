/** Copyright (c) 2017 Uber Technologies, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const issueRegex = require('issue-regex');

module.exports = robot => {
  robot.on('pull_request.created', check);
  robot.on('pull_request.edited', check);

  async function check(context) {
    const {github} = context;
    const pr = context.payload.pull_request;

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
          context: 'pr_issue',
        },
        status,
      );
      return github.repos.createStatus(context.repo(params));
    }
  }
};
