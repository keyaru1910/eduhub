import type { NextConfig } from 'next'

const basePath = '';
// const basePath = '/si-education';

const nextConfig: NextConfig = {
    /* config options here */
    basePath,
    assetPrefix: basePath,
    images: {
        unoptimized: true,
        qualities: [75, 100],
    },
    env: {
        NEXT_PUBLIC_BASE_PATH: basePath,
    },
    typescript: {
        ignoreBuildErrors: true,
    },
}

export default nextConfig
