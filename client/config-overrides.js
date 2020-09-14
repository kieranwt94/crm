const path = require('path');

module.exports = function override(config) {
    config.resolve = {
        ...config.resolve,
        alias: {
            ...config.alias,
            'components': path.resolve(__dirname, 'src/components'),
            'context': path.resolve(__dirname, 'src/context'),
            'layouts': path.resolve(__dirname, 'src/layouts'),
            'pages': path.resolve(__dirname, 'src/pages'),
            'utils': path.resolve(__dirname, 'src/utils'),
            '~styles': path.resolve(__dirname, 'src/styles')
        },
    };

    return config;
};