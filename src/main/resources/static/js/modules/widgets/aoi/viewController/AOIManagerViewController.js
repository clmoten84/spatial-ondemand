/*
 * AOIManagerViewController.js
 *
 * Defines business logic functions for the AOI manager tool
 */

define(['dojo/dom',
        'dijit/dijit',
        'esri/geometry/webMercatorUtils',
        'app/widgets/layout/view/MapView',
        'app/widgets/aoi/view/EditTool',
        'amd_lib/arcgis2geojson',
        'amd_lib/tokml'], function(dom, dijit, webMercatorUtils, MapView,
                               EditTool, ArcgisToGeoJson, tokml) {

    // Initialize the AOI count. This will keep a running count of the number of user defined AOIs. This count
    // will be incremented on AOI add, and decremented on AOI delete.
    // added to the map.
    let aoiCount = 0;

    // Initialize the AOI index. This index will be incremented on AOI add, but should NOT be decremented on
    // AOI delete as this index is used to generate a unique AOI name.
    let aoiIndex = 1;

    /**
     * Increments the running count and the index count. The AOI count is used to keep a running tally of
     * the number of user defined AOIs added to the map. The AOI index is used to generate a unique name
     * for each user defined AOI added to the map.
     */
    function incrementAOICount() {
        aoiCount = aoiCount + 1;
        aoiIndex = aoiIndex + 1;
    }

    /**
     * Decrements the running AOI count.
     */
    function decrementAOICount() {
        aoiCount = aoiCount - 1;
    }

    /**
     * Fetches a user defined AOI graphic from the map view using the arg
     * AOI name.
     * @param aoiName
     */
    function fetchUserDefinedAOI(aoiName) {
        let mapGraphics = MapView.getInstance().map.graphics.graphics;
        for (let i=0; i < mapGraphics.length; i++) {
            if (mapGraphics[i].attributes) {
                if (mapGraphics[i].attributes.aoiName === aoiName) {
                    return mapGraphics[i];
                }
            }
        }
    }

    /**
     * Enables or disables the AOI management actions based on arg enablement flag
     * @param enableFlag
     */
    function setAOIManagementActionsStatus(enableFlag) {
        let goToAOIBtn = dijit.byId('goToAOIBtn');
        let editAOIBtn = dijit.byId('editAOIBtn');
        let deleteAOIBtn = dijit.byId('deleteAOIBtn');
        let clearAOIsBtn = dijit.byId('clearAOIsBtn');
        let exportAOIBtn = dijit.byId('exportAOIBtn');
        let aoiManagerSelect = dijit.byId('aoiManagerSelect');

        if (enableFlag) {
            // Enable the AOI management action buttons
            if (goToAOIBtn.get('disabled')) {
                goToAOIBtn.set('disabled', false);
                goToAOIBtn.set('class', 'secondaryAppBtn');
            }

            if (editAOIBtn.get('disabled')) {
                editAOIBtn.set('disabled', false);
                editAOIBtn.set('class', 'secondaryAppBtn');
            }

            if (deleteAOIBtn.get('disabled')) {
                deleteAOIBtn.set('disabled', false);
                deleteAOIBtn.set('class', 'secondaryAppBtn');
            }

            if (clearAOIsBtn.get('disabled')) {
                clearAOIsBtn.set('disabled', false);
                clearAOIsBtn.set('class', 'secondaryAppBtn');
            }

            if (exportAOIBtn.get('disabled')) {
                exportAOIBtn.set('disabled', false);
                exportAOIBtn.set('class', 'secondaryAppBtn');
            }
        }
        else {
            // Disable the AOI management action buttons
            if (!goToAOIBtn.get('disabled')) {
                goToAOIBtn.set('disabled', true);
                goToAOIBtn.set('class', 'disabledAppBtn');
            }

            if (!editAOIBtn.get('disabled')) {
                editAOIBtn.set('disabled', true);
                editAOIBtn.set('class', 'disabledAppBtn');
            }

            if (!deleteAOIBtn.get('disabled')) {
                deleteAOIBtn.set('disabled', true);
                deleteAOIBtn.set('class', 'disabledAppBtn');
            }

            if (!clearAOIsBtn.get('disabled')) {
                clearAOIsBtn.set('disabled', true);
                clearAOIsBtn.set('class', 'disabledAppBtn');
            }

            if (!exportAOIBtn.get('disabled')) {
                exportAOIBtn.set('disabled', true);
                exportAOIBtn.set('class', 'disabledAppBtn');
            }

            // Clear the AOI manager select box selected text
            aoiManagerSelect._setDisplay('');
        }
    }

    /**
     * When AOI editing is active, all other AOI management actions should be disabled.
     * This includes the AOI selection box. When AOI editing is no longer active, the
     * AOI management actions should be enabled. The arg isEditActive flag is used
     * to determine whether to enable of disable AOI management actions.
     * @param isEditActive
     */
    function setAOIManagementActionStateForEditing(isEditActive) {
        let goToAOIBtn = dijit.byId('goToAOIBtn');
        let editAOIBtn = dijit.byId('editAOIBtn');
        let deleteAOIBtn = dijit.byId('deleteAOIBtn');
        let clearAOIsBtn = dijit.byId('clearAOIsBtn');
        let exportAOIBtn = dijit.byId('exportAOIBtn');
        let aoiManagerSelect = dijit.byId('aoiManagerSelect');

        if (isEditActive) {
            // Editing is active, so disable AOI actions
            goToAOIBtn.set('disabled', true);
            goToAOIBtn.set('class', 'disabledAppBtn');

            deleteAOIBtn.set('disabled', true);
            deleteAOIBtn.set('class', 'disabledAppBtn');

            clearAOIsBtn.set('disabled', true);
            clearAOIsBtn.set('class', 'disabledAppBtn');

            exportAOIBtn.set('disabled', true);
            exportAOIBtn.set('class', 'disabledAppBtn');

            aoiManagerSelect.set('disabled', true);

            editAOIBtn.set('class', 'activeAppBtn');
        }
        else {
            // Editing is not active, so enable AOI actions
            // Editing is active, so disable AOI actions
            goToAOIBtn.set('disabled', false);
            goToAOIBtn.set('class', 'secondaryAppBtn');

            deleteAOIBtn.set('disabled', false);
            deleteAOIBtn.set('class', 'secondaryAppBtn');

            clearAOIsBtn.set('disabled', false);
            clearAOIsBtn.set('class', 'secondaryAppBtn');

            exportAOIBtn.set('disabled', false);
            exportAOIBtn.set('class', 'secondaryAppBtn');

            aoiManagerSelect.set('disabled', false);

            editAOIBtn.set('class', 'secondaryAppBtn');
        }
    }

    /**
     * Sets the activation status of the AOI edit tool. If editing is active, the edit
     * tool is activated to edit the selected AOI, otherwise the edit tool is de-activated
     * to return control back to the map view.
     * @param isEditActive
     */
    function setEditAOIToolState(isEditActive) {
        let editTool = EditTool.getInstance();
        if (isEditActive) {
            // Activate editing tool
            // Need to fetch the selected AOI to activate the edit tool for
            let aoiToEdit = fetchUserDefinedAOI(dijit.byId('aoiManagerSelect').get('value'));
            editTool.activateTool(aoiToEdit);
        }
        else {
            // De-activate editing tool
            editTool.deactivateTool();
        }
    }

    /**
     * Removes a single AOI that matches the argument aoiName from the map view
     * @param aoiName
     */
    function removeSingleAOIFromMap(aoiName) {
        // Fetch the AOI using arg aoiName
        let aoiGraphic = fetchUserDefinedAOI(aoiName);

        // Remove AOI from map graphics array
        MapView.getInstance().map.graphics.remove(aoiGraphic);

        // Need to remove the AOI from the options array for the AOI manager select box
        let aoiManagerSelect = dijit.byId('aoiManagerSelect');
        aoiManagerSelect.removeOption(aoiName);

        // Decrement the AOI count
        decrementAOICount();

        // Disable AOI management actions if necessary
        if (aoiCount === 0) {
            setAOIManagementActionsStatus(false);
        }
    }

    return {
        /**
         * Adds a new AOI to the map view
         * @param aoiGraphic
         */
        addAOIToMap: function(aoiGraphic) {
            // Add AOI to map graphics array and set the map extent AOI
            let mapRef = MapView.getInstance().map;
            mapRef.graphics.add(aoiGraphic);
            mapRef.setExtent(aoiGraphic.geometry.getExtent());

            // Need to add the AOI to the options array for the AOI manager select box
            let aoiManagerSelect = dijit.byId('aoiManagerSelect');
            aoiManagerSelect.addOption({label: aoiGraphic.attributes.aoiName, value: aoiGraphic.attributes.aoiName});
            aoiManagerSelect.set('value', aoiGraphic.attributes.aoiName);

            // Increment the AOI index and count values
            incrementAOICount();

            // Enable AOI management actions if necessary
            if (aoiCount === 1) {
                setAOIManagementActionsStatus(true);
            }
        },

        /**
         * Removes an existing AOI from the map view
         * @param aoiName
         */
        removeAOIFromMap: function(aoiName) {
            removeSingleAOIFromMap(aoiName);
        },

        /**
         * Removes ALL user defined AOIs from the map view
         */
        removeAllAOIsFromMap: function() {
            // Remove ALL user defined AOIs from the map view
            let mapRef = MapView.getInstance().map;
            let mapGraphics = [];

            mapRef.graphics.graphics.forEach(function(currGraphic) {
                mapGraphics.push(currGraphic);
            });

            mapGraphics.forEach(function(currGraphic) {
                if (currGraphic.attributes) {
                    if (currGraphic.attributes.type === 'user_defined') {
                        removeSingleAOIFromMap(currGraphic.attributes.aoiName);
                    }
                }
            });
        },

        /**
         * Navigates the map view to the arg AOI by setting the map extent to the extent
         * of the arg AOI.
         * @param aoiName
         */
        goToAOI: function(aoiName) {
            let aoi = fetchUserDefinedAOI(aoiName);
            MapView.getInstance().map.setExtent(aoi.geometry.getExtent());
        },

        /**
         * Generates a unique name to add to a user defined AOI's attributes.
         * @return string AOI name
         */
        generateAOIName: function() {
            return 'Polygon_' + aoiIndex;
        },

        /**
         * Handles toggling AOI editing state. The aoiName arg will be null if the toggle state is false.
         * @param toggleState
         */
        onEditToggle: function(toggleState) {
            setAOIManagementActionStateForEditing(toggleState);
            setEditAOIToolState(toggleState);
        },

        /**
         * Handles exporting the arg AOI to KML
         * @param aoiName
         */
        onAOIExport: function(aoiName) {
            // Fetch the AOI to export using arg name and convert geometry to ArcGIS JSON
            let aoi = fetchUserDefinedAOI(aoiName);
            let aoiArcJson = aoi.toJson();

            // Use arcgis2geojson amd_lib to convert ArcGIS JSON object to GEOJson object
            let aoiGeoJson = ArcgisToGeoJson.arcgisToGeoJSON(aoiArcJson);

            // Need to complete the geoJson string with a pre and post script
            let aoiGeoJsonStr = JSON.stringify(aoiGeoJson);
            let preGeoJsonStr = "{\"type\":\"FeatureCollection\",\"properties\":{},\"features\":[";
            let postGeoJsonStr = "]}";
            aoiGeoJsonStr = aoiGeoJsonStr.replace("null", "{}");
            let finalAoiGeoJsonStr = preGeoJsonStr + aoiGeoJsonStr + postGeoJsonStr;

            let kmlData = tokml(JSON.parse(finalAoiGeoJsonStr));

            if (kmlData) {
                let element = document.createElement('a');
                element.setAttribute('href', 'data:text/xml;charset=utf-8,' + encodeURIComponent(kmlData));
                element.setAttribute('download', aoiName + '_export.kml');
                element.style.display = 'none';
                document.body.appendChild(element);

                element.click();

                document.body.removeChild(element);
            }
        }
    }
});