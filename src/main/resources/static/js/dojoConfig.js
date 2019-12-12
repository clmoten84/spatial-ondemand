/*
 * dojoConfig.js
 *
 * Global configuration of DOJO environment, including modules and where to find them
 */

var dojoConfig = {
    packages: [
        {
            name: 'app',
            location: location.pathname.replace(/\/[^/]+$/, '') + 'js/modules'
        }
    ]
};