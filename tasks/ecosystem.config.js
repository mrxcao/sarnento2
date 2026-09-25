module.exports = {
  apps: [{
    name: 'tasks',
    exec_mode: 'cluster',
    script: './index.js',
    watch: false,
    env: { NODE_ENV: 'production' },
  },
  ],
};
