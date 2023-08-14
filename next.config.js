const { withContentlayer } = require("next-contentlayer"); // eslint-disable-line

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['tailwindui.com', 'images.unsplash.com', 'cdn.dribbble.com', "m.media-amazon.com", "ik.imagekit.io", "miro.medium.com", "store.storeimages.cdn-apple.com", "www.apple.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dgtzuqphqg23d.cloudfront.net",
      },
      { protocol: "https", hostname: "image.mux.com" },
    ],
  },
};

module.exports = withContentlayer(nextConfig);
