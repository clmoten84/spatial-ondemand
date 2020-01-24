/*
 * DrawToolViewController.js
 *
 * Defines business logic for drawing tools view components.
 */

define(['dijit/dijit',
        'esri/graphic',
        'esri/symbols/SimpleFillSymbol',
        'esri/symbols/SimpleLineSymbol',
        'esri/symbols/SimpleMarkerSymbol',
        'esri/Color',
        'esri/units',
        'esri/geometry/Circle',
        'esri/geometry/Point',
        'esri/geometry/Polygon',
        'esri/geometry/Extent',
        'esri/SpatialReference',
        'app/widgets/layout/view/MapView',
        'app/widgets/aoi/viewController/AOIManagerViewController',
        'app/util/CoordinateConversions'], function(dijit, Graphic, SimpleFillSymbol, SimpleLineSymbol, SimpleMarkerSymbol, Color,
                                                    Units, Circle, Point, Polygon, Extent, SpatialReference, MapView,
                                                    AOIManagerViewController, CoordinateConversions){
    return {
        /**
         * Handles generating AOI from polygon drawn using DrawTool component
         * @param polygonGeom
         * @param aoiName
         * @returns esri/graphic
         */
        createUserDrawnPolygonAOI: function(polygonGeom, aoiName) {
            let polySymbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
                new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color('blue'), 2),
                new Color([0, 0, 0, 0.40]));

            return new Graphic(polygonGeom, polySymbol, {type: 'user_defined', aoiName: aoiName});
        },

        /**
         * Handles generating AOI from point drawn using DrawTool component
         * @param pointGeom
         * @param radius
         * @param aoiName
         * @returns esri/graphic
         */
        createUserDrawnPointAOI: function(pointGeom, radius, aoiName) {
            let circleGeom = new Circle({
                center: pointGeom,
                radius: radius,
                radiusUnit: Units.KILOMETERS
            });

            let polySymbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
                new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color('blue'), 2),
                new Color([0, 0, 0, 0.40]));

            return new Graphic(circleGeom, polySymbol, {type: 'user_defined', aoiName: aoiName});
        },

        /**
         * Handles generating AOI from polyline drawn using DrawTool component
         * @param polylineGeom
         * @param aoiName
         * @returns esri/graphic
         */
        createUserDrawnPolylineAOI: function(polylineGeom, aoiName) {
            let polyFromExtent = Polygon.fromExtent(polylineGeom.getExtent());
            let polySymbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
                new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color('blue'), 2),
                new Color([0, 0, 0, 0.40]));

            return new Graphic(polyFromExtent, polySymbol, {type: 'user_defined', aoiName: aoiName});
        },

        /**
         * Handles generating an AOI from the arg AOI geometry.
         * @param aoi
         */
        createUserDrawnAOI: function(aoi) {
            switch(aoi.geometry.type) {
                case 'point':
                    let pointAOI = this.createUserDrawnPointAOI(aoi.geographicGeometry, dijit.byId('pointSizeInput').get('value'),
                        AOIManagerViewController.generateAOIName());
                    AOIManagerViewController.addAOIToMap(pointAOI);
                    break;
                case 'polyline':
                    let polylineAOI = this.createUserDrawnPolylineAOI(aoi.geographicGeometry, AOIManagerViewController.generateAOIName());
                    AOIManagerViewController.addAOIToMap(polylineAOI);
                    break;
                case 'polygon':
                    let polygonAOI = this.createUserDrawnPolygonAOI(aoi.geographicGeometry, AOIManagerViewController.generateAOIName());
                    AOIManagerViewController.addAOIToMap(polygonAOI);
                    break;
            }
        },

        /**
         * Handles generating an AOI from a center based point defined by the arg lat/long and width/height
         * @param latitude
         * @param longitude
         * @param width
         * @param height
         * @param units
         */
        createCenterPointBasedCoordinateAOI: function(latitude, longitude, width, height, units) {
            // Calculate values for extent
            let extentCalculation = CoordinateConversions.extrapolateExtent(latitude, longitude, width, height, units);
            let extent = new Extent({
                xmin: extentCalculation.xmin,
                ymin: extentCalculation.ymin,
                xmax: extentCalculation.xmax,
                ymax: extentCalculation.ymax,
                spatialReference: {"wkid": 4326}
            });

            // Define polygon from extent
            let polyFromExtent = Polygon.fromExtent(extent);
            let polySymbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
                new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color('blue'), 2),
                new Color([0, 0, 0, 0.40]));

            // Generate graphic from polygon and add to map view
            return new Graphic(polyFromExtent, polySymbol, {type: 'user_defined', aoiName: AOIManagerViewController.generateAOIName()});
        },

        /**
         * Handles generating an AOI from upper left and lower right corner coordinates
         * @param lowerLeftLat
         * @param lowerLeftLong
         * @param upperRightLat
         * @param upperRightLong
         */
        createCornerCoordinatesBasedAOI: function(lowerLeftLat, lowerLeftLong, upperRightLat, upperRightLong) {
            let extent = new Extent({
                xmin: lowerLeftLong,
                ymin: lowerLeftLat,
                xmax: upperRightLong,
                ymax: upperRightLat,
                spatialReference: {"wkid": 4326}
            });

            let polygon = Polygon.fromExtent(extent);
            let polySymbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
                new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color('blue'), 2),
                new Color([0, 0, 0, 0.40]));

            return new Graphic(polygon, polySymbol, {type: 'user_defined', aoiName: AOIManagerViewController.generateAOIName()});
        }
    };
});