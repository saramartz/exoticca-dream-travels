/** @type {import('next').NextConfig} */

import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url) // get the resolved path to the file
const __dirname = path.dirname(__filename) // get the name of the directory

const nextConfig = {
    sassOptions: {
        includePaths: [`${__dirname}/src/ui/styles`],
        prependData: '@import "abstracts";', // make sass variables available to all css modules files
    },
}

export default nextConfig
