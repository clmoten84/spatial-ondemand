/*
 * AOIManager
 *
 * Defines the visual components/widgets for the AOI management tool. The AOI Manager manages
 * the user defined AOI graphics added to map for filtering export by AOI. The manager tool
 * allows the user to zoom to, modify, and delete user defined AOIs.
 */

define(['dojo/dom',
        'dojo/dom-style',
        'dijit/dijit',
        'dojo/dom-construct',
        'dojox/layout/FloatingPane',
        'dijit/Dialog',
        'dijit/form/Select',
        'dijit/form/Button',
        'dijit/form/ToggleButton',
        'app/widgets/aoi/viewController/AOIManagerViewController'],
            function(dom, domStyle, dijit, domConstruct, FloatingPane, Dialog, Select,
                     Button, ToggleButton, AOIManagerViewController) {

    /**
     * Defines and renders the AOI manager tool components
     * @return div domNode
     */
    function renderAOIManagerComponents() {
        // Define the div container to hold the components
        let aoiManagerDiv = domConstruct.create('div', {style: 'text-align:center; background-color:beige;'});
        aoiManagerDiv.appendChild(domConstruct.create('label', {innerHTML: '<b>AOI:</b>', style: 'margin-right:6px; vertical-align:middle; display:inline-block;'}));
        aoiManagerDiv.appendChild(new Select({
            id: 'aoiManagerSelect',
            style: 'width:150px; display:inline-block; margin-right:4px;',
            options: []
        }).domNode);

        aoiManagerDiv.appendChild(new Button({
            id: 'goToAOIBtn',
            label: 'Go',
            title: 'Go to selected AOI',
            iconClass: 'dijitEditorIcon dijitEditorIconRedo', // Using this icon because it looks like a go to icon
            disabled: true,
            class: 'disabledAppBtn',
            showLabel: false,
            style: 'display:inline-block; margin-right:2px;',
            onClick: function() {
                // Set the extent of the map to the selected AOI
                AOIManagerViewController.goToAOI(dijit.byId('aoiManagerSelect').get('value'));
            }
        }).domNode);

        aoiManagerDiv.appendChild(new ToggleButton({
            id: 'editAOIBtn',
            label: 'Edit',
            title: 'Modify the selected AOI',
            iconClass: 'dijitIconEditTask',
            disabled: true,
            class: 'disabledAppBtn',
            showLabel: false,
            checked: false,
            style: 'display:inline-block; margin-right:2px;',
            onChange: AOIManagerViewController.onEditToggle
        }).domNode);

        aoiManagerDiv.appendChild(new Button({
            id: 'deleteAOIBtn',
            label: 'Delete',
            title: 'Delete the selected AOI',
            iconClass: 'dijitIconDelete',
            disabled: true,
            class: 'disabledAppBtn',
            showLabel: false,
            style: 'display:inline-block; margin-right:2px;',
            onClick: function() {
                // Delete the selected AOI graphic from map
                AOIManagerViewController.removeAOIFromMap(dijit.byId('aoiManagerSelect').get('value'));
            }
        }).domNode);

        aoiManagerDiv.appendChild(new Button({
            id: 'clearAOIsBtn',
            label: 'Clear',
            title: 'Delete all AOIs',
            iconClass: 'dijitIconClear',
            disabled: true,
            class: 'disabledAppBtn',
            showLabel: false,
            style: 'display:inline-block; margin-right:2px;',
            onClick: AOIManagerViewController.removeAllAOIsFromMap
        }).domNode);

        aoiManagerDiv.appendChild(new Button({
            id: 'exportAOIBtn',
            label: 'Export',
            title: 'Export the selected AOI to KML',
            iconClass: 'dijitIconSave',
            disabled: true,
            class: 'disabledAppBtn',
            showLabel: false,
            style: 'display:inline-block;',
            onClick: function() {
                // Export the selected AOI to KML
                AOIManagerViewController.onAOIExport(dijit.byId('aoiManagerSelect').get('value'));
            }
        }).domNode);

        return aoiManagerDiv;
    }

    let aoiManagerWindow = new Dialog({
        id: 'aoiManager',
        title: 'AOI Manager',
        class: 'appNonModalDialog'
    });
    aoiManagerWindow.focus = function() {}; // This is a hack to prevent the dialog from requesting focus
    aoiManagerWindow.set('content', renderAOIManagerComponents());

    return {
        /**
         * Show the AOI manager window
         */
        showHideAOIManager: function() {
            if (aoiManagerWindow.open) {
                aoiManagerWindow.hide();
            }
            else {
                aoiManagerWindow.show();
            }
        }
    }
});