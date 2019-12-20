/*
 * CloudCoverFilter.js
 *
 * Defines widget components that comprise the filter tool for filtering by product cloud cover
 */

define(['dojo/_base/declare',
        'dojo/dom',
        'dojo/dom-construct',
        'dijit/TitlePane',
        'dijit/form/NumberSpinner'], function(declare, dom, domConstruct, TitlePane, NumberSpinner) {

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

            // Define cloud cover filter inputs
            let cloudCoverFrom = new NumberSpinner({
                id: 'cloudCoverInputFrom',
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
                        cloudCoverFrom.set('value', 0);
                    }

                    if (newValue >= cloudCoverTo.get('value')) {
                        cloudCoverFrom.set('value', 0);
                    }
                }
            });

            let cloudCoverTo = new NumberSpinner({
                id: 'cloudCoverInputTo',
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
                        cloudCoverTo.set('value', 100);
                    }

                    if (newValue <= cloudCoverFrom.get('value')) {
                        cloudCoverTo.set('value', 100);
                    }
                }
            });

            this.cloudCoverFilter.addChild(cloudCoverFrom);
            this.cloudCoverFilter.addChild(cloudCoverTo);
        },

        /****************** Class functions *****************/
        initCloudCoverFilter: function () {
            return this.cloudCoverFilter;
        }
    });
});