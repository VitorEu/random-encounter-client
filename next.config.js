/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = nextConfig;

module.exports = {
    reactStrictMode: true,
    env: {
        API_URL: process.env.API_URL,
        SECRET_KEY: process.env.SECRET_KEY
    }
}
