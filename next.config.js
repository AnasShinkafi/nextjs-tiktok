
/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        // Add a rule to handle the canvas. node binary
        config.module.rules.push({ test: /\.node$/, use: 'raw-loader'})

        // Execute canvas from being procced by Next.js in the browser
        if (!isServer) config.externals.push('canvas');
        return config;
    }
}

module.exports = nextConfig
