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
        'dijit/form/CheckBox'], function(on, dom, domConstruct, request, dijit, TitlePane, CheckBox) {

    /*
     * Use this function to normalize product and product group names. We use the product and product group names
     * as id values for the product option checkboxes. Since HTML does not allow for spaces in IDs, the names need
     * to be normalized.
     */
    function normalizeProductValues(prodVal) {
        return prodVal.replace(/ /g, "_");
    }

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
                    let productGroups = response;
                    let productManagerContainer = dijit.byId('productManagerContainer');
                    productGroups.forEach(function(currGroup) {
                        // Create product category title pane component and add to product manager container
                        let productCat = new TitlePane({
                            id: normalizeProductValues(currGroup.groupName) + '_productcat',
                            class: 'productCategoryPanes',
                            title: currGroup.groupName + ' (' + currGroup.products.length + ')',
                            open: 0,
                            toggleable: true
                        });
                        productManagerContainer.addChild(productCat);

                        // Add product checkboxes to category title pane using algorithm below
                        // First create a div to hold the checkbox/label combo. Then add the div to the product category title pane DOM node.
                        // Then create the checkbox and label elements and append their DOM nodes to the checkbox/label div.
                        // This seems convoluted....but Dojo...
                        // ALL option
                        let productCatDOM = dom.byId(normalizeProductValues(currGroup.groupName) + '_productcat_pane');
                        let allInputWidget = domConstruct.create('div', {id: normalizeProductValues(currGroup.groupName) + '_inputWidget', class: 'productOption'});
                        productCatDOM.appendChild(allInputWidget);

                        // ALL option input checkbox
                        let allOption = new CheckBox({
                            id: normalizeProductValues(currGroup.groupName) + '_ALL',
                            intermediateChanges: true,
                            title: 'Toggle all products for group ' + currGroup.groupName,
                            checked: false,
                            productGroup: currGroup,
                            onChange: function (newVal) {
                                let selectedGroupName = this.productGroup.groupName;
                                this.productGroup.products.forEach(function (product) {
                                    let productCheckbox = dijit.byId(
                                        normalizeProductValues(selectedGroupName) + '_' +
                                        normalizeProductValues(product.productName));

                                    if (newVal) {
                                        if (!productCheckbox.get('checked'))
                                            productCheckbox.set('checked', true);
                                    }
                                    else {
                                        if (productCheckbox.get('checked'))
                                            productCheckbox.set('checked', false);
                                    }
                                });
                            }
                        });
                        allInputWidget.appendChild(allOption.domNode);

                        // ALL option label
                        let allLbl = domConstruct.create('label', {innerHTML: 'ALL', class: 'productLabel'});
                        allInputWidget.appendChild(allLbl);

                        // Individual product options
                        currGroup.products.forEach(function (currProduct) {
                            let productInputWidget = domConstruct.create('div', {id: normalizeProductValues(currGroup.groupName) + '_' +
                                    normalizeProductValues(currProduct.productName) + '_inputWidget', class: 'productOption'});
                            productCatDOM.appendChild(productInputWidget);

                            // Individual product option input checkbox
                            let productOption = new CheckBox({
                                id: normalizeProductValues(currGroup.groupName) + '_' + normalizeProductValues(currProduct.productName),
                                intermediateChanges: true,
                                title: 'Toggle product ' + currProduct.productName,
                                checked: false,
                                productGroup: currGroup.groupName,
                                product: currProduct,
                                onChange: function (newVal) {
                                    if (newVal) {
                                        console.log('Load product ' + this.product.productName + ' into map for export.');
                                    }
                                    else {
                                        console.log('Remove product ' + this.product.productName + ' from map.');
                                    }
                                }
                            });
                            productInputWidget.appendChild(productOption.domNode);

                            // Individual product option label
                            let productLbl = domConstruct.create('label', {innerHTML: currProduct.productName, class: 'productLabel'});
                            productInputWidget.appendChild(productLbl);
                        });
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