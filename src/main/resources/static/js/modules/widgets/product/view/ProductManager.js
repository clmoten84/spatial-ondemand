/*
 * ProductManager.js
 *
 * Defines visual components for displaying and interacting with product data. The product
 * manager tool allows users to select/de-select products to for export.
 */

define(['dojo/dom',
        'dojo/dom-construct',
        'dijit/dijit',
        'dojox/layout/ExpandoPane',
        'dijit/TitlePane',
        'dijit/form/CheckBox'], function(dom, domConstruct, dijit, ExpandoPane, TitlePane, CheckBox) {

    /*
     * Use this function to normalize product and product group names. We use the product and product group names
     * as id values for the product option checkboxes. Since HTML does not allow for spaces in IDs, the names need
     * to be normalized.
     */
    function normalizeProductValues(prodVal) {
        return prodVal.replace(/ /g, "_");
    }

    return {
        /**
         * Renders the container that product selectors will live
         * @returns dojox ExpandoPane
         */
        renderProductContainer: function() {
            return new ExpandoPane({
                id: 'productManagerContainer',
                region: 'left',
                style: 'height: 100%; width:320px;',
                splitter: true,
                title: 'Products'
            });
        },

        /**
         * Renders product data fetched from the server to the product container.
         * @param productGroups
         */
        renderProductData: function(productGroups) {
            // Get the product container
            let productContainer = dijit.byId('productManagerContainer');
            productGroups.forEach(function(currGroup) {
                // Create product category title pane component and add to product manager container
                let productCat = new TitlePane({
                    id: normalizeProductValues(currGroup.groupName) + '_productcat',
                    class: 'productCategoryPanes',
                    title: currGroup.groupName + ' (' + currGroup.products.length + ')',
                    open: 0,
                    toggleable: true
                });
                productContainer.addChild(productCat);

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
                                //TODO: do something here (either loading a service or fetching product results)
                            }
                            else {
                                //TODO: implement action to take when the product is turned OFF
                            }
                        }
                    });
                    productInputWidget.appendChild(productOption.domNode);

                    // Individual product option label
                    let productLbl = domConstruct.create('label', {innerHTML: currProduct.productName, class: 'productLabel'});
                    productInputWidget.appendChild(productLbl);
                });
            });
        }
    }
});