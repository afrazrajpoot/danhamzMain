/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['danhamz.co.uk', 'api.danhamz.co.uk'],  // Fixed URL for the second domain
        path: '/images',
        unoptimized: true, // Disable Image Optimization
      },
};

export default nextConfig;
