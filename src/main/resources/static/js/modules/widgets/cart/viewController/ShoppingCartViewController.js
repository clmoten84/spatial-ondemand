/*
 * ShoppingCartViewController.js
 *
 * Defines business logic for shopping cart widget/tool
 */

define(['dojo/dom',
        'dijit/dijit'], function(dom, dijit) {

    let shoppingCartCount = 0;

    /**
     * Updates the shopping cart button display with updated values of shopping cart
     * count.
     */
    function updateShoppingCartBtn() {
        let shoppingCartBtn = dijit.byId('shoppingCartBtn');
        shoppingCartBtn.set('label', '(' + shoppingCartCount + ')');
        shoppingCartBtn.set('title', shoppingCartCount + ' items in cart');
    }

    return {
        /**
         * Get the running count of items currently in shopping cart
         * @returns {number}
         */
        getShoppingCartCount: function() {
            return shoppingCartCount;
        },

        /**
         * Increment the running count of items in shopping cart
         */
        incrementShoppingCartCount: function() {
            // Increment shopping cart count and update shopping cart button display
            shoppingCartCount += 1;
            updateShoppingCartBtn();
        },

        /**
         * Decrement the running count of items in shopping cart
         */
        decrementShoppingCartCount: function() {
            // Decrement shopping cart count and update shopping cart button display
            shoppingCartCount -= 1;
            updateShoppingCartBtn();
        }
    }

});