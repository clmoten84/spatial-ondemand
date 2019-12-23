/*
 * app.js
 *
 * SOD application entry point
 */

// Globals -- may need to refactor these to an accessor method somewhere
var SpatialOndemand = {};

require(['app/widgets/SODLayout',
         'app/widgets/MapView',
         'app/ProductManager'], function(SODLayout, MapView, ProductManager) {
    // Render SOD layout
    SODLayout.renderLayout();

    // Initialize and render map
    SpatialOndemand.mapView = MapView.getInstance();

    // Render products to product container
    ProductManager.renderProducts();
});