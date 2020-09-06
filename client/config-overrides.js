const path = require('path');

module.exports = function override(config) {
    config.resolve = {
        ...config.resolve,
        alias: {
            ...config.alias,
            'components': path.resolve(__dirname, 'src/components'),
            'contexts': path.resolve(__dirname, 'src/contexts'),
            'layouts': path.resolve(__dirname, 'src/layouts'),
            'pages': path.resolve(__dirname, 'src/pages'),
            'utils': path.resolve(__dirname, 'src/utils'),
            '~styles': path.resolve(__dirname, 'src/styles')
        },
    };

    return config;
};