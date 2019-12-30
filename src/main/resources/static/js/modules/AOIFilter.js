/*
 * AOIFilter.js
 *
 * Defines components/widgets needed to facilitate filtering by AOI. Allows for
 * user defined AOI filtering.
 */

define(['dijit/form/DropDownButton',
        'dijit/DropDownMenu',
        'dijit/Menu',
        'dijit/MenuItem',
        'dijit/PopupMenuItem',
        'dijit/TooltipDialog',
        'app/widgets/aoi/AOIDraw'], function(DropDownButton, DropDownMenu, Menu, MenuItem, PopupMenuItem,
                                             TooltipDialog, AOIDraw) {

    let aoiFilterMenu = new DropDownMenu({
        id: 'aoiMenu',
        class: 'appMenu'
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

    let aoiManagerMenuItem = new MenuItem({
        label: 'AOI Manager',
        class: 'appMenuItem',
        tooltip: 'View your defined AOIs',
        onClick: function () {
            console.log('Display AOI manager widget...');
        }
    });

    aoiFilterMenu.addChild(new AOIDraw().renderDrawWidgets());
    aoiFilterMenu.addChild(modifyAOIMenuItem);
    aoiFilterMenu.addChild(uploadAOIMenuItem);
    aoiFilterMenu.addChild(aoiManagerMenuItem);

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