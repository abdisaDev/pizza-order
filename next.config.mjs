/** @type {import('next').NextConfig} */

const nextConfig = {
  async redirects() {
    return [
      { source: '/auth', destination: '/auth/login', permanent: true },
      { source: '/home', destination: '/', permanent: true },
    ];
  },
};

export default nextConfig;
