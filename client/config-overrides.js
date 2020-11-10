const path = require('path');

module.exports = function override(config) {
    config.resolve = {
        ...config.resolve,
        alias: {
            ...config.alias,
            'actions': path.resolve(__dirname, 'src/actions'),
            'components': path.resolve(__dirname, 'src/components'),
            'layouts': path.resolve(__dirname, 'src/layouts'),
            'pages': path.resolve(__dirname, 'src/pages'),
            'reducers': path.resolve(__dirname, 'src/reducers'),
            'services': path.resolve(__dirname, 'src/services'),
            'utils': path.resolve(__dirname, 'src/utils'),
            '~styles': path.resolve(__dirname, 'src/styles')
        },
    };

    return config;
};