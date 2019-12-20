/*
 * ResolutionFilter.js
 *
 * Defines widget components that comprise the filter tool for filtering by product resolution
 */

define(['dojo/_base/declare',
        'dojo/dom',
        'dojo/dom-construct',
        'dijit/TitlePane',
        'dijit/form/NumberSpinner'], function(declare, dom, domConstruct, TitlePane, NumberSpinner) {

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

            // Define resolution filter inputs
            let resolutionFrom = new NumberSpinner({
                id: 'resolutionFilterInputFrom',
                class: 'filterNumberSpinnerInput',
                value: 0,
                smallDelta: 1,
                largeDelta: 1,
                constraints: { min: 0, max: 5999, places: 0 },
                required: true,
                trim: true,
                onChange: function(newValue) {
                    // Validate value change
                    if (newValue < 0 || newValue > 5999) {
                        resolutionFrom.set('value', 0);
                    }

                    if (newValue >= resolutionTo.get('value')) {
                        resolutionFrom.set('value', 0);
                    }
                }
            });

            let resolutionTo = new NumberSpinner({
                id: 'resolutionFilterInputTo',
                class: 'filterNumberSpinnerInput',
                value: 6000,
                smallDelta: 1,
                largeDelta: 1,
                constraints: { min: 1, max: 6000, places: 0 },
                required: true,
                trim: true,
                onChange: function(newValue) {
                    // Validate value change
                    if (newValue < 1 || newValue > 6000) {
                        resolutionTo.set('value', 6000);
                    }

                    if (newValue <= resolutionFrom.get('value')) {
                        resolutionTo.set('value', 6000);
                    }
                }
            });

            // Add resolution filter inputs to filter
            this.resolutionFilter.addChild(resolutionFrom);
            this.resolutionFilter.addChild(resolutionTo);
        },

        /****************** Class functions ******************/
        initResolutionFilter: function () {
            return this.resolutionFilter;
        }
    });
});