/*
 * CoordinateConversions.js
 *
 * Static utility functions for various coordinate related conversions.
 */

define(['esri/geometry/webMercatorUtils',
        'amd_lib/usng'], function (webMercatorUtils, USNG) {
    return {
        /**
         * Converts the arg DMS (degrees minutes seconds) to DD (decimal degrees)
         * @param degrees
         * @param minutes
         * @param seconds
         * @param direction
         * @returns {*}
         */
        convertDMSToDD: function (degrees, minutes, seconds, direction) {
            let dd = degrees + (minutes / 60) + (seconds / (60 * 60));
            if (direction === 'S' || direction === 'W')
                dd = dd * -1;

            return dd;
        },

        /**
         * Checks the validity of the argument MGRS grid reference
         * @param mgrs
         * @returns {boolean}
         */
        mgrsIsValid: function (mgrs) {
            return /^\d{1,2}[^ABIOYZ]{3}(\d{10}|\d{8}|\d{6}|\d{4}|\d{2})$/im.test(mgrs);
        },

        /**
         * Converts the arg MGRS grid reference to latitude longitude coords
         * @param mgrs
         */
        convertMGRSToLatLong: function (mgrs) {
            // Need to reverse the mgrs to apply reg expression to get the grid coordinates portion of the MGRS.
            // This will allow to determine the desired width and height of the final extent.
            let reverseMGRS = mgrs.split("").reverse().join("");
            let gridCoordinates = reverseMGRS.match(/(^\d)[A-Z]*\s?(\d)+/g)[0];
            let units = "";
            let widthHeight = 0;

            switch(gridCoordinates.length) {
                case 2:
                    units = "kilometers";
                    widthHeight = 10;
                    break;
                case 4:
                    units = "kilometers";
                    widthHeight = 1;
                    break;
                case 6:
                    units = "meters";
                    widthHeight = 100;
                    break;
                case 8:
                    units = "meters";
                    widthHeight = 10;
                    break;
                case 10:
                    units = "meters";
                    widthHeight = 1;
                    break;
            }

            let usngConverter = new USNG.Converter();
            let latLongObj =usngConverter.USNGtoLL(mgrs, true);
            latLongObj.width = widthHeight;
            latLongObj.height = widthHeight;
            latLongObj.units = units;

            return latLongObj;
        },

        /**
         * Converts the argument aoiGeometry to use geographic coordinates.
         * @param aoiGeometry
         */
        convertWebMercatorToGeographic: function(aoiGeometry) {
            return webMercatorUtils.webMercatorToGeographic(aoiGeometry);
        },

        /**
         * Extrapolates an extent by calculating the bottom left and top right corner coordinates given a central
         * latitude/longitude and the desired width and height for the final extent using the argument units. Argument
         * units can be either meters or kilometers. If units is not specified, kilometers are used by default.
         * @param lat
         * @param long
         * @param width
         * @param height
         * @param units
         * @returns {{xmin: number, xmax: *, ymin: number, ymax: *}}
         */
        extrapolateExtent: function(lat, long, width, height, units) {
            let scaleFactor = 0.009; // scale factor is based on KM by default
            if (units === 'meters')
                scaleFactor = 0.00009;

            return {
                xmin: long - (scaleFactor * width),
                xmax: long + (scaleFactor * width),
                ymin: lat - (scaleFactor * height),
                ymax: lat + (scaleFactor * height)
            };
        }
        //TODO: implement a non-niave algorithm for generating bounding box coords from a central point (lat, long)
    }
});