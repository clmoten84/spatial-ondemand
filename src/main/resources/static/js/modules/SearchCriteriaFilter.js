/*
 * SearchCriteriaFilter.js
 *
 * Defines all components required for filtering export by user specified search criteria.
 * These components allow for users to filter export using specific search criteria (i.e.
 * Resolution, Acquisition Range, etc.).
 */

define(['dojo/_base/declare',
        'dojo/dom-construct',
        'dijit/TitlePane',
        'dijit/form/DateTextBox'], function(declare, domConstruct, TitlePane, DateTextBox) {

    // SearchCriteriaFilter class declaration
    return declare(null, {
        /**************** Properties **************/
        searchCriteriaWidget: null,

        /**************** Class functions **************/
        /*
         * Constructor
         */
        constructor: function(args) {
            this.searchCriteriaWidget = new TitlePane({
                id: 'searchCriteriaFilterWidget',
                title: 'Search Criteria'
            });

            // Create the form elements for the search criteria widget and add programmatically.
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

            this.searchCriteriaWidget.addChild(acquisitionFromDateBox);
            this.searchCriteriaWidget.addChild(acquisitionToDateBox);
        },

        /*
         * initSearchCriteriaWidget
         *
         * Use this function to add the visual component/widget for search
         * criteria filter to a parent component.
         */
        initSearchCriteriaWidget: function () {
            return this.searchCriteriaWidget;
        }
    });

});