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
    let filterMenu = new DropDownMenu({
        id: 'filterMenu',
        class: 'appMenu'
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

    filterMenu.addChild(criteriaFilterMenuItem);

    // Define button for triggering drop down menu
    let filterBtn = new DropDownButton({
        name: 'filtersBtn',
        id: 'filtersBtn',
        class: 'rightHeaderButton',
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