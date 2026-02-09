import {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
 
const nextConfig: NextConfig = {
    allowedDevOrigins: ['http://localhost:3000', 'heartoffantasy.com.local', 'www.heartoffantasy.com.local']
};
 
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);