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
        'app/widgets/filter/view/CriteriaFilter'], function(request, DropDownButton, DropDownMenu,
                                                            MenuItem, CriteriaFilter){
    return {
        renderFiltersMenu: function() {
            let filterMenu = new DropDownMenu({
                id: 'filterMenu',
                class: 'appMenu'
            });
            filterMenu.addChild(new MenuItem({
                label: 'Criteria Filter',
                class: 'appMenuItem',
                tooltip: 'Filter the export by search and optical criteria parameters...',
                onClick: function() {
                    CriteriaFilter.showCriteriaFilter();
                }
            }));

            return new DropDownButton({
                name: 'filtersBtn',
                id: 'filtersBtn',
                class: 'rightHeaderButton',
                label: 'Filters',
                showLabel: true,
                iconClass: 'dijitIconFilter',
                dropDown: filterMenu
            });
        }
    }
});