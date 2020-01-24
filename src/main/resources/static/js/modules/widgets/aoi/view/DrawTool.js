/*
 * DrawTool.js
 *
 * Singleton. Defines the draw tool and the symbol objects to use when drawing
 * on the map. Defined as singleton to ensure that only one instance of the
 * draw tool is created per session.
 */

define(['dijit/dijit',
        'esri/toolbars/draw',
        'esri/graphic',
        'esri/symbols/SimpleFillSymbol',
        'esri/symbols/SimpleLineSymbol',
        'esri/symbols/SimpleMarkerSymbol',
        'esri/Color',
        'esri/geometry/Circle',
        'esri/geometry/Polygon',
        'esri/units',
        'dojo/dom-construct',
        'dijit/Dialog',
        'dijit/form/ValidationTextBox',
        'app/widgets/layout/view/MapView',
        'app/widgets/aoi/viewController/DrawToolViewController'],
            function(dijit, Draw, Graphic, SimpleFillSymbol, SimpleLineSymbol,
                        SimpleMarkerSymbol, Color, Circle, Polygon, Units,
                        domConstruct, Dialog, ValidationTextBox, MapView,
                        DrawToolViewController) {

    let drawToolRef;

    /**
     * Initializes the draw tool
     */
    function initDrawTool() {
        // Initialize the draw tool
        let drawInstance = new Draw(MapView.getInstance().map, {
            showTooltips: false,
            fillSymbol: new SimpleFillSymbol(),
            lineSymbol: new SimpleLineSymbol(),
            markerSymbol: new SimpleMarkerSymbol(),
            respectDrawingVertexOrder: false
        });

        drawInstance.on('draw-complete', function(drawing){
            DrawToolViewController.createUserDrawnAOI(drawing);
            drawToolRef.deactivate();
            MapView.getInstance().map.setMapCursor('default');
        });

        return drawInstance;
    }

    return {
        getInstance: function() {
            // Define any public properties or functions to expose to client code in
            // return block.
            if (!drawToolRef) {
                drawToolRef = initDrawTool();
            }

            return {
                drawToolRef: drawToolRef,
                activate: function(drawType) {
                    switch(drawType) {
                        case 'point':
                            drawToolRef.activate(Draw.POINT);
                            break;
                        case 'polyline':
                            drawToolRef.activate(Draw.POLYLINE);
                            break;
                        case 'polygon':
                            drawToolRef.activate(Draw.POLYGON);
                            break;
                        case 'freehand_polygon':
                            drawToolRef.activate(Draw.FREEHAND_POLYGON);
                            break;
                    }
                    MapView.getInstance().map.setMapCursor('crosshair');
                },
                deactivate: function() {
                    drawToolRef.deactivate();
                    MapView.getInstance().map.setMapCursor('default');
                }
            };
        }
    }
});