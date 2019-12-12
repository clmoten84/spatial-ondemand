/*
 * app.js
 *
 * Main application JS
 */

require(['esri/map', 'esri/dijit/Search'], function(Map, Search) {
    var map = new Map("viewDiv", {
        center: [-118, 34.5],
        zoom: 8,
        basemap: "topo"
    });

    var searchWidget = new Search({
        map: map
    }, 'ui-dijit-search');
});
