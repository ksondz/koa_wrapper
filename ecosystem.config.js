

const pm2Name = 'engineering-exercise';

module.exports = {
  apps: [
    {
      name: pm2Name,
      script: './index.js',
      args: [
        '--toto=heya coco',
        '-d',
        '1',
      ],
      node_args: '',
      merge_logs: true,
      cwd: './',
      env: {},
    },
  ],
};
