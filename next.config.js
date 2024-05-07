/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = nextConfig;

module.exports = {
    reactStrictMode: true,
    env: {
        API_URL: process.env.API_URL,
        SECRET_KEY: process.env.SECRET_KEY
    },
    images: {
        formats: ["image/avif", "image/webp"],
        remotePatterns: [
          {
            protocol: "https",
            hostname: "media.discordapp.net",
            port: "",
            pathname: "**",
          },
        ],
    },
}
