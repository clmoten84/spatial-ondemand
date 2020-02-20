/*
 * UserManager.js
 *
 * Defines components that comprise the user manager widget/view
 */

define(['dijit/dijit',
        'dojo/dom-construct',
        'dijit/form/Button',
        'dijit/form/ValidationTextBox',
        'dojox/form/CheckedMultiSelect',
        'dijit/Dialog',
        'app/widgets/admin/users/viewController/UserManagerViewController'],
            function(dijit, domConstruct, Button, TextBox, MultiSelect, Dialog, UserManagerViewController) {

    function showAddUserDialog() {
        // Initialize the dialog
        let addUserDialog = new Dialog({
            title: 'Add New User',
            onHide: function() {
                // Destroy the dialog on close
                this.destroy();
            }
        });

        // Define the form for adding users
        let addUserFormDiv = domConstruct.create('div', {style: 'font-size:small;'});

        // Email field
        let emailFieldDiv = domConstruct.create('div', {class: 'admin-form-field'});
        emailFieldDiv.appendChild(domConstruct.create('label', {innerHTML: 'Email', class: 'admin-form-field-label'}));
        let emailTextBox = new TextBox({
            class: 'admin-form-field-textbox',
            placeHolder: 'Provide the email address for the new user...',
            invalidMessage: 'Please provide a valid email address.',
            missingMessage: 'A valid email address must be specified.',
            regExp: '[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$',
            required: true,
            trim: true,
            maxLength: 50,
        });
        emailFieldDiv.appendChild(emailTextBox.domNode);

        // Password field
        let passwordFieldDiv = domConstruct.create('div', {class: 'admin-form-field'});
        passwordFieldDiv.appendChild(domConstruct.create('label', {innerHTML: 'Password', class: 'admin-form-field-label'}));
        let passwordTextBox = new TextBox({
            class: 'admin-form-field-textbox',
            type: 'password',
            required: true,
            regExp: '[\\w!@#$%^&_]{8,}',
            placeHolder: 'Provide a password for the new user...',
            promptMessage: "Password must be at least 8 characters, contain at least one number, and at least one of" +
                            " the following allowable special characters, (!, @, #, $, %, ^, or &)",
            invalidMessage: 'Please provide a password that meets the minimum security requirements.',
            missingMessage: 'A valid password must be specified.',
            trim: true
        });
        passwordFieldDiv.appendChild(passwordTextBox.domNode);

        // Name field
        let nameFieldDiv = domConstruct.create('div', {class: 'admin-form-field'});
        nameFieldDiv.appendChild(domConstruct.create('label', {innerHTML: 'Name', class: 'admin-form-field-label'}));
        let nameTextBox = new TextBox({
            class: 'admin-form-field-textbox',
            required: false,
            placeHolder: '(Optional) Provide a name for the new user...',
            trim: true,
            maxLength: 50
        });
        nameFieldDiv.appendChild(nameTextBox.domNode);

        // Biz Entity field
        let bizEntityFieldDiv = domConstruct.create('div', {class: 'admin-form-field'});
        bizEntityFieldDiv.appendChild(domConstruct.create('label', {innerHTML: 'Company', class: 'admin-form-field-label'}));
        let bizEntityTextBox = new TextBox({
            class: 'admin-form-field-textbox',
            required: false,
            placeHolder: '(Optional) Provide a company name for the new user...',
            trim: true,
            maxLength: 50
        });
        bizEntityFieldDiv.appendChild(bizEntityTextBox.domNode);

        // Role selection field
        let roleFieldDiv = domConstruct.create('div', {class: 'admin-form-field'});
        roleFieldDiv.appendChild(domConstruct.create('label', {innerHTML: 'Select role(s) for user', class: 'admin-form-field-label'}));

        // Need to get the available roles to select from the roles grid store
        let selectOptions = [];
        let rolesStoreData = dijit.byId('roles-grid').model.store.data;
        rolesStoreData.forEach(function(currVal) {
            let option = {label: currVal.roleName, value: currVal.roleName};
            selectOptions.push(option);
        });

        let rolesSelect = new MultiSelect({
            multiple: true,
            required: false,
            options: selectOptions
        });
        roleFieldDiv.appendChild(rolesSelect.domNode);

        // Form buttons
        let addUserFormActions = domConstruct.create('div', {class: 'admin-form-actions'});
        addUserFormActions.appendChild(new Button({
            showLabel: true,
            label: 'Cancel',
            class: 'manager-action',
            onClick: function() {
                // Cancel the add role request
                addUserDialog.hide();
            }
        }).domNode);

        addUserFormActions.appendChild(new Button({
            showLabel: true,
            label: 'Add User',
            class: 'manager-action',
            onClick: function() {
                // Gather input from fields into an object and send to view controller to handle request
                let roles = [];
                let isAdmin = false;
                let selectedRoles = rolesSelect.get('value');
                selectedRoles.forEach(function(currVal) {
                    if (currVal === 'ADMIN')
                        isAdmin = true;
                    roles.push({roleName: currVal});
                });

                let addUserParms = {
                    username: emailTextBox.get('value'),
                    email: emailTextBox.get('value'),
                    password: passwordTextBox.get('value'),
                    name: nameTextBox.get('value'),
                    bizEntity: bizEntityTextBox.get('value'),
                    roles: roles,
                    admin: isAdmin,
                    dateCreated: new Date(),
                    lastModified: new Date(),
                };

                UserManagerViewController.addNewUser(addUserParms);
                addUserDialog.hide();
            }
        }).domNode);

        // Add form elements to add user form div
        addUserFormDiv.appendChild(emailFieldDiv);
        addUserFormDiv.appendChild(passwordFieldDiv);
        addUserFormDiv.appendChild(nameFieldDiv);
        addUserFormDiv.appendChild(bizEntityFieldDiv);
        addUserFormDiv.appendChild(roleFieldDiv);
        addUserFormDiv.appendChild(addUserFormActions);

        addUserDialog.set('content', addUserFormDiv);
        addUserDialog.show();
    }

    return {
        /**
         * Defines and renders app user manager components
         * @returns {div}
         */
        renderUserManager: function() {
            // User manager div
            let userManagerDiv = domConstruct.create('div', {id: 'user-manager', class: 'admin-panel'});

            // Label
            let userManagerLabelDiv = domConstruct.create('div', {class: 'admin-manager-label'});
            userManagerLabelDiv.appendChild(domConstruct.create('span', {innerHTML: 'Users'}));

            // Role manager actions
            let userManagerActionsDiv = domConstruct.create('div', {class: 'admin-manager-actions'});
            userManagerActionsDiv.appendChild(new Button({
                showLabel: true,
                label: 'Add User',
                iconClass: 'dijitIconNewTask',
                class: 'manager-action',
                onClick: showAddUserDialog
            }).domNode);

            userManagerActionsDiv.appendChild(new Button({
                showLabel: true,
                label: 'Delete Selected User(s)',
                iconClass: 'dijitIconDelete',
                class: 'manager-action',
                onClick: UserManagerViewController.deleteUser
            }).domNode);

            // User manager grid
            let userManagerGridDiv = domConstruct.create('div', {id: 'user-grid'});

            userManagerDiv.appendChild(userManagerLabelDiv);
            userManagerDiv.appendChild(userManagerActionsDiv);
            userManagerDiv.appendChild(userManagerGridDiv);
            return userManagerDiv;
        }
    }
});