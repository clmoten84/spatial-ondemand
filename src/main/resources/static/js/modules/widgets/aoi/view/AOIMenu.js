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
        'app/widgets/aoi/view/AOIDraw',
        'app/widgets/aoi/view/DrawTool',
        'app/widgets/aoi/view/AOIManager'], function(DropDownButton, DropDownMenu, Menu, MenuItem, PopupMenuItem,
                                                    TooltipDialog, AOIDraw, DrawTool, AOIManager) {

    return {
        renderAOIMenu: function() {
            let aoiMenu = new DropDownMenu({
                id: 'aoiMenu',
                class: 'appMenu'
            });

            aoiMenu.addChild(new AOIDraw().renderDrawWidgets());

            //TODO: finish implementing upload AOI functionality
            /*aoiMenu.addChild(new MenuItem({
                label: 'Upload AOI',
                class: 'appMenuItem',
                tooltip: 'Upload an AOI for export...',
                onClick: function () {
                    console.log('Initialize AOI upload widget...');
                }
            }));*/

            aoiMenu.addChild(new MenuItem({
                label: 'AOI Manager',
                class: 'appMenuItem',
                tooltip: 'View defined AOIs',
                onClick: function () {
                    AOIManager.showHideAOIManager();
                }
            }));

            aoiMenu.addChild(new MenuItem({
                label: 'Cancel Draw',
                class: 'appMenuItem',
                tooltip: 'Cancel active draw operation...',
                onClick: function () {
                    let drawTool = DrawTool.getInstance();
                    drawTool.deactivate();
                }
            }));

            return new DropDownButton({
                name: 'aoiFiltersBtn',
                id: 'aoiFiltersBtn',
                class: 'rightHeaderButton',
                label: 'AOIs',
                showLabel: true,
                iconClass: 'dijitIconEdit',
                dropDown: aoiMenu
            });
        }
    };
});