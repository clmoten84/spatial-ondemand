/*
 * MapView.js
 *
 * Singleton. Defines the map instance as singleton to ensure that only one instance of map is ever created.
 * Add additional properties and methods to object as necessary.
 */

define(['dojo/_base/declare',
        'dojo/dom',
        'dojo/dom-construct',
        'esri/dijit/Search',
        'esri/map'], function(declare, dom, domConstruct, Search, Map) {

        // MapView object contains all properties and methods related to the map.
        var mapView;

        // Singleton constructor
        function createMapInstance() {
            // The map should live in the border container 'mapView' which is placed in the
            // 'center' of the app layout.
            var map = new Map("mapContainer", {
                center: [-86.7483, 34.6993],
                zoom: 8,
                basemap: "satellite",
                smartNavigation: true  // Set this to false for legacy map panning
            });

            // Add a div element to the 'mapView' dom node for the search widget to live
            //domConstruct.create("div", {id: 'search'}, "mapContainer_container", "last");
            domConstruct.create("div", {id: 'search'}, "mapContainer", "last");

            // Now create search widget and place in search div
            var search = new Search({
                map: map
            }, 'search');
            search.startup();


            // Return reference to map
            return {
                map: map,
                search: search
            }
        }

        return {
            getInstance: function() {
                // If mapRef has not been initialized, initialize it, otherwise return the reference
                if (!mapView) {
                    mapView = createMapInstance();
                }
                return mapView;
            }
        }
});