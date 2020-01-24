/*
 * AOICoordinatesViewController.js
 *
 * Defines business logic for AOICoordinates view components.
 */

define(['dojo/dom',
        'dojo/dom-construct',
        'dijit/dijit',
        'app/widgets/aoi/viewController/DrawToolViewController',
        'app/util/CoordinateConversions',
        'app/widgets/layout/view/MapView',
        'app/widgets/aoi/viewController/AOIManagerViewController'], function (dom, domConstruct, dijit, DrawToolViewController,
                                                                                CoordinateConversions, MapView, AOIManagerViewController) {
    /***************** Private Internal functions ****************/

    return {
        /************** Public functions *****************/
        /**
         * Handles validating the input values for latitude form fields.
         * @param degreesInput the latitude degrees NumberSpinner dijit
         * @param minutesInput the latitude minutes NumberSpinner dijit
         * @param secondsInput the latitude seconds NumberSpinner dijit
         */
        onLatitudeChange: function(degreesInput, minutesInput, secondsInput) {
            if (degreesInput.get('value') < 0) {
                degreesInput.set('value', 0);
            }

            if (degreesInput.get('value') > 90) {
                degreesInput.set('value', 90);
            }

            if (degreesInput.get('value') === 90) {
                minutesInput.set('value', 0);
                secondsInput.set('value', 0);
            }

            if (minutesInput.get('value') < 0) {
                minutesInput.set('value', 0);
            }

            if (minutesInput.get('value') > 59) {
                minutesInput.set('value', 59);
            }

            if (secondsInput.get('value') < 0) {
                secondsInput.set('value', 0);
            }

            if (secondsInput.get('value') > 59) {
                secondsInput.set('value', 59);
            }
        },

        /**
         * Handles validating the input values for longitude form fields
         * @param degreesInput the longitude degrees NumberSpinner dijit
         * @param minutesInput the longitude minutes NumberSpinner dijit
         * @param secondsInput the longitude seconds NumberSpinner dijit
         */
        onLongitudeChange: function(degreesInput, minutesInput, secondsInput) {
            if (degreesInput.get('value') < 0) {
                degreesInput.set('value', 0);
            }

            if (degreesInput.get('value') > 180) {
                degreesInput.set('value', 180);
            }

            if (degreesInput.get('value') === 180) {
                minutesInput.set('value', 0);
                secondsInput.set('value', 0);
            }

            if (minutesInput.get('value') < 0) {
                minutesInput.set('value', 0);
            }

            if (minutesInput.get('value') > 59) {
                minutesInput.set('value', 59);
            }

            if (secondsInput.get('value') < 0) {
                secondsInput.set('value', 0);
            }

            if (secondsInput.get('value') > 59) {
                secondsInput.set('value', 59);
            }
        },

        /**
         * Handles toggling of the dimensions form fields when the dimensions toggle
         * is changed.
         * @param toggleState
         */
        onDimensionsTypeToggle: function(toggleState) {
            if (toggleState) {
                // Enable rectangle input fields and disable square input fields
                dijit.byId('dimensionsToggle').set('label', 'RECTANGLE');
                dijit.byId('squareLength').set('disabled', true);
                dijit.byId('squareArea').set('disabled', true);
                dijit.byId('recWidth').set('disabled', false);
                dijit.byId('recHeight').set('disabled', false);
            }
            else {
                // Enable square input fields and disable rectangle input fields
                dijit.byId('dimensionsToggle').set('label', 'SQUARE');
                dijit.byId('recWidth').set('disabled', true);
                dijit.byId('recHeight').set('disabled', true);
                dijit.byId('squareLength').set('disabled', false);
                dijit.byId('squareArea').set('disabled', false);
            }
        },

        /**
         * Handles changing the square dimensions length field
         * @param newLength
         */
        onSquareLengthChange: function(newLength) {
            if (newLength < 1)
                dijit.byId('squareLength').set('value', 1);

            if (newLength > 22000)
                dijit.byId('squareLength').set('value', 22000);
        },

        /**
         * Handles changing the square dimensions area field
         * @param newArea
         */
        onSquareAreaChange: function(newArea) {
            if (newArea < 1)
                dijit.byId('squareArea').set('value', 1);

            if (newArea > 484000000)
                dijit.byId('squareArea').set('value', 484000000);
        },

        /**
         * Handles setting the square dimensions area field when the length field is set
         */
        onSquareLengthBlur: function() {
            // Set the area field
            let currLength = dijit.byId('squareLength').get('value');
            if (currLength)
                dijit.byId('squareArea').set('value', currLength * currLength);
        },

        /**
         * Handles setting the square dimensions length field when the area field is set
         */
        onSquareAreaBlur: function() {
            // Set the length field
            let currArea = dijit.byId('squareArea').get('value');
            if (currArea)
                dijit.byId('squareLength').set('value', Math.sqrt(currArea));
        },

        /**
         * Handles changing the rectangle dimensions width field
         * @param newWidth
         */
        onRectangleWidthChange: function(newWidth) {
            if (newWidth < 1)
                dijit.byId('recWidth').set('value', 1);

            if (newWidth > 22000)
                dijit.byId('recWidth').set('value', 22000);
        },

        /**
         * Handles changing the rectangle dimensions height field
         * @param newHeight
         */
        onRectangleHeightChange: function(newHeight) {
            if (newHeight < 1)
                dijit.byId('recHeight').set('value', 1);

            if (newHeight > 22000)
                dijit.byId('recHeight').set('value', 22000);
        },

        /**
         * Handles resetting all of the form fields on the center point coordinates
         * form.
         */
        onCenterPointFormReset: function() {
            // Reset all form fields for center point coordinates
            dijit.byId('centerPointLatitudeDegrees').reset();
            dijit.byId('centerPointLatitudeMinutes').reset();
            dijit.byId('centerPointLatitudeSeconds').reset();
            dijit.byId('centerPointLatitudeDirection').reset();

            dijit.byId('centerPointLongitudeDegrees').reset();
            dijit.byId('centerPointLongitudeMinutes').reset();
            dijit.byId('centerPointLongitudeSeconds').reset();
            dijit.byId('centerPointLongitudeDirection').reset();

            dijit.byId('dimensionsToggle').reset();
            dijit.byId('squareLength').reset();
            dijit.byId('squareArea').reset();
            dijit.byId('recWidth').reset();
            dijit.byId('recHeight').reset();
        },

        /**
         * Handles submitting the center point coordinates form to generate an AOI.
         */
        onCenterPointFormSubmit: function() {
            let latDegrees = dijit.byId('centerPointLatitudeDegrees').get('value');
            let latMinutes = dijit.byId('centerPointLatitudeMinutes').get('value');
            let latSeconds = dijit.byId('centerPointLatitudeSeconds').get('value');
            let latDir = dijit.byId('centerPointLatitudeDirection').get('value');
            let lat = CoordinateConversions.convertDMSToDD(latDegrees, latMinutes, latSeconds, latDir);

            let longDegrees = dijit.byId('centerPointLongitudeDegrees').get('value');
            let longMinutes = dijit.byId('centerPointLongitudeMinutes').get('value');
            let longSeconds = dijit.byId('centerPointLongitudeSeconds').get('value');
            let longDir = dijit.byId('centerPointLongitudeDirection').get('value');
            let long = CoordinateConversions.convertDMSToDD(longDegrees, longMinutes, longSeconds, longDir);

            let width;
            let height;

            if (dijit.byId('dimensionsToggle').get('checked')) {
                // Rectangle dimensions
                width = dijit.byId('recWidth').get('value');
                height = dijit.byId('recHeight').get('value');
            }
            else {
                // Square dimensions
                width = height = dijit.byId('squareLength').get('value');
            }

            let aoi = DrawToolViewController.createCenterPointBasedCoordinateAOI(lat, long, width, height, "kilometers");

            // Add the defined AOI to the map and zoom to the AOI's extent
            AOIManagerViewController.addAOIToMap(aoi);

            // Hide the coordinates widget
            dijit.byId('aoiCoordinatesWidget').hide();
        },

        /**
         * Handles resetting all of the form fields on the corner coordinates form.
         */
        onCornerCoordinatesFormReset: function() {
            // Reset all form fields
            dijit.byId('lowerLeftLatitudeDegrees').reset();
            dijit.byId('lowerLeftLatitudeMinutes').reset();
            dijit.byId('lowerLeftLatitudeSeconds').reset();
            dijit.byId('lowerLeftLatitudeDirection').reset();

            dijit.byId('lowerLeftLongitudeDegrees').reset();
            dijit.byId('lowerLeftLongitudeMinutes').reset();
            dijit.byId('lowerLeftLongitudeSeconds').reset();
            dijit.byId('lowerLeftLongitudeDirection').reset();

            dijit.byId('upperRightLatitudeDegrees').reset();
            dijit.byId('upperRightLatitudeMinutes').reset();
            dijit.byId('upperRightLatitudeSeconds').reset();
            dijit.byId('upperRightLatitudeDirection').reset();

            dijit.byId('upperRightLongitudeDegrees').reset();
            dijit.byId('upperRightLongitudeMinutes').reset();
            dijit.byId('upperRightLongitudeSeconds').reset();
            dijit.byId('upperRightLongitudeDirection').reset();
        },

        /**
         * Handles submitting the corner coordinates form to generate an AOI
         */
        onCornerCoordinatesFormSubmit: function() {
            let lowerLeftLatDeg = dijit.byId('lowerLeftLatitudeDegrees').get('value');
            let lowerLeftLatMin = dijit.byId('lowerLeftLatitudeMinutes').get('value');
            let lowerLeftLatSec = dijit.byId('lowerLeftLatitudeSeconds').get('value');
            let lowerLeftLatDir = dijit.byId('lowerLeftLatitudeDirection').get('value');
            let lowerLeftLat = CoordinateConversions.convertDMSToDD(lowerLeftLatDeg, lowerLeftLatMin,
                lowerLeftLatSec, lowerLeftLatDir);

            let lowerLeftLongDeg = dijit.byId('lowerLeftLongitudeDegrees').get('value');
            let lowerLeftLongMin = dijit.byId('lowerLeftLongitudeMinutes').get('value');
            let lowerLeftLongSec = dijit.byId('lowerLeftLongitudeSeconds').get('value');
            let lowerLeftLongDir = dijit.byId('lowerLeftLongitudeDirection').get('value');
            let lowerLeftLong = CoordinateConversions.convertDMSToDD(lowerLeftLongDeg, lowerLeftLongMin,
                lowerLeftLongSec, lowerLeftLongDir);

            let upperRightLatDeg = dijit.byId('upperRightLatitudeDegrees').get('value');
            let upperRightLatMin = dijit.byId('upperRightLatitudeMinutes').get('value');
            let upperRightLatSec = dijit.byId('upperRightLatitudeSeconds').get('value');
            let upperRightLatDir = dijit.byId('upperRightLatitudeDirection').get('value');
            let upperRightLat = CoordinateConversions.convertDMSToDD(upperRightLatDeg, upperRightLatMin,
                upperRightLatSec, upperRightLatDir);

            let upperRightLongDeg = dijit.byId('upperRightLongitudeDegrees').get('value');
            let upperRightLongMin = dijit.byId('upperRightLongitudeMinutes').get('value');
            let upperRightLongSec = dijit.byId('upperRightLongitudeSeconds').get('value');
            let upperRightLongDir = dijit.byId('upperRightLongitudeDirection').get('value');
            let upperRightLong = CoordinateConversions.convertDMSToDD(upperRightLongDeg, upperRightLongMin,
                upperRightLongSec, upperRightLongDir);

            let aoi = DrawToolViewController.createCornerCoordinatesBasedAOI(lowerLeftLat, lowerLeftLong,
                upperRightLat, upperRightLong);

            // Add the defined AOI to the map and zoom to the AOI's extent
            AOIManagerViewController.addAOIToMap(aoi);

            // Hide the coordinates widget
            dijit.byId('aoiCoordinatesWidget').hide();
        },

        /**
         * Handles resetting form field on the MGRS grid reference form
         */
        onMGRSGridReferenceFormReset: function() {
            // Reset MGRS grid reference input
            dijit.byId('gridReference').reset();
        },

        /**
         * Handles submitting the MGRS form to generate an AOI
         */
        onMGRSGridReferenceFormSubmit: function() {
            // Get the center point coordinates for the given mgrs value
            let mgrs = dijit.byId('gridReference').get('value');
            let latLong = CoordinateConversions.convertMGRSToLatLong(mgrs);

            let aoi = DrawToolViewController.createCenterPointBasedCoordinateAOI(latLong.lat, latLong.lon,
                latLong.width, latLong.height, latLong.units);

            // Add the defined AOI to the map and zoom to the AOI's extent
            AOIManagerViewController.addAOIToMap(aoi);

            // Hide the coordinates widget
            dijit.byId('aoiCoordinatesWidget').hide();
        },

        /**
         * Checks to see if the center point coordinates form is ready for submission. If the form
         * is complete, the submission button for the form is enabled, otherwise it is disabled.
         */
        checkCenterPointFormReady: function() {
            let latDegrees = dijit.byId('centerPointLatitudeDegrees').get('value');
            let latMinutes = dijit.byId('centerPointLatitudeMinutes').get('value');
            let latSeconds = dijit.byId('centerPointLatitudeSeconds').get('value');
            let latDir = dijit.byId('centerPointLatitudeDirection').get('value');
            let longDegrees = dijit.byId('centerPointLongitudeDegrees').get('value');
            let longMinutes = dijit.byId('centerPointLongitudeMinutes').get('value');
            let longSeconds = dijit.byId('centerPointLongitudeSeconds').get('value');
            let longDir = dijit.byId('centerPointLongitudeDirection').get('value');

            let dimensionsX;
            let dimensionsY;
            if (dijit.byId('dimensionsToggle').get('checked')) {
                // RECTANGLE
                dimensionsX = dijit.byId('recWidth').get('value');
                dimensionsY = dijit.byId('recHeight').get('value');
            }
            else {
                // SQUARE
                dimensionsX = dijit.byId('squareLength').get('value');
                dimensionsY = dijit.byId('squareArea').get('value');
            }

            let submitBtn = dijit.byId('submitCenterPointBtn')
            if ((latDegrees || latDegrees === 0) && (latMinutes || latMinutes === 0)
                && (latSeconds || latSeconds === 0) && latDir && (longDegrees || longDegrees === 0)
                && (longMinutes || longMinutes === 0) && (longSeconds || longSeconds === 0) &&
                longDir && dimensionsX && dimensionsY) {

                if (submitBtn.get('disabled')) {
                    submitBtn.set('disabled', false);
                    submitBtn.set('class', 'primaryAppBtn');
                }
            }
            else {
                if (!submitBtn.get('disabled')) {
                    submitBtn.set('disabled', true);
                    submitBtn.set('class', 'disabledAppBtn');
                }
            }
        },

        /**
         * Checks to see if the corner coordinates form is ready for submission. If the form
         * is complete, the submission button for the form is enabled, otherwise it is disabled.
         */
        checkCornerCoordinatesFormReady: function() {
            let lowerLeftLatDeg = dijit.byId('lowerLeftLatitudeDegrees').get('value');
            let lowerLeftLatMin = dijit.byId('lowerLeftLatitudeMinutes').get('value');
            let lowerLeftLatSec = dijit.byId('lowerLeftLatitudeSeconds').get('value');
            let lowerLeftLongDeg = dijit.byId('lowerLeftLongitudeDegrees').get('value');
            let lowerLeftLongMin = dijit.byId('lowerLeftLongitudeMinutes').get('value');
            let lowerLeftLongSec = dijit.byId('lowerLeftLongitudeSeconds').get('value');
            
            let upperRightLatDeg = dijit.byId('upperRightLatitudeDegrees').get('value');
            let upperRightLatMin = dijit.byId('upperRightLatitudeMinutes').get('value');
            let upperRightLatSec = dijit.byId('upperRightLatitudeSeconds').get('value');
            let upperRightLongDeg = dijit.byId('upperRightLongitudeDegrees').get('value');
            let upperRightLongMin = dijit.byId('upperRightLongitudeMinutes').get('value');
            let upperRightLongSec = dijit.byId('upperRightLongitudeSeconds').get('value');

            let submitBtn = dijit.byId('submitCornerCoordinatesBtn');
            if ((lowerLeftLatDeg || lowerLeftLatDeg === 0) && (lowerLeftLatMin || lowerLeftLatMin === 0) &&
                (lowerLeftLatSec || lowerLeftLatSec === 0) && (lowerLeftLongDeg || lowerLeftLongDeg === 0) &&
                (lowerLeftLongMin || lowerLeftLongMin === 0) && (lowerLeftLongSec || lowerLeftLongSec === 0)
                && (upperRightLatDeg || upperRightLatDeg === 0) && (upperRightLatMin || upperRightLatMin === 0)
                && (upperRightLatSec || upperRightLatSec === 0) && (upperRightLongDeg || upperRightLongDeg === 0)
                && (upperRightLongMin || upperRightLongMin === 0) && (upperRightLongSec || upperRightLongSec === 0)) {

                if (submitBtn.get('disabled')) {
                    submitBtn.set('disabled', false);
                    submitBtn.set('class', 'primaryAppBtn');
                }
            }
            else {
                if (!submitBtn.get('disabled')) {
                    submitBtn.set('disabled', true);
                    submitBtn.set('class', 'disabledAppBtn');
                }
            }
        },

        /**
         * Handles validating input MGRS grid reference values from mgrs field
         * @param mgrs
         */
        checkMGRSGridReferenceFormReady(mgrs) {
            let submitBtn = dijit.byId('submitMGRSBtn');
            if (CoordinateConversions.mgrsIsValid(mgrs)) {
                // Enable submit button
                submitBtn.set('disabled', false);
                submitBtn.set('class', 'primaryAppBtn');
            }
            else {
                // Disable submit button
                submitBtn.set('disabled', true);
                submitBtn.set('class', 'disabledAppBtn');
            }
        },
    };
});