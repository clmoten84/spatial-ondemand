/*
 * login.js
 *
 * SOD application login - entry point
 */

require(['dojo/io-query',
         'app/widgets/layout/view/LoginLayout'], function(ioQuery, LoginLayout) {

    // Render login page
    LoginLayout.renderLogin();

    // Display toast message if necessary
    let queryParams = decodeURIComponent(document.location.search);
    if (queryParams.indexOf('authfail') !== -1) {
        // Authentication failure
        LoginLayout.displayToast("Provided credentials are not valid!");
    }
    else if (queryParams.indexOf('logout') !== -1) {
        // Successful logout
        LoginLayout.displayToast("Successfully signed out!");
    }
});