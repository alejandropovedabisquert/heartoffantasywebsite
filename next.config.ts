import {NextConfig} from 'next';
 
const nextConfig: NextConfig = {
    allowedDevOrigins: ['http://localhost:3000', 'heartoffantasy.com.local', 'www.heartoffantasy.com.local'],
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i.ytimg.com',
            },
        ],
    },
};
 
export default nextConfig;