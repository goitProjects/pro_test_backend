module.exports = {
  apps: [
    {
      name: 'protest-server',
      script: './api/start.js',
      instances: 3,
      exec_mode: 'cluster',
      increment_var: 'PORT',
      env: {
        PORT: 3000,
        NODE_ENV: 'production',
      },
    },
  ],
};
