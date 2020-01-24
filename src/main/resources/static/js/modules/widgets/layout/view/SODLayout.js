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
        'app/widgets/layout/view/MapView',
        'app/widgets/filter/view/FilterMenu',
        'app/widgets/aoi/view/AOIMenu',
        'app/widgets/cart/view/ShoppingCart',
        'app/widgets/product/view/ProductManager'], function(dom, domConstruct, BorderContainer,
                                                         ContentPane, ExpandoPane, MapView, FilterMenu,
                                                         AOIMenu, ShoppingCart, ProductManager) {

        // Creates the page layout root component which serves as the parent component
        // for all other layout components.
        function renderPageRoot() {
            return new BorderContainer({
                design: 'headline',
                gutters: false
            }, 'appLayout');
        }

        // Creates the page header and associated components.
        function renderPageHeader() {
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

            // App actions
            let rightHeaderSection = new ContentPane({
                id: 'rightHeaderSection',
                region: 'right'
            });

            let logoutLink = domConstruct.create('a', {innerHTML: 'Sign Out', href: '#',  style: 'color:white; ' +
                'float:right; font-size:13px; margin-right:0.2em;'});
            rightHeaderSection.domNode.appendChild(logoutLink);

            let actionsDiv = domConstruct.create('div', {style: 'clear:both; float:right; margin-top:5%;'});
            actionsDiv.appendChild(FilterMenu.renderFiltersMenu().domNode);
            actionsDiv.appendChild(AOIMenu.renderAOIMenu().domNode);
            actionsDiv.appendChild(ShoppingCart.renderShoppingCartBtn().domNode);
            rightHeaderSection.domNode.appendChild(actionsDiv);

            headerContainer.addChild(rightHeaderSection);
            return headerContainer;
        }

        return {
            // Renders the SOD page layout by instantiating the individual sections and components
            // of the layout and 'starting' the page root component.
            renderAppLayout: function() {
                // If page components have not been initialized, initialize and render them
                let pageRoot = renderPageRoot();
                pageRoot.addChild(renderPageHeader());
                pageRoot.addChild(MapView.renderMapContainer());
                pageRoot.addChild(ProductManager.renderProductContainer());
                pageRoot.startup();
            }
        }
});