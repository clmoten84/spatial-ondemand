/*
 * SearchCriteriaFilter.js
 *
 * Defines all components required for filtering export by user specified search criteria.
 * These components allow for users to filter export using specific search criteria (i.e.
 * Resolution, Acquisition Range, etc.).
 */

define(['dojo/_base/declare',
        'dijit/TitlePane',
        'dijit/form/DateTextBox'], function(declare, TitlePane, DateTextBox) {

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
                title: 'Search Criteria'
            });

            let acquisitionFromDateBox = new DateTextBox({
                class: 'acquisitionRangeDateBox',
                title: 'Acquistion Range (Begin)',
                placeHolder: 'Acquisition Range (Begin)',
                required: false
            });

            let acquisitionToDateBox = new DateTextBox({
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