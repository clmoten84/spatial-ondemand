/*
 * ProductManager.js
 *
 * Singleton. Defines components and widgets required for the Product tree that allows users
 * to load products/services into the map for defining export. Defined as a singleton to prevent
 * multiple instantiations.
 */

define(['dojo/on',
        'dojo/dom',
        'dojo/dom-construct',
        'dojo/request',
        'dijit/dijit',
        'dijit/TitlePane',
        'dijit/form/CheckBox',
        'app/widgets/product/view/ProductManager'], function(on, dom, domConstruct, request,
                                                             dijit, TitlePane, CheckBox, ProductManager) {

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
                    // Display product data from server in product container
                    ProductManager.renderProductData(response);
                },

                function (err) {
                    // Request to fetch product groups failed - alert user
                    console.error(err);
                }
            );
        }
    }
});