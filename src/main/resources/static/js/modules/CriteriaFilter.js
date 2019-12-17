/*
 * CriteriaFilter.js
 *
 * Defines components that compose the Criter Filter widget. This widget is used
 * to allow for export filtering using search and optical filter parameters.
 */

define(['dojo/_base/declare',
        'dijit/dijit',
        'dojo/dom',
        'dijit/Dialog',
        'app/widgets/AcquisitionRangeFilter',
        'app/widgets/ResolutionFilter',
        'app/widgets/IncidenceAngleFilter',
        'app/widgets/CloudCoverFilter',
        'app/widgets/SnowCoverFilter'], function(declare, dijit, dom, Dialog,
                                                    AcquisitionRangeFilter, ResolutionFilter,
                                                    IncidenceAngleFilter, CloudCoverFilter, SnowCoverFilter) {

    // CriteriaFilter class definition
    return declare(null, {
        /***************** Properties ****************/
        criteriaFilterWindow: null,
        acquisitionRangeFilter: null,
        resolutionFilter: null,
        incidenceAngleFilter: null,
        cloudCoverFilter: null,
        snowCoverFilter: null,

        /***************** Constructor ****************/
        /*
         * Constructor
         */
        constructor: function(args) {
            this.criteriaFilterWindow = new Dialog({
                title: 'Criteria Filter',
                style: 'width:700px;'
            });

            // Add AcquisitionRangeFilter widget to criteriaFilterWindow
            let acquisitionRangeFilter = dijit.byId('acquisitionRangeFilter');
            if (acquisitionRangeFilter) {
                this.criteriaFilterWindow.addChild(acquisitionRangeFilter);
            }
            else {
                this.acquisitionRangeFilter = new AcquisitionRangeFilter();
                this.criteriaFilterWindow.addChild(this.acquisitionRangeFilter.initAcquisitionRangeFilter());
            }

            // Add ResolutionFilter widget to criteriaFilterWindow
            let resolutionFilter = dijit.byId('resolutionFilter');
            if (resolutionFilter) {
                this.criteriaFilterWindow.addChild(resolutionFilter);
            }
            else {
                this.resolutionFilter = new ResolutionFilter();
                this.criteriaFilterWindow.addChild(this.resolutionFilter.initResolutionFilter());
            }

            // Add IncidenceAngleFilter widget to criteriaFilterWindow
            let incidenceAngleFilter = dijit.byId('incidenceAngleFilter');
            if (incidenceAngleFilter) {
                this.criteriaFilterWindow.addChild(incidenceAngleFilter);
            }
            else {
                this.incidenceAngleFilter = new IncidenceAngleFilter();
                this.criteriaFilterWindow.addChild(this.incidenceAngleFilter.initIncidenceAngleFilter());
            }

            // Add CloudCoverFilter widget to criteriaFilterWindow
            let cloudCoverFilter = dijit.byId('cloudCoverFilter');
            if (cloudCoverFilter) {
                this.criteriaFilterWindow.addChild(cloudCoverFilter);
            }
            else {
                this.cloudCoverFilter = new CloudCoverFilter();
                this.criteriaFilterWindow.addChild(this.cloudCoverFilter.initCloudCoverFilter());
            }

            // Add SnowCoverFilter widget to criteriaFilterWindow
            let snowCoverFilter = dijit.byId('snowCoverFilter');
            if (snowCoverFilter) {
                this.criteriaFilterWindow.addChild(snowCoverFilter);
            }
            else {
                this.snowCoverFilter = new SnowCoverFilter();
                this.criteriaFilterWindow.addChild(this.snowCoverFilter.initSnowCoverFilter());
            }
        },

        /************************* Class functions ************************/
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