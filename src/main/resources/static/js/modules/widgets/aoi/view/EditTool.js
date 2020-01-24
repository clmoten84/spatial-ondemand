/*
 * EditTool.js
 *
 * Singleton. Defines the edit tool and the symbol to use when editing geometries
 * in the map view. Defined as a singleton to ensure that only one instance of the
 * edit tool is created per session.
 */

define(['dojo/dom',
        'dojo/dom-construct',
        'dijit/dijit',
        'esri/toolbars/edit',
        'app/widgets/layout/view/MapView'], function(dom, domConstruct, dijit, Edit, MapView) {

    let editToolRef;

    /**
     * Initializes the edit tool
     * @returns {*}
     */
    function initEditTool() {
        // Initialize the edit tool
        let mapRef = MapView.getInstance().map;
        let editInstance = new Edit(mapRef, {
            allowAddVertices: true,
            allowDeleteVertices: true
        });

        editInstance.on('activate', function() {
            // Set the mouse cursor to draw cursor type
            mapRef.setMapCursor('crosshair');
        });

        editInstance.on('deactivate', function() {
           // Set the mouse cursor back to default cursor type
           mapRef.setMapCursor('default');
        });

        return editInstance;
    }

    return {
        getInstance: function() {
            if (!editToolRef) {
                editToolRef = initEditTool();
            }

            return {
                /**
                 * Activates the edit tool for editing the arg AOI
                 * @param aoiToEdit
                 */
                activateTool: function(aoiToEdit) {
                    editToolRef.activate(Edit.EDIT_VERTICES, aoiToEdit);
                },

                /**
                 * Deactivates the edit tool and returns control back to map view
                 */
                deactivateTool: function() {
                    editToolRef.deactivate();
                }
            }
        }
    }
});