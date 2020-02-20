/*
 * LoginLayout.js
 *
 * Defines components that make up the login page layout.
 */

define(['dojo/dom',
        'dojo/query',
        'dojo/dom-construct',
        'dijit/layout/BorderContainer',
        'dijit/layout/ContentPane',
        'dijit/form/ValidationTextBox',
        'dijit/form/Button'], function(dom, query, domConstruct, BorderContainer,
                                       ContentPane, ValidationTextBox, Button) {

    /**
     * Defines and renders the login form
     * @return div domNode
     */
    function renderLoginForm() {
        // Login form div
        let loginDiv = domConstruct.create('div', {id: 'login-div'});

        // Login form branding
        loginDiv.appendChild(domConstruct.create('div', {
            id: 'login-brand-logo',
            innerHTML: '<img src="img/maxar_logo.png" alt="Maxar Seal" style="height:56px;width:56px;"/>'
        }));

        loginDiv.appendChild(domConstruct.create('div', {
            id: 'login-brand',
            innerHTML: '<h2 style="cursor:default;">Spatial On-demand Portal</h2>'
        }));

        // Login form
        let loginFormDiv = domConstruct.create('div', {id: 'login-form-div'});
        let loginForm = domConstruct.create('form', {id: 'login-form', action: '/login', method: 'post'});

        // Add hidden input for including CSRF token in form post
        loginForm.appendChild(domConstruct.create('input', {
            type: 'hidden',
            name: query("meta[name='_csrf_param']")[0].content,
            value: query("meta[name='_csrf']")[0].content
        }));

        let loginFormEmailField = domConstruct.create('div', {class: 'login-form-field'});
        loginFormEmailField.appendChild(domConstruct.create('label', {for: 'email', innerHTML: 'Email', style: 'margin-bottom:5px; display:block'}));
        loginFormEmailField.appendChild(new ValidationTextBox({
            id: 'username',
            name: 'username',
            invalidMessage: 'Please provide a valid email address.',
            style: 'width:100%; border-radius:4px; padding:5px;',
            regExp: '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$',
            required: true
        }).domNode);

        let loginFormPasswordField = domConstruct.create('div', {class: 'login-form-field'});
        loginFormPasswordField.appendChild(domConstruct.create('label', {for: 'password', innerHTML: 'Password', style: 'margin-bottom:5px; display:block'}));
        loginFormPasswordField.appendChild(new ValidationTextBox({
            id: 'password',
            name: 'password',
            type: 'password',
            style: 'width:100%; border-radius:4px; padding:5px;',
            required: true
        }).domNode);

        let loginFormInput = domConstruct.create('div', {id: 'login-form-input'});
        loginFormInput.appendChild(new Button({
            id: 'login-submit-btn',
            label: 'Sign In',
            type: 'submit'
        }).domNode);

        loginForm.appendChild(loginFormEmailField);
        loginForm.appendChild(loginFormPasswordField);
        loginForm.appendChild(loginFormInput);
        loginFormDiv.appendChild(loginForm);

        // Add legal verbiage
        let legal = domConstruct.create('div', {id: 'legal', innerHTML: '&#169; Maxar Technologies, 2020'});

        loginDiv.appendChild(loginFormDiv);
        loginDiv.appendChild(legal);
        return loginDiv;
    }

    return {
        /**
         * Renders the login form
         */
        renderLogin: function() {
            // Define page root container for page elements
            let pageRoot = new BorderContainer({
                design: 'headline',
                gutters: false
            }, 'login-root');

            // Add center content pane and render the login form inside it
            let loginContainer = new ContentPane({
                id: 'login-container',
                design: 'headline',
                region: 'center',
                gutters: false
            });
            loginContainer.set('content', renderLoginForm());

            // Create a toast to add to page root for displaying messages
            let toastDiv = domConstruct.create('div', {id: 'login-toast'});

            // Add the login form container to the page root and 'start' the root container
            pageRoot.addChild(loginContainer);
            pageRoot.domNode.appendChild(toastDiv);
            pageRoot.startup();
        },

        /**
         * Displays a toast upon logout or upon input of invalid user credentials
         */
        displayToast: function(toastMessage) {
            let toastDiv = dom.byId('login-toast');
            toastDiv.className = 'show';
            toastDiv.innerHTML = toastMessage;

            setTimeout(function() {
                toastDiv.className = toastDiv.className.replace("show", "");
            }, 3000);
        }
    }
});