 
// const nextConfig = {
//   reactStrictMode: true,
// }

module.exports = {
  images: {
     domains: ["www.dhakabaazar.com"],
	 disableStaticImages: true,
     deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  };

// module.exports = nextConfig
