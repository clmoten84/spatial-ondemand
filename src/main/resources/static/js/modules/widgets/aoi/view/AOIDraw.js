/*
 * AOIDraw.js
 *
 * Defines visual components for drawing AOIs for filtering
 * data exports.
 */

define(['dojo/_base/declare',
        'dojo/dom',
        'dojo/dom-construct',
        'dijit/dijit',
        'dijit/Menu',
        'dijit/MenuItem',
        'dijit/PopupMenuItem',
        'dijit/TooltipDialog',
        'dijit/form/NumberTextBox',
        'dijit/form/Button',
        'dijit/Dialog',
        'app/widgets/aoi/view/DrawTool',
        'app/widgets/aoi/view/AOICoordinates'], function(declare, dom, domConstruct, dijit, Menu, MenuItem,
                                         PopupMenuItem, TooltipDialog, NumberTextBox, Button,
                                         Dialog, DrawTool, AOICoordinates) {

    /*************************** Private properties ****************************/
    let aoiCoordinatesWidget = new AOICoordinates();

    /*************************** Private functions *****************************/
    //TODO: refactor this render function into a view class so it can be used in other places easily
    /**
     * Defines point size selector widget components and returns the DOM element
     * @returns {div}
     */
    function renderPointSizeSelector() {
        let pointSizeSelector = domConstruct.create('div', {id: 'pointSizeSelector', class: 'aoiSizeSelector'});
        let pointSizeLabel = domConstruct.create('label', {innerHTML: 'Size (km)', class: 'aoiSizeLabel'});
        let pointSizeInput = new NumberTextBox({
            id: 'pointSizeInput',
            class: 'aoiSizeInput',
            placeHolder: 'Define AOI size...',
            intermediateChanges: true,
            required: true,
            missingMessage: 'A value is required for AOI size...',
            invalidMessage: 'An invalid value was specified for AOI size...',
            value: 5,
            onChange: function (newVal) {
                if (newVal === "" || newVal === " ") {
                    pointSizeInput.set('value', 5);
                }

                if (newVal <= 0) {
                    pointSizeInput.set('value', 1);
                }

                if (newVal > 5000) {
                    pointSizeInput.set('value', 5000);
                }
            }
        });

        let pointSizeInputBtn = new Button({
            label: 'OK',
            class: 'primaryAppBtn',
            onClick: function () {
                let selectedAOISize = pointSizeInput.get('value');
                if (selectedAOISize) {
                    // Activate the point draw tool and then need to blur
                    // the tooltip dialog element so that it goes away.
                    let evt = document.createEvent('HTMLEvents');
                    evt.initEvent("blur", false, true);
                    dijit.byId('pointDrawDialog').domNode.dispatchEvent(evt);

                    let drawTool = DrawTool.getInstance();
                    drawTool.activate('point');
                }
            }
        });

        // Append size selector components to size selector element
        pointSizeSelector.appendChild(pointSizeLabel);
        pointSizeSelector.appendChild(pointSizeInput.domNode);
        pointSizeSelector.appendChild(pointSizeInputBtn.domNode);
        return pointSizeSelector;
    }

    return declare(null, {
        /***************** Properties *****************/

        /***************** Constructor *****************/
        constructor: function (args) {},

        /***************** Class functions *******************/
        /*
         * renderDrawMenuItem
         *
         * Initializes and renders the widgets required to facilitate
         * drawing AOIs on the map.
         */
        renderDrawWidgets: function() {
            // Define the draw menu and its items (draw menu is a submenu)
            let drawMenu = new Menu({
                id: 'drawMenu',
                class: 'appSubMenu'
            });

            // Define dialogs for point draw widget. This menu option
            // will be defined as PopupMenuItem to allow for the use of a tooltip dialog.
            // The tooltip dialog has a field for selecting the size value and
            // a button to confirm the setting and execute the draw tool.
            let pointDraw = new TooltipDialog({
                id: 'pointDrawDialog',
                class: 'drawDialog'
            });
            pointDraw.set('content', renderPointSizeSelector());

            drawMenu.addChild(new PopupMenuItem({
                label: 'Point',
                class: 'appMenuItem',
                popup: pointDraw
            }));

            drawMenu.addChild(new MenuItem({
                label: 'Polyline',
                class: 'appMenuItem',
                onClick: function() {
                    // Get an instance of draw tool and activate it for polygon
                    let drawTool = DrawTool.getInstance();
                    drawTool.activate('polyline');
                }
            }));

            drawMenu.addChild(new MenuItem({
                label: 'Polygon',
                class: 'appMenuItem',
                onClick: function() {
                    // Get an instance of draw tool and activate it for polygon
                    let drawTool = DrawTool.getInstance();
                    drawTool.activate('polygon');
                }
            }));

            drawMenu.addChild(new MenuItem({
                label: 'Freehand Polygon',
                class: 'appMenuItem',
                onClick: function() {
                    // Get an instance of draw tool and activate it for freehand polygon
                    let drawTool = DrawTool.getInstance();
                    drawTool.activate('freehand_polygon');
                }
            }));

            drawMenu.addChild(new MenuItem({
                label: 'Coordinates',
                class: 'appMenuItem',
                onClick: function() {
                    aoiCoordinatesWidget.showCoordinatesWidget();
                }
            }));

            return new PopupMenuItem({
                label: 'Draw AOI',
                class: 'appMenuItem',
                tooltip: 'Draw an area of interest for export...',
                popup: drawMenu
            });
        }
    });
});