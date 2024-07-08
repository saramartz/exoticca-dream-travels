/** @type {import('next').NextConfig} */

import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url) // get the resolved path to the file
const __dirname = path.dirname(__filename) // get the name of the directory

const nextConfig = {
    reactStrictMode: false,
    sassOptions: {
        includePaths: [`${__dirname}/src/ui/styles`],
        prependData: '@import "abstracts";', // make sass variables available to all css modules files
    },
    webpack(config) {
        // Preset for svg imports
        config.module.rules.push({
            test: /\.svg$/,
            use: ['@svgr/webpack'],
        })
        return config
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'a.cdn-hotels.com',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'cdn.aarp.net',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'content.skyscnr.com',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'humanidades.com',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'cdn.britannica.com',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'lp-cms-production.imgix.net',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'miro.medium.com',
                port: '',
            },
        ],
    },
}

export default nextConfig
