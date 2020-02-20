/*
 * ShoppingCart.js
 *
 * Defines visual components that compose the shopping cart widget and its associated components.
 * This widget is used to allow users to add products for export.
 */

define(['dojo/dom',
        'dojo/dom-construct',
        'dijit/dijit',
        'dijit/form/Button',
        'app/widgets/cart/viewController/ShoppingCartViewController'],
            function(dom, domConstruct, dijit, Button, ShoppingCartViewController) {

    return {
        renderShoppingCartBtn: function() {
            return new Button({
                id: 'shoppingCartBtn',
                class: 'rightHeaderButton',
                label: '(0)',
                showLabel: true,
                iconClass: 'shopping-cart-img',
                title: ShoppingCartViewController.getShoppingCartCount() + ' items in cart',
                onClick: function() {
                    ShoppingCartViewController.incrementShoppingCartCount();
                }
            })
        }
    }
});