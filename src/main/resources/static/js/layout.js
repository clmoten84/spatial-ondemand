/*
 * layout.js
 *
 * Defines application layout
 */

require(['dijit/layout/BorderContainer',
         'dijit/layout/ContentPane',
         'dojox/layout/ExpandoPane',
         'esri/map',
         'esri/dijit/Search',
         'app/Filter',
         'app/AOIFilter',
         'app/widgets/MapView'], function(BorderContainer, ContentPane, ExpandoPane, Map, Search,
                                          Filter, AOIFilter, MapView) {

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
    var mapContainer = new ContentPane({
        id: 'mapContainer',
        design: 'headline',
        region: 'center',
        gutters: false,
        liveSplitters: true
    });

    var productManagerContainer = new ExpandoPane({
        id: 'productManagerContainer',
        region: 'left',
        style: 'height: 100%; width:18%;',
        splitter: true,
        title: 'Products'
    });

    //mapContainer.addChild(mapView);
    appLayout.addChild(productManagerContainer);
    appLayout.addChild(mapContainer);

    // Initialize instance of ESRI map and Search widgets for base map
    var map = MapView.getInstance();

    /*********************** START PAGE CONTAINER ********************/
    appLayout.startup();
});