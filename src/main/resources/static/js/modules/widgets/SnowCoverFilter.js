/*
 * SnowCoverFilter.js
 *
 * Defines widget components that comprise the filter tool for filtering by product snow cover
 */

define(['dojo/_base/declare',
        'dojo/dom',
        'dojo/dom-construct',
        'dijit/TitlePane',
        'dijit/form/NumberSpinner'], function(declare, dom, domConstruct, TitlePane, NumberSpinner) {

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

            // Define snow cover filter inputs
            let snowCoverFrom = new NumberSpinner({
                id: 'snowCoverInputFrom',
                class: 'filterNumberSpinnerInput',
                value: 0,
                smallDelta: 1,
                largeDelta: 1,
                constraints: { min: 0, max: 99, places: 0 },
                required: true,
                trim: true,
                onChange: function (newValue) {
                    // Validate value change
                    if (newValue < 0 || newValue > 99) {
                        snowCoverFrom.set('value', 0);
                    }
                    
                    if (newValue >= snowCoverTo.get('value')) {
                        snowCoverFrom.set('value', 0);
                    }
                }
            });

            let snowCoverTo = new NumberSpinner({
                id: 'snowCoverInputTo',
                class: 'filterNumberSpinnerInput',
                value: 100,
                smallDelta: 1,
                largeDelta: 1,
                constraints: { min: 1, max: 100, places: 0 },
                required: true,
                trim: true,
                onChange: function (newValue) {
                    // Validate value change
                    if (newValue < 1 || newValue > 100) {
                        snowCoverTo.set('value', 0);
                    }

                    if (newValue <= snowCoverFrom.get('value')) {
                        snowCoverTo.set('value', 0);
                    }
                }
            });

            this.snowCoverFilter.addChild(snowCoverFrom);
            this.snowCoverFilter.addChild(snowCoverTo);
        },

        /******************* Class functions *******************/
        initSnowCoverFilter: function () {
            return this.snowCoverFilter;
        }
    });
});