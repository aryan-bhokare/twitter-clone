/** @type {import('next').NextConfig} */

const nextConfig = {
	reactStrictMode: true,
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
      "images.unsplash.com",
      "aryan-twitter-dev.s3.ap-south-1.amazonaws.com",
    ],
  },
};

module.exports = nextConfig
