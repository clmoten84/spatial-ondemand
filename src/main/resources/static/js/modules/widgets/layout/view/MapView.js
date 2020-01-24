/*
 * MapView.js
 *
 * Singleton. Defines the map instance as singleton to ensure that only one instance of map is ever created.
 * Add additional properties and methods to object as necessary.
 */

define(['dojo/_base/declare',
        'dojo/dom',
        'dojo/dom-construct',
        'dijit/dijit',
        'esri/dijit/Search',
        'esri/map',
        'dijit/layout/ContentPane',
        'app/widgets/projects/view/Projects',
        'app/widgets/searchResults/view/SearchResults'], function(declare, dom, domConstruct, dijit,
                                                                  Search, Map, ContentPane, Projects, SearchResults) {

        // MapView object contains all properties and methods related to the map.
        let mapView;

        // Singleton constructor
        function createMapInstance() {
            // The map should live in the border container 'mapView' which is placed in the
            // 'center' of the app layout.
            let map = new Map("mapContainer", {
                center: [-82.4572, 27.9506],
                zoom: 10,
                basemap: "satellite",
                smartNavigation: false,  // Set this to true for new map panning style
                logo: false
            });

            // Add a div element to the 'mapView' dom node for the search widget to live
            let mapContainer = dijit.byId('mapContainer');
            let searchNode = domConstruct.create('div', {id: 'search'});
            mapContainer.domNode.appendChild(searchNode);

            // Add projects and search results trigger buttons to mapView dom node
            mapContainer.domNode.appendChild(Projects.renderProjectsBtn());
            mapContainer.domNode.appendChild(SearchResults.renderSearchResultsBtn());

            // Now create search widget and place in search div
            let search = new Search({
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
            /**
             * Fetches a reference to mapView object
             * @returns mapView reference
             */
            getInstance: function() {
                // If mapRef has not been initialized, initialize it, otherwise return the reference
                if (!mapView) {
                    mapView = createMapInstance();
                }
                return mapView;
            },

            /**
             * Renders the container that the map instance will live in
             * @return dijit ContentPane
             */
            renderMapContainer: function() {
                return new ContentPane({
                    id: 'mapContainer',
                    design: 'headline',
                    region: 'center',
                    gutters: false,
                    liveSplitters: true
                });
            }
        }
});