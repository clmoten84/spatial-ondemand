/*
 * RolesManagerViewController.js
 *
 * Defines business logic functions for the role manager widget
 */

define(['dojo/_base/json',
        'dojo/query',
        'dojo/request',
        'dojo/dom',
        'dijit/dijit',
        'dijit/Dialog',
        'dojo/store/Memory',
        'gridx/Grid',
        'gridx/core/model/cache/Sync',
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
            function(dojo, query, request, dom, dijit, Dialog, Store, Grid, Cache, HScroller, VirtualVScroller,
                     ColumnResizer, SingleSort, SelectRow, Bar, Pagination, PaginationBar,
                     CellWidget, RowHeader, IndirectSelect){

    return {
        /**
         * Fetches ALL role records and displays in a grid
         */
        fetchAllRoles: function() {
            request.get('api/roles', {
                handleAs: 'json',
                timeout: 60000,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then (
                function (response) {
                    // Create in-memory store to hold response from server
                    let dataStore = new Store({
                        id: 'roles-grid-store',
                        data: response,
                        idProperty: 'id'
                    });

                    // Create grid and populate it with data
                    let roleGrid = new Grid({
                        id: 'roles-grid',
                        store: dataStore,
                        cacheClass: Cache,
                        structure: [
                            {id: 'id_col', field: 'id', name: 'ID', width:'auto'},
                            {id: 'name_col', field: 'roleName', name: 'Name', width: 'auto'},
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
                        ],
                        onModulesLoaded: function() {
                            // ADMIN role should not be selectable for delete or update - so need to find
                            // it in the grid and make it unselectable.
                            for(let i=0; i < this.rowCount(); i++) {
                                let roleName = this.row(i, false).rawData().roleName;
                                if (roleName === 'ADMIN')
                                    this.row(i, false).setSelectable(false);
                            }
                        }
                    });

                    roleGrid.placeAt('role-grid');
                    roleGrid.startup();
                },

                function (err) {
                    let errDialog = new Dialog({
                        title: 'Error',
                        content: 'An error occurred during server operation. Please contact app administrators ' +
                            'if this problem persists.',
                        style: 'width:300px;'
                    });
                    errDialog.show();
                    console.error(err);
                }
            );
        },

        /**
         * Adds a new role specified by addRoleParms to DB
         * @param addRoleParms
         */
        addNewRole: function(addRoleParms) {
            let token = query("meta[name='_csrf']")[0].content;
            let header = query("meta[name='_csrf_header']")[0].content;

            let reqHeaders = {};
            reqHeaders[header] = token;
            reqHeaders['Content-Type'] = 'application/json';
            let roleData = {
                roleName: addRoleParms['roleName'],
                dateCreated: addRoleParms['dateCreated'],
                lastModified: addRoleParms['lastModified']
            };

            request.post('api/roles', {
                handleAs: 'json',
                timeout: 60000,
                headers: reqHeaders,
                data: dojo.toJson(addRoleParms)
            }).then(
                function(response) {
                    // Success. Add the new record to the grid
                    let rolesGrid = dijit.byId('roles-grid');
                    rolesGrid.model.clearCache();
                    rolesGrid.model.store.add(response);
                    rolesGrid.body.refresh();
                },

                function(err) {
                    // Request failed. Alert user.
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
         * Deletes roles selected in roles-grid
         */
        deleteRole: function() {
            // Need to get the selected rows and their ids to send to server
            let rolesGrid = dijit.byId('roles-grid');
            let selectedRows = rolesGrid.select.row.getSelected();

            if (selectedRows.length > 0) {
                let header = query("meta[name='_csrf_header']")[0].content;
                let token = query("meta[name='_csrf']")[0].content;
                let reqHeaders = {};
                reqHeaders[header] = token;
                reqHeaders['Content-Type'] = 'application/json';

                request.del('api/roles', {
                    handleAs: 'json',
                    timeout: 60000,
                    headers: reqHeaders,
                    query: {
                        'roleIds': selectedRows
                    }
                }).then(
                    function(response) {
                        // Success. Remove the deleted records from the grid
                        rolesGrid.model.clearCache();
                        selectedRows.forEach(function(currVal) {
                            rolesGrid.model.store.remove(currVal);
                        });
                        rolesGrid.body.refresh();
                    },

                    function(err) {
                        // Request failed. Alert user.
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
                    title: 'Delete Role',
                    content: 'There are no roles selected for delete...',
                    style: 'width:300px;'
                });
                alertDialog.show();
            }
        }
    }
});