/*
 * IncidenceAngleFilter.js
 *
 * Defines widget components that comprise the filter tool for filtering by product incidence angle
 */

define(['dojo/_base/declare',
        'dojo/dom',
        'dojo/dom-construct',
        'dijit/TitlePane'], function(declare, dom, domConstruct, TitlePane) {

    return declare(null, {
        /******************* Properties *******************/
        incidenceAngleFilter: null,

        /******************* Constructor ********************/
        constructor: function (args) {
            // Incidence angle filter title pane
            this.incidenceAngleFilter = new TitlePane({
                id: 'incidenceAngleFilter',
                class: 'criteriaFilterSearchWidgets',
                title: 'Incidence Angle (&#176;)'
            });
        },

        /******************* Class functions ********************/
        initIncidenceAngleFilter: function () {
            return this.incidenceAngleFilter;
        }
    });
})