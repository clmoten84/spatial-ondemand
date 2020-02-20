/*
 * AdminLayout.js
 *
 * Defines components that comprise the SOD App Admin page
 */

define(['dojo/dom-construct',
        'dijit/layout/BorderContainer',
        'dijit/layout/ContentPane',
        'app/widgets/admin/roles/view/RolesManager',
        'app/widgets/admin/users/view/UserManager'],
            function(domConstruct, BorderContainer, ContentPane, RolesManager, UserManager){

    /**
     * Defines and renders the ADMIN page header
     * @returns {*}
     */
    function renderPageHeader() {
        // Header container
        let headerContainer = new BorderContainer({
            id: 'header-container',
            design: 'headline',
            gutters: false,
            region: 'top'
        });

        // Branding
        let brandingDiv = domConstruct.create('div', {id: 'branding'});
        brandingDiv.appendChild(domConstruct.create('img', {src: 'img/maxar_logo.png', alt: 'Maxar Seal', class: 'maxar-seal'}));
        brandingDiv.appendChild(domConstruct.create('h2', {id: 'brand-title', innerHTML: 'Spatial On-demand Admin'}));

        let brandingContainer = new ContentPane({
            id: 'branding-container',
            region: 'left'
        });
        brandingContainer.set('content', brandingDiv);

        // Actions


        headerContainer.addChild(brandingContainer);
        return headerContainer;
    }

    /**
     * Defines and renders the ADMIN page body
     * @returns {*}
     */
    function renderPageBody() {
        // Body content pane - add this to the page root
        let bodyContentPane = new ContentPane({
            design: 'headline',
            gutters: false,
            region: 'center'
        });

        // Body div - add this to the body content pane
        // Append individual body components/widgets
        let bodyDiv = domConstruct.create('div', {id: 'body-container'});
        bodyDiv.appendChild(RolesManager.renderRolesManager());
        bodyDiv.appendChild(UserManager.renderUserManager());

        // Set the content of the body content pane
        bodyContentPane.set('content', bodyDiv);
        return bodyContentPane;
    }

    return {
        /**
         * Defines and renders the admin layout
         */
        renderAdminLayout: function() {
            let pageRoot = new BorderContainer({
                design: 'headline',
                gutters: false
            }, 'admin-layout');

            pageRoot.addChild(renderPageHeader());
            pageRoot.addChild(renderPageBody());
            pageRoot.startup();
        }
    }
});