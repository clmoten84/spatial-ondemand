/*
 * CriteriaFilterViewController.js
 *
 * Defines business and validation logic for components that comprise the criteria filter widget.
 */

define(['dijit/dijit'], function(dijit) {

    return {
        /**
         * Validates the begin date field of the acquistion range filter. Ensures the selected date
         * is not empty and is not later than the selected end date.
         * @param newValue
         */
        validateAcquisitionRangeBeginDate: function(newValue) {
            let beginDateInput = dijit.byId('acquisitionRangeBegin');

            if (!newValue) {
                beginDateInput.set('value', new Date(1980, 0, 1));
            }
            else {
                if (newValue.getTime() > dijit.byId('acquisitionRangeEnd').get('value').getTime())
                    beginDateInput.set('value',new Date(1980, 0, 1));
            }
        },

        /**
         * Validates the end date field of the acquisition range filter. Ensures the selected date
         * is not empty and is not earlier than the selected begin date.
         * @param newValue
         */
        validateAcquisitionRangeEndDate: function(newValue) {
            let endDateInput = dijit.byId('acquisitionRangeEnd');

            if (!newValue) {
                endDateInput.set('value', new Date());
            }

            else {
                if (newValue.getTime() < dijit.byId('acquisitionRangeBegin').get('value').getTime())
                    endDateInput.set('value', new Date());
            }
        },

        /**
         * Validates the from field of the resolution filter. Ensures the input value is not empty
         * or greater than the resolution to field.
         * @param newValue
         */
        validateResolutionFromVal: function(newValue) {
            let resolutionFrom = dijit.byId('resolutionFilterInputFrom');
            let resolutionTo = dijit.byId('resolutionFilterInputTo');
            if (newValue) {
                if (newValue < 0 || newValue > 5999) {
                    resolutionFrom.set('value', 0);
                }

                if (newValue >= resolutionTo.get('value')) {
                    resolutionFrom.set('value', 0);
                }
            }
            else {
                resolutionFrom.set('value', 0);
            }
        },

        /**
         * Validates the to field of the resolution filter. Ensures the input value is not empty
         * or less than the resolution from field.
         * @param newValue
         */
        validateResolutionToVal: function(newValue) {
            let resolutionTo = dijit.byId('resolutionFilterInputTo');
            let resolutionFrom = dijit.byId('resolutionFilterInputFrom');
            if (newValue) {
                if (newValue < 1 || newValue > 6000) {
                    resolutionTo.set('value', 6000);
                }

                if (newValue <= resolutionFrom.get('value')) {
                    resolutionTo.set('value', 6000);
                }
            }
            else {
                resolutionTo.set('value', 6000);
            }
        },

        /**
         * Validates the from field of the incidence angle filter. Ensures the input value is not empty
         * or greater than the from field.
         * @param newValue
         */
        validateIncidenceAngleFromVal: function(newValue) {
            let iaFrom = dijit.byId('incidenceAngleInputFrom');
            let iaTo = dijit.byId('incidenceAngleInputTo');
            if (newValue) {
                if (newValue < 0 || newValue > 89) {
                    iaFrom.set('value', 0);
                }

                if (newValue >= iaTo.get('value')) {
                    iaFrom.set('value', 0);
                }
            }
            else {
                iaFrom.set('value', 0);
            }
        },

        /**
         * Validates the to field of the incidence angle filter. Ensures the input value is not empty
         * or less than the from field.
         * @param newValue
         */
        validateIncidenceAngleToVal: function(newValue) {
            let iaTo = dijit.byId('incidenceAngleInputTo');
            let iaFrom = dijit.byId('incidenceAngleInputFrom');

            if (newValue) {
                if (newValue < 1 || newValue > 90) {
                    iaTo.set('value', 90);
                }

                if (newValue <= iaFrom.get('value')) {
                    iaTo.set('value', 90);
                }
            }
            else {
                iaTo.set('value', 90);
            }
        },

        /**
         * Validates the from field of cloud cover filter. Ensures the input is not empty
         * and is not greater than the to field.
         * @param newValue
         */
        validateCloudCoverFromVal: function(newValue) {
            let ccFrom = dijit.byId('cloudCoverInputFrom');
            let ccTo = dijit.byId('cloudCoverInputTo');

            if (newValue) {
                if (newValue < 0 || newValue > 99) {
                    ccFrom.set('value', 0);
                }

                if (newValue >= ccTo.get('value')) {
                    ccFrom.set('value', 0);
                }
            }
            else {
                ccFrom.set('value', 0);
            }
        },

        /**
         * Validates the to field of cloud cover filter. Ensures the input is not empty
         * and is not less than the from field.
         * @param newValue
         */
        validateCloudCoverToVal: function(newValue) {
            let ccTo = dijit.byId('cloudCoverInputTo');
            let ccFrom = dijit.byId('cloudCoverInputFrom');

            if (newValue) {
                if (newValue < 1 || newValue > 100) {
                    ccTo.set('value', 100);
                }

                if (newValue <= ccFrom.get('value')) {
                    ccTo.set('value', 100);
                }
            }
            else {
                ccTo.set('value', 100);
            }
        },

        /**
         * Validates the to field of snow cover filter. Ensures the input is not empty
         * and is not greater than to field.
         * @param newValue
         */
        validateSnowCoverFromVal: function(newValue) {
            let scFrom = dijit.byId('snowCoverInputFrom');
            let scTo = dijit.byId('snowCoverInputTo');

            if (newValue) {
                if (newValue < 0 || newValue > 99) {
                    scFrom.set('value', 0);
                }

                if (newValue >= scTo.get('value')) {
                    scFrom.set('value', 0);
                }
            }
            else {
                scFrom.set('value', 0);
            }
        },

        /**
         * Validates the to field of snow cover filter. Ensure the input is not empty
         * and is not less than the from field.
         * @param newValue
         */
        validateSnowCoverToVal: function(newValue) {
            let scFrom = dijit.byId('snowCoverInputFrom');
            let scTo = dijit.byId('snowCoverInputTo');

            if (newValue) {
                if (newValue < 1 || newValue > 100) {
                    scTo.set('value', 0);
                }

                if (newValue <= scFrom.get('value')) {
                    scTo.set('value', 0);
                }
            }
            else {
                scTo.set('value', 100);
            }
        },

        /**
         * Resets criteria filter fields to default values
         */
        resetCriterFilter: function() {
            dijit.byId('acquisitionRangeBegin').reset();
            dijit.byId('acquisitionRangeEnd').reset();
            dijit.byId('resolutionFilterInputFrom').reset();
            dijit.byId('resolutionFilterInputTo').reset();
        },

        /**
         * This function should only do something if at least one AOI is defined
         */
        submitCriteriaFilter: function() {

        }
    }
});