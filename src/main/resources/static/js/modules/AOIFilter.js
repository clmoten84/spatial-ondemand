/*
 * AOIFilter.js
 *
 * Defines components/widgets needed to facilitate filtering by AOI. Allows for
 * user defined AOI filtering.
 */

define(['dijit/form/DropDownButton',
        'dijit/DropDownMenu',
        'dijit/MenuItem'], function(DropDownButton, DropDownMenu, MenuItem) {

    let aoiFilterMenu = new DropDownMenu({
        id: 'aoiMenu'
    });

    let drawAOIMenuItem = new MenuItem({
        label: 'Draw AOI',
        class: 'appMenuItem',
        tooltip: 'Draw an area of interest for export...',
        onClick: function () {
            console.log('Initialize the drawing toolbar...');
        }
    });

    let modifyAOIMenuItem = new MenuItem({
        label: 'Modify AOI',
        class: 'appMenuItem',
        tooltip: 'Modify an existing area of interest for export...',
        onClick: function () {
            console.log('Initialize the drawing toolbar and AOI manager widget...');
        }
    });

    let uploadAOIMenuItem = new MenuItem({
        label: 'Upload AOI',
        class: 'appMenuItem',
        tooltip: 'Upload an AOI for export...',
        onClick: function () {
            console.log('Initialize AOI upload widget...');
        }
    });

    aoiFilterMenu.addChild(drawAOIMenuItem);
    aoiFilterMenu.addChild(modifyAOIMenuItem);
    aoiFilterMenu.addChild(uploadAOIMenuItem);

    let aoiFilterBtn = new DropDownButton({
        name: 'aoiFiltersBtn',
        id: 'aoiFiltersBtn',
        class: 'rightHeaderButton',
        label: 'Define AOI',
        showLabel: true,
        iconClass: 'dijitIconEdit',
        dropDown: aoiFilterMenu
    })

    return {
        initAOIFilter: function() {
            return aoiFilterBtn;
        }
    }
});