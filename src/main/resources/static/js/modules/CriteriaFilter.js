/*
 * CriteriaFilter.js
 *
 * Defines components that compose the Criter Filter widget. This widget is used
 * to allow for export filtering using search and optical filter parameters.
 */

define(['dojo/_base/declare',
        'dijit/Dialog',
        'app/SearchCriteriaFilter'], function(declare, Dialog, SearchCriteriaFilter) {

    // CriteriaFilter class definition
    return declare(null, {
        /***************** Properties ****************/
        criteriaFilterWindow: null,

        /***************** Class functions ****************/
        /*
         * Constructor
         */
        constructor: function(args) {
            this.criteriaFilterWindow = new Dialog({
                title: 'Criteria Filter',
                style: 'width:650px;'
            });

            // Add SearchCriteriaFilter widget to criteriaFilterWindow
            this.criteriaFilterWindow.addChild(new SearchCriteriaFilter().initSearchCriteriaWidget());
        },

        /*
         * Show/hide filter window
         */
        showHideFilterWindow: function() {
            if (this.criteriaFilterWindow.open) {
                this.criteriaFilterWindow.hide();
            }
            else{
                this.criteriaFilterWindow.show();
            }
        }
    });
});