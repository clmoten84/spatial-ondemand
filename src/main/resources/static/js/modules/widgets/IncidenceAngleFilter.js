/*
 * IncidenceAngleFilter.js
 *
 * Defines widget components that comprise the filter tool for filtering by product incidence angle
 */

define(['dojo/_base/declare',
        'dojo/dom',
        'dojo/dom-construct',
        'dijit/TitlePane',
        'dijit/form/NumberSpinner'], function(declare, dom, domConstruct, TitlePane, NumberSpinner) {

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

            // Define incidence angle filter input
            let incidenceAngleFrom = new NumberSpinner({
                id: 'incidenceAngleInputFrom',
                class: 'filterNumberSpinnerInput',
                value: 0,
                smallDelta: 1,
                largeDelta: 1,
                constraints: { min: 0, max: 89, places: 0 },
                required: true,
                trim: true,
                onChange: function (newValue) {
                    // Validate value change
                    if (newValue < 0 || newValue > 89) {
                        incidenceAngleFrom.set('value', 0);
                    }

                    if (newValue >= incidenceAngleTo.get('value')) {
                        incidenceAngleFrom.set('value', 0);
                    }
                }
            });

            let incidenceAngleTo = new NumberSpinner({
                id: 'incidenceAngleInputTo',
                class: 'filterNumberSpinnerInput',
                value: 90,
                smallDelta: 1,
                largeDelta: 1,
                constraints: { min: 1, max: 90, places: 0 },
                required: true,
                trim: true,
                onChange: function (newValue) {
                    // Validate value change
                    if (newValue < 1 || newValue > 90) {
                        incidenceAngleTo.set('value', 90);
                    }
                    
                    if (newValue <= incidenceAngleFrom.get('value')) {
                        incidenceAngleTo.set('value', 90);
                    }
                }
            });

            // Add filter inputs to filter
            this.incidenceAngleFilter.addChild(incidenceAngleFrom);
            this.incidenceAngleFilter.addChild(incidenceAngleTo);
        },

        /******************* Class functions ********************/
        initIncidenceAngleFilter: function () {
            return this.incidenceAngleFilter;
        }
    });
})