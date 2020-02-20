/*
 * app.js
 *
 * SOD application entry point
 */

// Globals -- may need to refactor these to an accessor method somewhere
var SpatialOndemand = {};

require(['app/widgets/layout/view/SODLayout',
         'app/widgets/layout/view/MapView',
         'app/widgets/product/viewController/ProductManagerViewController',
         'app/widgets/userProfile/viewController/UserProfileViewController'],
                function(SODLayout, MapView, ProductManagerViewController, UserProfileViewController) {

    // Get a reference to the currently logged in user -- need to do this before
    // rendering the layout as some components of the layout need this data to
    // properly render.
    UserProfileViewController.fetchCurrentUser();

    // Render SOD layout
    SODLayout.renderAppLayout();

    // Initialize and render map
    SpatialOndemand.mapView = MapView.getInstance();

    // Display products data in product container
    ProductManagerViewController.renderProducts();
});