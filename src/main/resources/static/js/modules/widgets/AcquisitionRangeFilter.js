/*
 * AcquisitionRangeFilter.js
 *
 * Defines widget components that comprise the filter tool for filtering by product acquisition range
 */

define(['dojo/_base/declare',
        'dojo/dom',
        'dojo/dom-construct',
        'dijit/TitlePane',
        'dijit/form/DateTextBox'], function(declare, dom, domConstruct, TitlePane, DateTextBox) {

    return declare(null, {
        /*************** Properties ************/
        acquistionRangeFilter: null,

        /*************** Constructor **************/
        constructor: function (args) {
            // Acquisition range title pane
            this.acquistionRangeFilter = new TitlePane({
                id: 'acquisitionRangeFilter',
                class: 'criteriaFilterSearchWidgets',
                title: 'Acquisition Range'
            });

            // Acquisition range begin and end date boxes
            let acquisitionFromDateBox = new DateTextBox({
                id: 'acquistionRangeBegin',
                class: 'acquisitionRangeDateBox',
                title: 'Acquistion Range (Begin)',
                placeHolder: 'Acquisition Range (Begin)',
                required: false
            });

            let acquisitionToDateBox = new DateTextBox({
                id: 'acquisitionRangeEnd',
                class: 'acquisitionRangeDateBox',
                title: 'Acquisition Range (End)',
                placeHolder: 'Acquisition Range (End)',
                required: false
            });

            this.acquistionRangeFilter.addChild(acquisitionFromDateBox);
            this.acquistionRangeFilter.addChild(acquisitionToDateBox);
        },

        /***************** Class functions ***************/
        initAcquisitionRangeFilter: function() {
            return this.acquistionRangeFilter;
        }
    })
});