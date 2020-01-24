/*
 * CriteriaFilterViewController.js
 *
 * Defines business and validation logic for components that comprise the criteria filter widget.
 */

define(['dijit/dijit'], function(dijit) {

    return {
        validateAcquisitionRangeBeginDate: function(newValue) {
            let beginDateInput = dijit.byId('acquistionRangeBegin');

            if (!newValue) {
                beginDateInput.set('value', new Date(1970, 0, 1));
            }

            if (newValue.getTime() > dijit.byId('acquistionRangeEnd').get('value').getTime()) {
                beginDateInput.set('value', (dijit.byId('acquisitionRangeEnd').get('value').getDate() - 1));
            }
        },

        validateAcquisitionRangeEndDate: function(newValue) {
            let endDateInput = dijit.byId('acquisitionRangeEnd');

            if (!newValue) {
                endDateInput.set('value', new Date());
            }

            if (newValue.getTime() < dijit.byId('acquistionRangeBegin').get('value').getTime()) {
                beginDateInput.set('value', (dijit.byId('acquisitionRangeBegin').get('value').getDate() + 1));
            }
        }
    }
});