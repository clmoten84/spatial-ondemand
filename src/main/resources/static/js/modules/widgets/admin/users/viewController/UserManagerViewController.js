/*
 * UserManagerViewController.js
 *
 * Defines business logic functions for the user manager widget
 */

define(['dojo/_base/json',
        'dojo/query',
        'dojo/request',
        'dojo/dom',
        'dijit/dijit',
        'dijit/Dialog',
        'dojo/store/Memory',
        'gridx/Grid',
        'gridx/modules/HScroller',
        'gridx/modules/VirtualVScroller',
        'gridx/modules/ColumnResizer',
        'gridx/modules/SingleSort',
        'gridx/modules/extendedSelect/Row',
        'gridx/modules/Bar',
        'gridx/modules/Pagination',
        'gridx/modules/pagination/PaginationBar',
        'gridx/modules/CellWidget',
        'gridx/modules/RowHeader',
        'gridx/modules/IndirectSelect'],
            function(dojo, query, request, dom, dijit, Dialog, Store, Grid, HScroller, VirtualVScroller,
                     ColumnResizer, SingleSort, SelectRow, Bar, Pagination, PaginationBar, CellWidget,
                     RowHeader, IndirectSelect) {

    return {
        /**
         * Fetch all UserAcct records and display in grid
         */
        fetchAllUsers: function() {
            request.get('api/users', {
                handleAs: 'json',
                timeout: 60000,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(
                function(response) {
                    // Use in-memory store to hold response from server
                    let data = new Store({
                        data: response,
                        idProperty: 'id'
                    });

                    // Create grid and populate it with data
                    let userGrid = new Grid({
                        id: 'users-grid',
                        store: data,
                        structure: [
                            {id: 'id_col', field: 'id', name: 'ID', width: 'auto'},
                            {id: 'username_col', field: 'email', name: 'Email', width: 'auto'},
                            {id: 'name_col', field: 'name', name: 'Name', width: 'auto'},
                            {
                                id: 'role_col',
                                field: 'roles',
                                name: 'Roles',
                                width: 'auto',
                                decorator: function(roles) {
                                    let rolesStr = "";
                                    if (roles) {
                                        for(let i=0; i < roles.length; i++) {
                                            if (i + 1 === roles.length)
                                                rolesStr = rolesStr + roles[i].roleName;
                                            else
                                                rolesStr = rolesStr + roles[i].roleName + ', ';
                                        }
                                    }

                                    return rolesStr;
                                }
                            },
                            {id: 'biz_col', field: 'bizEntity', name: 'Company', width: 'auto'},
                            {id: 'date_created_col', field: 'dateCreated', name: 'Date Created', width: 'auto'},
                            {id: 'last_mod_col', field: 'lastModified', name: 'Last Modified', width: 'auto'}
                        ],
                        selectRowTriggerOnCell: true,
                        indirectSelectAll: true,
                        modules: [
                            HScroller,
                            VirtualVScroller,
                            ColumnResizer,
                            SingleSort,
                            SelectRow,
                            Bar,
                            Pagination,
                            PaginationBar,
                            CellWidget,
                            RowHeader,
                            IndirectSelect
                        ]
                    });

                    userGrid.placeAt('user-grid');
                    userGrid.startup();
                },

                function(err) {
                    let errDialog = new Dialog({
                        title: 'Error',
                        content: 'A server error occurred. Please contact app administrators ' +
                            'if this problem persists.',
                        style: 'width:300px;'
                    });
                    errDialog.show();
                    console.error(err);
                }
            )
        },

        /**
         * Fetch all User records by role name and display in grid placed at arg dom node
         */
        fetchUsersByRole: function(roleName, placeGridAt) {
            request.get('api/users', {
                handleAs: 'json',
                timeout: 60000,
                query: {
                    'roleName': roleName
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then (
                function(response) {
                    // Use in-memory store to hold response from server
                    let data = new Store({
                        data: response,
                        idProperty: 'id'
                    });

                    // Create grid and populate it with data
                    let adminUserGrid = new Grid({
                        id: 'users-grid',
                        store: data,
                        structure: [
                            {id: 'id_col', field: 'id', name: 'ID', width: 'auto'},
                            {id: 'username_col', field: 'username', name: 'Username', width: 'auto'},
                            {id: 'name_col', field: 'name', name: 'Name', width: 'auto'},
                            {id: 'biz_col', field: 'bizEntity', name: 'Biz Entity', width: 'auto'},
                            {id: 'date_created_col', field: 'dateCreated', name: 'Date Created', width: 'auto'},
                            {id: 'last_mod_col', field: 'lastModified', name: 'Last Modified', width: 'auto'},
                            {
                                id: 'role_col',
                                field: 'roles',
                                name: 'Roles',
                                width: 'auto',
                                decorator: function(roles) {
                                    let rolesStr = "";
                                    if (roles) {
                                        for(let i=0; i < roles.length; i++) {
                                            if (i + 1 === roles.length)
                                                rolesStr = roles[i].roleName;
                                            else
                                                rolesStr = roles[i].roleName + ', ';
                                        }
                                    }

                                    return rolesStr;
                                }
                            }
                        ],
                        selectRowTriggerOnCell: true,
                        modules: [
                            VirtualVScroller,
                            ColumnResizer,
                            SingleSort,
                            SelectRow,
                            Bar,
                            Pagination,
                            PaginationBar,
                            CellWidget
                        ]
                    });

                    adminUserGrid.placeAt(placeGridAt);
                    adminUserGrid.startup();
                },
                function(err) {
                    let errDialog = new Dialog({
                        title: 'Error',
                        content: 'A server error occurred. Please contact app administrators ' +
                            'if this problem persists.',
                        style: 'width:300px;'
                    });
                    errDialog.show();
                    console.error(err);
                }
            );
        },

        /**
         * Add a new user record
         */
        addNewUser: function(addUserParms) {
            let csrfTokenHeader = query("meta[name='_csrf_header']")[0].content;
            let csrfToken = query("meta[name='_csrf']")[0].content;

            let reqHeaders = {};
            reqHeaders[csrfTokenHeader] = csrfToken;
            reqHeaders['Content-Type'] = 'application/json';

            request.post('api/users', {
                handleAs: 'json',
                timeout: 60000,
                headers: reqHeaders,
                data: dojo.toJson(addUserParms)
            }).then(
                function(response) {
                    // Success. Add the new record to the grid
                    let usersGrid = dijit.byId('users-grid');
                    usersGrid.model.clearCache();
                    usersGrid.model.store.add(response);
                    usersGrid.body.refresh();
                },

                function(err) {
                    let errDialog = new Dialog({
                        title: 'Error',
                        content: 'A server error occurred. Please contact app administrators ' +
                            'if this problem persists.',
                        style: 'width:300px;'
                    });
                    errDialog.show();
                    console.error(err);
                }
            )
        },

        /**
         * Delete user records specified in arg user ids
         * @param userIds
         */
        deleteUser: function() {
            // Get the selected rows from the grid
            let usersGrid = dijit.byId('users-grid');
            let selectedRows = usersGrid.select.row.getSelected();

            if (selectedRows.length > 0) {
                let csrfTokenHeader = query("meta[name='_csrf_header']")[0].content;
                let csrfToken = query("meta[name='_csrf']")[0].content;
                let reqHeaders = {};
                reqHeaders[csrfTokenHeader] = csrfToken;
                reqHeaders['Content-Type'] = 'application/json';

                request.del('api/users', {
                    handleAs: 'json',
                    timeout: 60000,
                    headers: reqHeaders,
                    query: {
                        'userIds': selectedRows
                    }
                }).then(
                    function(response) {
                        // Success. Remove the deleted records from the grid
                        usersGrid.model.clearCache();
                        selectedRows.forEach(function(currVal) {
                            usersGrid.model.store.remove(currVal);
                        });
                        usersGrid.body.refresh();
                    },

                    function(err) {
                        let errDialog = new Dialog({
                            title: 'Error',
                            content: 'A server error occurred. Please contact app administrators ' +
                                'if this problem persists.',
                            style: 'width:300px;'
                        });
                        errDialog.show();
                        console.error(err);
                    }
                );
            }
            else {
                let alertDialog = new Dialog({
                    title: 'Delete User',
                    content: 'There are no users selected for delete...',
                    style: 'width:300px;'
                });
                alertDialog.show();
            }
        }
    }
});