/*
 * Filter.js
 *
 * Defines the components needed to provide filtering capability by Product and/or Criteria
 * filtering.
 */

define(['dojo/request',
        'dijit/form/DropDownButton',
        'dijit/DropDownMenu',
        'dijit/MenuItem',
        'app/CriteriaFilter'], function(request, DropDownButton, DropDownMenu, MenuItem, CriteriaFilter){

    // Define drop down menu and menu items
    let filterMenu = new DropDownMenu();
    let productFilterMenuItem = new MenuItem({
        label: 'Product Filter',
        class: 'appMenuItem',
        tooltip: 'Filter the export by enabling/disabling service products...',
        onClick: function() {
            request.get('api/products', {
                handleAs: 'json',
                timeout: 60000,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(
                function(text) {
                    // Success
                    console.log(text);
                },

                function(err) {
                    // Fail
                    console.error(err);
                }
            );
        }
    });

    let criteriaFilterMenuItem = new MenuItem({
        label: 'Criteria Filter',
        class: 'appMenuItem',
        tooltip: 'Filter the export by search and optical criteria parameters...',
        onClick: function() {
            // Construct instance of CriteriaFilter and display the filter window
            var criteriaFilter = new CriteriaFilter();
            criteriaFilter.showHideFilterWindow();
        }
    });

    filterMenu.addChild(productFilterMenuItem);
    filterMenu.addChild(criteriaFilterMenuItem);

    // Define button for triggering drop down menu
    let filterBtn = new DropDownButton({
        name: 'filtersBtn',
        id: 'filtersBtn',
        class: 'appButton',
        label: 'Filters',
        showLabel: true,
        iconClass: 'dijitIconFilter',
        dropDown: filterMenu
    });

    return {
        initFiltersBtn: function() {
            return filterBtn;
        }
    }
});