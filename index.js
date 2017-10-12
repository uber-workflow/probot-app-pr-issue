const issueRegex = require('issue-regex');

module.exports = robot => {
  robot.on('pull_request.created', check);
  robot.on('pull_request.edited', check);

  async function check(context) {
    const {github} = context;
    const pr = context.payload.pull_request;
    const issues = pr.body.match(issueRegex());
    const status =
      issues === null
        ? {
            state: 'failure',
            description: 'PR does not reference an issue',
          }
        : {
            state: 'success',
            description: 'PR references an issue',
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
