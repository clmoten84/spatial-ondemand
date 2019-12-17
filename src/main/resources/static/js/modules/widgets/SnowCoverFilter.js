/*
 * SnowCoverFilter.js
 *
 * Defines widget components that comprise the filter tool for filtering by product snow cover
 */

define(['dojo/_base/declare',
        'dojo/dom',
        'dojo/dom-construct',
        'dijit/TitlePane'], function(declare, dom, domConstruct, TitlePane) {

    return declare(null, {
        /******************* Properties ******************/
        snowCoverFilter: null,

        /******************* Constructor *******************/
        constructor: function (args) {
            // Snow cover filter title pane
            this.snowCoverFilter = new TitlePane({
                id: 'snowCoverFilter',
                class: 'criteriaFilterSearchWidgets',
                title: 'Snow Cover (%)'
            });
        },

        /******************* Class functions *******************/
        initSnowCoverFilter: function () {
            return this.snowCoverFilter;
        }
    });
});