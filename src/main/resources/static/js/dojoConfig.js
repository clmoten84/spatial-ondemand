/*
 * dojoConfig.js
 *
 * Global configuration of DOJO environment, including modules and where to find them
 */

var dojoConfig = {
    packages: [
        {
            name: 'app',
            location: location.origin + '/js/modules'
        },
        {
            name: 'amd_lib',
            location: location.origin + '/js/amd_lib'
        },
        {
            name: 'gridx',
            location: location.origin + '/webjars/gridx/1.3.9'
        }

        // This is old REGEX based package config that doesn't work against
        // paths beyond '/'.
        // {
        //     name: 'app',
        //     location: location.pathname.replace(/\/[^/]+$/, '') + 'js/modules'
        // },
        // {
        //     name: 'amd_lib',
        //     location: location.pathname.replace(/\/[^/]+$/, '') + 'js/amd_lib'
        // }
    ]
};