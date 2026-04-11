import type { NextConfig } from 'next'

const basePath = '';
// const basePath = '/si-education';

const nextConfig: NextConfig = {
    /* config options here */
    basePath,
    assetPrefix: basePath,
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        unoptimized: true,
    },
    env: {
        NEXT_PUBLIC_BASE_PATH: basePath,
    },
}

export default nextConfig
