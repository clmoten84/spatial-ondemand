/*
 * UserProfileViewController.js
 *
 * Defines business logic for the UserProfile view and its associated components.
 */

define(['dojo/query',
        'dojo/dom-construct',
        'dojo/dom',
        'dojo/request'], function(query, domConstruct, dom, request) {

    return {
        /**
         * Signs the current user out of session
         */
        signOut: function() {
            // Create a form element with a post to '/logout' uri
            // Include the CSRF token with post
            let logoutForm = domConstruct.create('form', {id: 'logout-form', action: '/logout', method: 'post'});
            logoutForm.appendChild(domConstruct.create('input', {
                type: 'hidden',
                name: query("meta[name='_csrf_param']")[0].content,
                value: query("meta[name='_csrf']")[0].content
            }));

            // Attach the logout form to the DOM and trigger the submit
            dom.byId('rightHeaderSection').appendChild(logoutForm);
            logoutForm.submit();
        },

        /**
         * Navigates to the '/admin' uri
         */
        goToAdmin: function() {
            window.location.href = '/admin';
        },

        /**
         * Display the user profile widget/dialog
         */
        showUserProfile: function() {
            console.log('This will display the user profile widget/dialog...');
        },

        /**
         * Make a request to fetch the currently logged in user details
         */
        fetchCurrentUser: function() {
            request.get('api/users/currentUser', {
                handleAs: 'json',
                timeout: 60000,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(
                function(response) {
                    SpatialOndemand.currUserDetails = response;
                },

                function(err) {
                    SpatialOndemand.currUserDetails = null;
                    console.error('Failed to fetch the currently logged in user!', err);
                }
            )
        }
    }
});