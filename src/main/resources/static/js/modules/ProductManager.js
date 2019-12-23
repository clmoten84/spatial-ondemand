/*
 * ProductManager.js
 *
 * Singleton. Defines components and widgets required for the Product tree that allows users
 * to load products/services into the map for defining export. Defined as a singleton to prevent
 * multiple instantiations.
 */

define(['dojo/dom',
        'dojo/request',
        'dijit/dijit',
        'dijit/TitlePane'], function(dom, request, dijit, TitlePane) {

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
                        var productCat = new TitlePane({
                            id: currVal.groupName + '_productcat',
                            class: 'productCategoryPanes',
                            title: currVal.groupName,
                            open: 0
                        });

                        productManagerContainer.addChild(productCat);
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