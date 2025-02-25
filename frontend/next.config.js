/** @type {import('next').NextConfig} */
module.exports = {
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/tasks-list',
      },
    ];
  },
  reactStrictMode: true,
};
