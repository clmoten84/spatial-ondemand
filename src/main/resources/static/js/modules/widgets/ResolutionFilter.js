/*
 * ResolutionFilter.js
 *
 * Defines widget components that comprise the filter tool for filtering by product resolution
 */

define(['dojo/_base/declare',
        'dojo/dom',
        'dojo/dom-construct',
        'dijit/TitlePane'], function(declare, dom, domConstruct, TitlePane) {

    return declare(null, {
        /****************** Properties *****************/
        resolutionFilter: null,

        /****************** Constructor *******************/
        constructor: function (args) {
            // Resolution filter title pane
            this.resolutionFilter = new TitlePane({
                id: 'resolutionFilter',
                class: 'criteriaFilterSearchWidgets',
                title: 'Resolution (m)'
            });
        },

        /****************** Class functions ******************/
        initResolutionFilter: function () {
            return this.resolutionFilter;
        }
    });
});