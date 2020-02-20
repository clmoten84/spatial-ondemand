/*
 * RolesManager.js
 *
 * Defines components that comprise the roles manager widget/view
 */

define(['dojo/dom-construct',
        'dijit/form/Button',
        'dijit/form/ValidationTextBox',
        'dijit/Dialog',
        'app/widgets/admin/roles/viewController/RolesManagerViewController'],
            function(domConstruct, Button, TextBox, Dialog, RolesManagerViewController) {

    /**
     * Display Add Role dialog form
     */
    function showAddRoleDialog() {
        // Initialize the dialog
        let addRoleDialog = new Dialog({
            title: 'Add New Role',
            onHide: function() {
                // Destroy the add role dialog on close
                this.destroy();
            }
        });

        // Form fields
        let addRoleFormDiv = domConstruct.create('div', {style: 'font-size:small;'});
        let roleNameField = domConstruct.create('div', {class: 'admin-form-field'});
        roleNameField.appendChild(domConstruct.create('label', {innerHTML: 'Role Name', class: 'admin-form-field-label'}));
        let roleNameTextBox = new TextBox({
            class: 'admin-form-field-textbox',
            placeHolder: 'Enter a name for the new role...',
            uppercase: true,
            maxLength: 50,
            required: true,
            missingMessage: 'A role name must be specified!',
            trim: true,
            onChange: function(val) {

            }
        });
        roleNameField.appendChild(roleNameTextBox.domNode);

        // Form buttons
        let addRoleFormActions = domConstruct.create('div', {class: 'admin-form-actions'});
        addRoleFormActions.appendChild(new Button({
            showLabel: true,
            label: 'Cancel',
            class: 'manager-action',
            onClick: function() {
                // Cancel the add role request
                addRoleDialog.hide();
            }
        }).domNode);

        addRoleFormActions.appendChild(new Button({
            showLabel: true,
            label: 'Add Role',
            class: 'manager-action',
            onClick: function() {
                // Gather input into an object and send to view controller to handle request
                let addRoleParms = {
                    roleName: roleNameTextBox.get('value'),
                    dateCreated: new Date(),
                    lastModified: new Date()
                };

                RolesManagerViewController.addNewRole(addRoleParms);
                addRoleDialog.hide();
            }
        }).domNode);

        // Add form components to form div
        addRoleFormDiv.appendChild(roleNameField);
        addRoleFormDiv.appendChild(addRoleFormActions);

        // Add the role form to the dialog
        addRoleDialog.set('content', addRoleFormDiv);
        addRoleDialog.show();
    }

    return {
        /**
         * Defines and renders role manager components
         * @returns {div}
         */
        renderRolesManager: function() {
            // Roles manager div
            let rolesManagerDiv = domConstruct.create('div', {id: 'roles-manager', class: 'admin-panel'});

            // Roles manager label
            let rolesManagerLabelDiv = domConstruct.create('div', {class: 'admin-manager-label'});
            rolesManagerLabelDiv.appendChild(domConstruct.create('span', {innerHTML: 'Roles'}));

            // Role manager actions
            let rolesManagerActionsDiv = domConstruct.create('div', {class: 'admin-manager-actions'});
            rolesManagerActionsDiv.appendChild(new Button({
                showLabel: true,
                label: 'Add Role',
                iconClass: 'dijitIconNewTask',
                class: 'manager-action',
                onClick: showAddRoleDialog
            }).domNode);

            rolesManagerActionsDiv.appendChild(new Button({
                showLabel: true,
                label: 'Delete Role',
                iconClass: 'dijitIconDelete',
                class: 'manager-action',
                onClick: RolesManagerViewController.deleteRole
            }).domNode);

            // Role manager grid
            let rolesManagerGridDiv = domConstruct.create('div', {id: 'role-grid'});

            rolesManagerDiv.appendChild(rolesManagerLabelDiv);
            rolesManagerDiv.appendChild(rolesManagerActionsDiv);
            rolesManagerDiv.appendChild(rolesManagerGridDiv);
            return rolesManagerDiv;
        }
    }
});