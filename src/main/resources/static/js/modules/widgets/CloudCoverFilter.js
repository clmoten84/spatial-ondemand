/*
 * CloudCoverFilter.js
 *
 * Defines widget components that comprise the filter tool for filtering by product cloud cover
 */

define(['dojo/_base/declare',
        'dojo/dom',
        'dojo/dom-construct',
        'dijit/TitlePane',
        'app/widgets/MapView'], function(declare, dom, domConstruct, TitlePane, MapView) {

    return declare(null, {
        /****************** Properties ****************/
        cloudCoverFilter: null,

        /****************** Constructor *****************/
        constructor: function (args) {
            // Cloud cover filter title pane
            this.cloudCoverFilter = new TitlePane({
                id: 'cloudCoverFilter',
                class: 'criteriaFilterSearchWidgets',
                title: 'Cloud Cover (%)'
            });

            var mapView = MapView.getInstance();
        },

        /****************** Class functions *****************/
        initCloudCoverFilter: function () {
            return this.cloudCoverFilter;
        }
    });
});