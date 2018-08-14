

const pm2Name = 'engineering-exercise';

module.exports = {
  apps: [
    {
      name: pm2Name,
      script: './index.js',
      watch: true,
      ignore_watch: [
        'node_modules',
        'logs',
        '.git',
        '.idea',
      ],
      node_args: '',
      merge_logs: true,
      cwd: './',
      env: {},
    },
  ],
};
