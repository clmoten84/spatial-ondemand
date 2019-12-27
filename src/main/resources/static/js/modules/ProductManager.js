/*
 * ProductManager.js
 *
 * Singleton. Defines components and widgets required for the Product tree that allows users
 * to load products/services into the map for defining export. Defined as a singleton to prevent
 * multiple instantiations.
 */

define(['dojo/on',
        'dojo/dom',
        'dojo/request',
        'dijit/dijit',
        'dijit/TitlePane',
        'dijit/form/CheckBox'], function(on, dom, request, dijit, TitlePane, CheckBox) {

    return {
        renderProducts: function() {
            // Make request to fetch product related data from server for display
            request.get('api/productGroups', {
                handleAs: 'json',
                timeout: 60000,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(
                function (response) {
                    // Create UI components using data retrieved from server and add to
                    // product container pane with dijitId 'productManagerContainer'.
                    var productGroups = response;
                    var productManagerContainer = dijit.byId('productManagerContainer');
                    productGroups.forEach(function(currVal, idx, arr) {
                        // Create product category title pane component
                        var productCat = new TitlePane({
                            id: currVal.groupName + '_productcat',
                            class: 'productCategoryPanes',
                            title: currVal.groupName + ' (' + currVal.products.length + ')',
                            open: 0,
                            toggleable: true
                        });

                        // Add product checkboxes to category title pane


                        // Add product category title pane component to product manager container
                        productManagerContainer.addChild(productCat);

                        // Handle click of title pane node (i.e. expand and collapse of title pane)
                        /*var evtTarget = dom.byId(currVal.groupName + '_productcat_titleBarNode');
                        on(evtTarget, 'click', function(arg) {
                            if (productCat.open) {
                                // Load associated products from server
                            }
                        });*/
                    });
                },

                function (err) {
                    // Request to fetch product groups failed - alert user
                    console.error(err);
                }
            );
        }
    }
});