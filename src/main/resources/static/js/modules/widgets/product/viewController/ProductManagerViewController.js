/*
 * ProductManager.js
 *
 * Singleton. Defines components and widgets required for the Product tree that allows users
 * to load products/services into the map for defining export. Defined as a singleton to prevent
 * multiple instantiations.
 */

define(['dojo/request',
        'dojo/query',
        'app/widgets/product/view/ProductManager'], function(request, query, ProductManager) {

    return {
        renderProducts: function() {
            // Make request to fetch product related data from server for display
            let token = query("meta[name='_csrf']")[0].content;
            let header = query("meta[name='_csrf_header']")[0].content;

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