/*
 * AOIDraw.js
 *
 * Defines visual components and business logic functions for drawing AOIs for filtering
 * data exports.
 */

define(['dojo/_base/declare',
        'dojo/dom',
        'dijit/dijit',
        'dijit/Menu',
        'dijit/MenuItem',
        'dijit/PopupMenuItem',
        'dijit/TooltipDialog'], function(declare, dom, dijit, Menu, MenuItem, PopupMenuItem, TooltipDialog) {

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

            // Define dialogs for point and polyline draw widgets. These menu options
            // will be defined as PopupMenuItems to allow for the use of a tooltip dialog.
            // The tooltip dialogs each have a field for selecting the size value and
            // buttons to confirm the setting and execute the draw tool.
            let pointDraw = new TooltipDialog({
                id: 'pointDrawDialog',
                class: 'drawDialog',
                content: 'Put the (km) size selector here...'
            });

            drawMenu.addChild(new PopupMenuItem({
                label: 'Point',
                class: 'appMenuItem',
                popup: pointDraw
            }));

            drawMenu.addChild(new MenuItem({
                label: 'Polyline',
                class: 'appMenuItem'
            }));

            drawMenu.addChild(new MenuItem({
                label: 'Polygon',
                class: 'appMenuItem'
            }));

            drawMenu.addChild(new MenuItem({
                label: 'Freehand Polygon',
                class: 'appMenuItem'
            }));

            drawMenu.addChild(new MenuItem({
                label: 'Coordinates',
                class: 'appMenuItem'
            }));

            return new PopupMenuItem({
                label: 'Draw AOI',
                class: 'appMenuItem',
                tooltip: 'Draw an area of interest for export...',
                popup: drawMenu
            });
        }
    })
});