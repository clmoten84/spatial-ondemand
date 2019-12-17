/*
 * app.js
 *
 * SOD application entry point
 */

// Globals -- may need to refactor these to an accessor method somewhere
var sodLayoutComponents;
var mapView;

require(['app/widgets/SODLayout',
         'app/widgets/MapView'], function(SODLayout, MapView) {
    // Render SOD layout
    sodLayoutComponents = SODLayout.renderLayout();

    // Initialize and render map
    mapView = MapView.getInstance();
});