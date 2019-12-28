/*
 * SODLayout.js
 *
 * Singleton. Defines the components that comprise the main application layout. Components such as
 * the application header/navbar, map container, and product container are defined here. Components
 * are encapsulated and exposed as a singleton.
 */

define(['dojo/dom',
        'dojo/dom-construct',
        'dijit/layout/BorderContainer',
        'dijit/layout/ContentPane',
        'dojox/layout/ExpandoPane',
        'app/Filter',
        'app/AOIFilter'], function(dom, domConstruct, BorderContainer,
                                   ContentPane, ExpandoPane, Filter, AOIFilter) {

        // pageComponents object contains references to all page layout components
        var pageComponents;

        // Creates the page layout root component which serves as the parent component
        // for all other layout components.
        function createPageRoot() {
            return new BorderContainer({
                design: 'headline',
                gutters: false
            }, 'appLayout');
        }

        // Creates the page header and associated components.
        function createPageHeader() {
            let headerContainer = new BorderContainer({
                id: 'headerContainer',
                region: 'top',
                design: 'headline',
                gutters: false
            });

            // Page header branding
            let leftHeaderSection = new ContentPane({
                id: 'leftHeaderSection',
                region: 'left',
                content: '<img src="img/maxar_logo.png" alt="Maxar Seal" class="maxarSeal"/>'
            });
            headerContainer.addChild(leftHeaderSection);

            let centerHeaderSection = new ContentPane({
                id: 'centerHeaderSection',
                region: 'center',
                content: '<h2 class="brandTitle">Spatial On-demand</h2>'
            });
            headerContainer.addChild(centerHeaderSection);

            // Filters
            let rightHeaderSection = new ContentPane({
                id: 'rightHeaderSection',
                region: 'right'
            });
            rightHeaderSection.addChild(Filter.initFiltersBtn());
            rightHeaderSection.addChild(AOIFilter.initAOIFilter());
            headerContainer.addChild(rightHeaderSection);
            return headerContainer;
        }

        function createMapContainer() {
            return new ContentPane({
                id: 'mapContainer',
                design: 'headline',
                region: 'center',
                gutters: false,
                liveSplitters: true
            });
        }

        function createProductContainer() {
             return new ExpandoPane({
                id: 'productManagerContainer',
                region: 'left',
                style: 'height: 100%; width:320px;',
                splitter: true,
                title: 'Products'
            });
        }

        return {
            // Renders the SOD page layout by instantiating the individual sections and components
            // of the layout and 'starting' the page root component.
            renderLayout: function() {
                // If page components have not been initialized, initialize and render them
                if (!pageComponents) {
                    // Initialize page components
                    let pageRoot = createPageRoot();
                    let pageHeader = createPageHeader();
                    let mapContainer = createMapContainer();
                    let productContainer = createProductContainer();

                    pageRoot.addChild(pageHeader);
                    pageRoot.addChild(mapContainer);
                    pageRoot.addChild(productContainer);
                    pageRoot.startup();
                }
            }
        }
});