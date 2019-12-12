/*
 * layout.js
 *
 * Contains definitions for layout of main page
 */

require(['dijit/layout/BorderContainer',
         'dijit/layout/ContentPane',
         'esri/map',
         'esri/dijit/Search',
         'app/Filter',
         'app/AOIFilter'], function(BorderContainer, ContentPane, Map, Search, Filter, AOIFilter) {

    /******************************* Page Container ********************************/
    var appLayout = new BorderContainer({
        design: 'headline',
        gutters: false
    }, 'appLayout');

    /******************************* Header Panel *****************************/
    var headerContainer = new BorderContainer({
        id: 'headerContainer',
        region: 'top',
        design: 'headline',
        gutters: false
    });

    var leftHeaderSection = new ContentPane({
        id: 'leftHeaderSection',
        region: 'left',
        content: '<img src="img/maxar_logo.png" alt="Maxar Seal" class="maxarSeal"/>'
    });

    var centerHeaderSection = new ContentPane({
        id: 'centerHeaderSection',
        region: 'center',
        content: '<h2 class="brandTitle">Spatial On-demand</h2>'
    });

    /* Filter Section */
    var rightHeaderSection = new ContentPane({
        id: 'rightHeaderSection',
        region: 'right'
    });
    rightHeaderSection.addChild(Filter.initFiltersBtn());
    rightHeaderSection.addChild(AOIFilter.initAOIFilter());

    // Add components to app layout
    appLayout.addChild(headerContainer);
    headerContainer.addChild(leftHeaderSection);
    headerContainer.addChild(centerHeaderSection);
    headerContainer.addChild(rightHeaderSection);

    /********************************* Map Container ********************************/
    var mapContainer = new BorderContainer({
        id: 'mapContainer',
        design: 'headline',
        region: 'center',
        gutters: false
    });

    var mapView = new ContentPane({
        id: 'mapView',
        region: 'center',
        style: 'height: 100%; width:100%;',
        content: '<div id="search"></div>'
    })

    appLayout.addChild(mapContainer);
    mapContainer.addChild(mapView);

    // Initialize instance of ESRI map and Search widgets for base map
    var map = new Map('mapView', {
        center: [-86.7483, 34.6993],
        zoom: 8,
        basemap: "topo"
    });

    var search = new Search({
        map: map
    }, "search");
    search.startup();

    // /* START PAGE CONTAINER */
    appLayout.startup();
});