/*
 * app.js
 *
 * SOD application entry point
 */

// Globals -- may need to refactor these to an accessor method somewhere
var SpatialOndemand = {};

require(['app/widgets/layout/view/SODLayout',
         'app/widgets/layout/view/MapView',
         'app/widgets/product/viewController/ProductManagerViewController'],
                function(SODLayout, MapView, ProductManagerViewController) {

    // Render SOD layout
    SODLayout.renderAppLayout();

    // Initialize and render map
    SpatialOndemand.mapView = MapView.getInstance();

    // Display products data in product container
    ProductManagerViewController.renderProducts();
});