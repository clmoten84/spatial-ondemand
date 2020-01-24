/*
 * AOICoordinates.js
 *
 * Defines the visual components for the AOI coordinates widget. This widget
 * allows the user to define AOIs by specifying coordinates.
 */

define(['dojo/_base/declare',
        'dojo/dom',
        'dojo/dom-construct',
        'dijit/dijit',
        'dijit/Dialog',
        'dijit/layout/TabContainer',
        'dijit/layout/ContentPane',
        'dijit/form/NumberSpinner',
        'dijit/form/Select',
        'dijit/form/ToggleButton',
        'dijit/form/Button',
        'dijit/form/ValidationTextBox',
        'app/widgets/aoi/viewController/AOICoordinatesViewController'],
            function(declare, dom, domConstruct, dijit, Dialog, TabContainer,
                      ContentPane, NumberSpinner, Select, ToggleButton, Button,
                      ValidationTextBox, AOICoordinatesViewController){

    /******************** Private properties ******************/
    let aoiCoordinatesWidget = null;

    /******************** Private functions ********************/
    //TODO: refactor these render functions into view classes
    /**
     * Renders the coordinates widget by defining the coordinates type selector and all
     * of its associated components.
     * @returns domNode
     */
    function renderCoordinatesTypeSelectorWrapper() {
        let aoiCoordinatesTypeSelector = dijit.byId('aoiCoordinatesTypeSelectorWrapper');
        if (!aoiCoordinatesTypeSelector) {
            aoiCoordinatesTypeSelector = new TabContainer({id: 'aoiCoordinatesTypeSelectorWrapper'});
            aoiCoordinatesTypeSelector.addChild(renderCenterPointCoordinatesForm());
            aoiCoordinatesTypeSelector.addChild(renderCornerCoordinatesForm());
            aoiCoordinatesTypeSelector.addChild(renderMGRSCoordinatesForm());
        }

        return aoiCoordinatesTypeSelector.domNode;
    }

    /**
     * Renders the form and associated components for specifying AOI coordinates
     * using center point coordinates.
     * @return Dijit ContentPane
     */
    function renderCenterPointCoordinatesForm() {
        let aoiCenterPointCoordinatesContainer = new ContentPane({
            class: 'aoiCoordinatesFormContainer',
            title: 'Center Point'
        });

        /******************************* LAT AND LONG SECTION *****************************/
        /**********************************************************************************/
        let centerPointLabelDiv = domConstruct.create('div', {style:'padding: 5px; margin-bottom:5px; background-color:#411145; text-align:center;'});
        centerPointLabelDiv.appendChild(domConstruct.create('label', {innerHTML: 'Center Point', style:'color:white; font-size:small;'}));
        aoiCenterPointCoordinatesContainer.domNode.appendChild(centerPointLabelDiv);

        /*************** LATITUDE ***************/
        /****************************************/
        let latitudeInputContainer = domConstruct.create('div', {style:'width:50%; display:inline-block; margin-bottom:15px;'});
        latitudeInputContainer.appendChild(domConstruct.create('h3', {innerHTML: 'Latitude', style:'margin-bottom:10px;'}));

        let latitudeDegreesInput = domConstruct.create('div', {style: 'display:inline-block;'});
        latitudeDegreesInput.appendChild(domConstruct.create('label', {innerHTML: '&#176;', class: 'aoiCoordinatesLabel'}));
        latitudeDegreesInput.appendChild(new NumberSpinner({
            id: 'centerPointLatitudeDegrees',
            class: 'latLongInput',
            smallDelta: 1,
            largeDelta: 1,
            constraints: { min: 0, max: 90, places: 0 },
            required: true,
            trim: true,
            onChange: function() {
                AOICoordinatesViewController.onLatitudeChange(this, dijit.byId('centerPointLatitudeMinutes'),
                    dijit.byId('centerPointLatitudeSeconds'));
                AOICoordinatesViewController.checkCenterPointFormReady();
            }
        }).domNode);

        let latitudeMinutesInput = domConstruct.create('div', {style: 'display:inline-block;'});
        latitudeMinutesInput.appendChild(domConstruct.create('label', {innerHTML: "'", class: "aoiCoordinatesLabel"}));
        latitudeMinutesInput.appendChild(new NumberSpinner({
            id: 'centerPointLatitudeMinutes',
            class: 'latLongInput',
            smallDelta: 1,
            largeDelta: 1,
            constraints: { min: 0, max: 59, places: 0 },
            required: true,
            trim: true,
            onChange: function() {
                AOICoordinatesViewController.onLatitudeChange(dijit.byId('centerPointLatitudeDegrees'), this,
                    dijit.byId('centerPointLatitudeSeconds'));
                AOICoordinatesViewController.checkCenterPointFormReady();
            }
        }).domNode);

        let latitudeSecondsInput = domConstruct.create('div', {style: 'display:inline-block;'});
        latitudeSecondsInput.appendChild(domConstruct.create('label', {innerHTML: '"', class: 'aoiCoordinatesLabel'}));
        latitudeSecondsInput.appendChild(new NumberSpinner({
            id: 'centerPointLatitudeSeconds',
            class: 'latLongInput',
            smallDelta: 1,
            largeDelta: 1,
            constraints: { min: 0, max: 59, places: 0 },
            required: true,
            trim: true,
            onChange: function() {
                AOICoordinatesViewController.onLatitudeChange(dijit.byId('centerPointLatitudeDegrees'), dijit.byId('centerPointLatitudeMinutes'),
                    this);
                AOICoordinatesViewController.checkCenterPointFormReady();
            }
        }).domNode);

        let latitudeDirectionInput = domConstruct.create('div', {style: 'display:inline-block;'});
        latitudeDirectionInput.appendChild(new Select({
            id: 'centerPointLatitudeDirection',
            class: 'latLongInput',
            options: [
                {label: 'N', value: 'N'},
                {label: 'S', value: 'S'}
            ]
        }).domNode);

        latitudeInputContainer.appendChild(latitudeDegreesInput);
        latitudeInputContainer.appendChild(latitudeMinutesInput);
        latitudeInputContainer.appendChild(latitudeSecondsInput);
        latitudeInputContainer.appendChild(latitudeDirectionInput);

        /******************* LONGITUDE ******************/
        /************************************************/
        let longitudeInputContainer = domConstruct.create('div', {style:'width:50%; display:inline-block; margin-bottom:15px;'});
        longitudeInputContainer.appendChild(domConstruct.create('h3', {innerHTML: 'Longitude', style:'margin-bottom:10px;'}));

        let longitudeDegreesInput = domConstruct.create('div', {style: 'display:inline-block;'});
        longitudeDegreesInput.appendChild(domConstruct.create('label', {innerHTML: '&#176;', class: 'aoiCoordinatesLabel'}));
        longitudeDegreesInput.appendChild(new NumberSpinner({
            id: 'centerPointLongitudeDegrees',
            class: 'latLongInput',
            smallDelta: 1,
            largeDelta: 1,
            constraints: { min: 0, max: 180, places: 0 },
            required: true,
            trim: true,
            onChange: function() {
                AOICoordinatesViewController.onLongitudeChange(this, dijit.byId('centerPointLongitudeMinutes'),
                    dijit.byId('centerPointLongitudeSeconds'));
                AOICoordinatesViewController.checkCenterPointFormReady();
            }
        }).domNode);

        let longitudeMinutesInput = domConstruct.create('div', {style: 'display:inline-block;'});
        longitudeMinutesInput.appendChild(domConstruct.create('label', {innerHTML: "'", class: "aoiCoordinatesLabel"}));
        longitudeMinutesInput.appendChild(new NumberSpinner({
            id: 'centerPointLongitudeMinutes',
            class: 'latLongInput',
            smallDelta: 1,
            largeDelta: 1,
            constraints: { min: 0, max: 59, places: 0 },
            required: true,
            trim: true,
            onChange: function() {
                AOICoordinatesViewController.onLongitudeChange(dijit.byId('centerPointLongitudeDegrees'), this,
                    dijit.byId('centerPointLongitudeSeconds'));
                AOICoordinatesViewController.checkCenterPointFormReady();
            }
        }).domNode);

        let longitudeSecondsInput = domConstruct.create('div', {style: 'display:inline-block;'});
        longitudeSecondsInput.appendChild(domConstruct.create('label', {innerHTML: '"', class: 'aoiCoordinatesLabel'}));
        longitudeSecondsInput.appendChild(new NumberSpinner({
            id: 'centerPointLongitudeSeconds',
            class: 'latLongInput',
            smallDelta: 1,
            largeDelta: 1,
            constraints: { min: 0, max: 59, places: 0 },
            required: true,
            trim: true,
            onChange: function() {
                AOICoordinatesViewController.onLongitudeChange(dijit.byId('centerPointLongitudeDegrees'), dijit.byId('centerPointLongitudeMinutes'),
                    this);
                AOICoordinatesViewController.checkCenterPointFormReady();
            }
        }).domNode);

        let longitudeDirectionInput = domConstruct.create('div', {style: 'display:inline-block;'});
        longitudeDirectionInput.appendChild(new Select({
            id: 'centerPointLongitudeDirection',
            class: 'latLongInput',
            options: [
                {label: 'W', value: 'W'},
                {label: 'E', value: 'E'}
            ]
        }).domNode);

        longitudeInputContainer.appendChild(longitudeDegreesInput);
        longitudeInputContainer.appendChild(longitudeMinutesInput);
        longitudeInputContainer.appendChild(longitudeSecondsInput);
        longitudeInputContainer.appendChild(longitudeDirectionInput);

        aoiCenterPointCoordinatesContainer.domNode.appendChild(latitudeInputContainer);
        aoiCenterPointCoordinatesContainer.domNode.appendChild(longitudeInputContainer);

        /**************************** DIMENSIONS SECTION **************************/
        /**************************************************************************/
        let dimensionsLabelDiv = domConstruct.create('div', {style:'padding: 5px; margin-bottom:5px; background-color:#411145; text-align:center;'});
        dimensionsLabelDiv.appendChild(domConstruct.create('label', {innerHTML: 'Dimensions', style:'color:white; font-size:small;'}));
        aoiCenterPointCoordinatesContainer.domNode.appendChild(dimensionsLabelDiv);

        let dimensionsToggleDiv = domConstruct.create('div', {style: 'padding:3px; text-align:center; margin-bottom:5px;'});
        dimensionsToggleDiv.appendChild(new ToggleButton({
            id: 'dimensionsToggle',
            label: 'SQUARE',
            class: 'appButton',
            showLabel: true,
            checked: false,
            onChange: function(newVal) {
                AOICoordinatesViewController.onDimensionsTypeToggle(newVal);
                AOICoordinatesViewController.checkCenterPointFormReady();
            }
        }).domNode);
        aoiCenterPointCoordinatesContainer.domNode.appendChild(dimensionsToggleDiv);

        /************** Square Dimensions ***************/
        let squareDimensionsForm = domConstruct.create('div', {id: 'squareDimensionsForm', style: 'width:50%; display:inline-block; text-align:center; margin-bottom:15px;'});
        let squareLengthInput = domConstruct.create('div', {style: 'margin-bottom: 10px;'});
        squareLengthInput.appendChild(domConstruct.create('label', {innerHTML: 'Length (km)', class: 'dimensionsLabel'}));
        squareLengthInput.appendChild(new NumberSpinner({
            id: 'squareLength',
            class: 'dimensionsInput',
            style: 'margin-left: 12px;',
            smallDelta: 1,
            largeDelta: 1,
            required: false,
            trim: true,
            constraints: {
                min: 1,
                max: 22000,
                places: 5
            },
            onChange: function(newLength) {
                AOICoordinatesViewController.onSquareLengthChange(newLength);
                AOICoordinatesViewController.checkCenterPointFormReady();
            },
            onBlur: function() {
                AOICoordinatesViewController.onSquareLengthBlur();
            }
        }).domNode);

        let squareAreaInput = domConstruct.create('div');
        squareAreaInput.appendChild(domConstruct.create('label', {innerHTML: 'Area (km&#178;)', class: 'dimensionsLabel'}));
        squareAreaInput.appendChild(new NumberSpinner({
            id: 'squareArea',
            class: 'dimensionsInput',
            style: 'margin-left: 23px;',
            smallDelta: 1,
            largeDelta: 1,
            required: false,
            trim: true,
            constraints: {
                min: 1,
                max: 484000000,
                places: 5
            },
            onChange: function(newArea) {
                AOICoordinatesViewController.onSquareAreaChange(newArea);
                AOICoordinatesViewController.checkCenterPointFormReady();
            },
            onBlur: function() {
                AOICoordinatesViewController.onSquareAreaBlur();
            }
        }).domNode);

        squareDimensionsForm.appendChild(squareLengthInput);
        squareDimensionsForm.appendChild(squareAreaInput);

        /************** Rectangle Dimensions **************/
        let recDimensionsForm = domConstruct.create('div', {id: 'recDimensionsForm', style: 'width:50%; display:inline-block; text-align:center; margin-bottom:15px;'});
        let recWidthInput = domConstruct.create('div', {style: 'margin-bottom:10px;'});
        recWidthInput.appendChild(domConstruct.create('label', {innerHTML: 'Width (km)', class: 'dimensionsLabel'}));
        recWidthInput.appendChild(new NumberSpinner({
            id: 'recWidth',
            disabled: true,
            class: 'dimensionsInput',
            style: 'margin-left: 14px;',
            smallDelta: 1,
            largeDelta: 1,
            required: false,
            trim: true,
            constraints: {
                min: 1,
                max: 22000,
                places: 0
            },
            onChange: function(newWidth) {
                AOICoordinatesViewController.onRectangleWidthChange(newWidth);
                AOICoordinatesViewController.checkCenterPointFormReady();
            }
        }).domNode);

        let recHeightInput = domConstruct.create('div');
        recHeightInput.appendChild(domConstruct.create('label', {innerHTML: 'Height (km)', class: 'dimensionsLabel'}));
        recHeightInput.appendChild(new NumberSpinner({
            id: 'recHeight',
            disabled: true,
            class: 'dimensionsInput',
            style: 'margin-left: 10px;',
            smallDelta: 1,
            largeDelta: 1,
            required: false,
            trim: true,
            constraints: {
                min: 1,
                max: 22000,
                places: 0
            },
            onChange: function(newHeight) {
                AOICoordinatesViewController.onRectangleHeightChange(newHeight);
                AOICoordinatesViewController.checkCenterPointFormReady();
            }
        }).domNode);

        recDimensionsForm.appendChild(recWidthInput);
        recDimensionsForm.appendChild(recHeightInput);

        aoiCenterPointCoordinatesContainer.domNode.appendChild(squareDimensionsForm);
        aoiCenterPointCoordinatesContainer.domNode.appendChild(recDimensionsForm);

        /************************** SUBMIT SECTION *****************************/
        /***********************************************************************/
        let submitCenterPointCoordinatesDiv = domConstruct.create('div', {style: 'margin-top:25px; padding: 5px; text-align:center;'});
        submitCenterPointCoordinatesDiv.appendChild(new Button({
            id: 'resetCenterPointBtn',
            label: 'Reset',
            class: 'secondaryAppBtn',
            onClick: AOICoordinatesViewController.onCenterPointFormReset
        }).domNode);

        submitCenterPointCoordinatesDiv.appendChild(new Button({
            id: 'submitCenterPointBtn',
            label: 'OK',
            class: 'disabledAppBtn',
            disabled: true,
            onClick: AOICoordinatesViewController.onCenterPointFormSubmit
        }).domNode);

        aoiCenterPointCoordinatesContainer.domNode.appendChild(submitCenterPointCoordinatesDiv);

        return aoiCenterPointCoordinatesContainer;
    }

    /**
     * Renders the form and associated components for specifying AOI coordinates
     * using corner coordinates.
     * @return Dijit ContentPane
     */
    function renderCornerCoordinatesForm() {
        let aoiCornerCoordinatesContainer = new ContentPane({
            class: 'aoiCoordinatesFormContainer',
            title: 'Corner Coordinates'
        });

        /************************************* LOWER LEFT SECTION ****************************************/
        /*************************************************************************************************/
        let lowerLeftLabelDiv = domConstruct.create('div', {style:'padding: 5px; margin-bottom:5px; background-color:#411145; text-align:center;'});
        lowerLeftLabelDiv.appendChild(domConstruct.create('label', {innerHTML: 'Lower Left', style: 'color:white; font-size:small;'}));
        aoiCornerCoordinatesContainer.domNode.appendChild(lowerLeftLabelDiv);

        /*************** LATITUDE ***************/
        /****************************************/
        let lowerLeftLatitudeInputContainer = domConstruct.create('div', {style:'width:50%; display:inline-block; margin-bottom:15px;'});
        lowerLeftLatitudeInputContainer.appendChild(domConstruct.create('h3', {innerHTML: 'Latitude', style:'margin-bottom:10px;'}));

        let lowerLeftLatitudeDegreesInput = domConstruct.create('div', {style: 'display:inline-block;'});
        lowerLeftLatitudeDegreesInput.appendChild(domConstruct.create('label', {innerHTML: '&#176;', class: 'aoiCoordinatesLabel'}));
        lowerLeftLatitudeDegreesInput.appendChild(new NumberSpinner({
            id: 'lowerLeftLatitudeDegrees',
            class: 'latLongInput',
            smallDelta: 1,
            largeDelta: 1,
            constraints: { min: 0, max: 90, places: 0 },
            required: true,
            trim: true,
            onChange: function() {
                AOICoordinatesViewController.onLatitudeChange(this, dijit.byId('lowerLeftLatitudeMinutes'),
                    dijit.byId('lowerLeftLatitudeSeconds'));
                AOICoordinatesViewController.checkCornerCoordinatesFormReady();
            }
        }).domNode);

        let lowerLeftLatitudeMinutesInput = domConstruct.create('div', {style: 'display:inline-block;'});
        lowerLeftLatitudeMinutesInput.appendChild(domConstruct.create('label', {innerHTML: "'", class: "aoiCoordinatesLabel"}));
        lowerLeftLatitudeMinutesInput.appendChild(new NumberSpinner({
            id: 'lowerLeftLatitudeMinutes',
            class: 'latLongInput',
            smallDelta: 1,
            largeDelta: 1,
            constraints: { min: 0, max: 59, places: 0 },
            required: true,
            trim: true,
            onChange: function() {
                AOICoordinatesViewController.onLatitudeChange(dijit.byId('lowerLeftLatitudeDegrees'), this,
                    dijit.byId('lowerLeftLatitudeSeconds'));
                AOICoordinatesViewController.checkCornerCoordinatesFormReady();
            }
        }).domNode);

        let lowerLeftLatitudeSecondsInput = domConstruct.create('div', {style: 'display:inline-block;'});
        lowerLeftLatitudeSecondsInput.appendChild(domConstruct.create('label', {innerHTML: '"', class: 'aoiCoordinatesLabel'}));
        lowerLeftLatitudeSecondsInput.appendChild(new NumberSpinner({
            id: 'lowerLeftLatitudeSeconds',
            class: 'latLongInput',
            smallDelta: 1,
            largeDelta: 1,
            constraints: { min: 0, max: 59, places: 0 },
            required: true,
            trim: true,
            onChange: function() {
                AOICoordinatesViewController.onLatitudeChange(dijit.byId('lowerLeftLatitudeDegrees'),
                    dijit.byId('lowerLeftLatitudeMinutes'), this);
                AOICoordinatesViewController.checkCornerCoordinatesFormReady();
            }
        }).domNode);

        let lowerLeftLatitudeDirectionInput = domConstruct.create('div', {style: 'display:inline-block;'});
        lowerLeftLatitudeDirectionInput.appendChild(new Select({
            id: 'lowerLeftLatitudeDirection',
            class: 'latLongInput',
            options: [
                {label: 'N', value: 'N'},
                {label: 'S', value: 'S'}
            ]
        }).domNode);

        lowerLeftLatitudeInputContainer.appendChild(lowerLeftLatitudeDegreesInput);
        lowerLeftLatitudeInputContainer.appendChild(lowerLeftLatitudeMinutesInput);
        lowerLeftLatitudeInputContainer.appendChild(lowerLeftLatitudeSecondsInput);
        lowerLeftLatitudeInputContainer.appendChild(lowerLeftLatitudeDirectionInput);

        /******************* LONGITUDE ******************/
        /************************************************/
        let lowerLeftLongitudeInputContainer = domConstruct.create('div', {style:'width:50%; display:inline-block; margin-bottom:15px;'});
        lowerLeftLongitudeInputContainer.appendChild(domConstruct.create('h3', {innerHTML: 'Longitude', style:'margin-bottom:10px;'}));

        let lowerLeftLongitudeDegreesInput = domConstruct.create('div', {style: 'display:inline-block;'});
        lowerLeftLongitudeDegreesInput.appendChild(domConstruct.create('label', {innerHTML: '&#176;', class: 'aoiCoordinatesLabel'}));
        lowerLeftLongitudeDegreesInput.appendChild(new NumberSpinner({
            id: 'lowerLeftLongitudeDegrees',
            class: 'latLongInput',
            smallDelta: 1,
            largeDelta: 1,
            constraints: { min: 0, max: 180, places: 0 },
            required: true,
            trim: true,
            onChange: function() {
                AOICoordinatesViewController.onLongitudeChange(this, dijit.byId('lowerLeftLongitudeMinutes'),
                    dijit.byId('lowerLeftLongitudeSeconds'));
                AOICoordinatesViewController.checkCornerCoordinatesFormReady();
            }
        }).domNode);

        let lowerLeftLongitudeMinutesInput = domConstruct.create('div', {style: 'display:inline-block;'});
        lowerLeftLongitudeMinutesInput.appendChild(domConstruct.create('label', {innerHTML: "'", class: "aoiCoordinatesLabel"}));
        lowerLeftLongitudeMinutesInput.appendChild(new NumberSpinner({
            id: 'lowerLeftLongitudeMinutes',
            class: 'latLongInput',
            smallDelta: 1,
            largeDelta: 1,
            constraints: { min: 0, max: 59, places: 0 },
            required: true,
            trim: true,
            onChange: function() {
                AOICoordinatesViewController.onLongitudeChange(dijit.byId('lowerLeftLongitudeDegrees'), this,
                    dijit.byId('lowerLeftLongitudeSeconds'));
                AOICoordinatesViewController.checkCornerCoordinatesFormReady();
            }
        }).domNode);

        let lowerLeftLongitudeSecondsInput = domConstruct.create('div', {style: 'display:inline-block;'});
        lowerLeftLongitudeSecondsInput.appendChild(domConstruct.create('label', {innerHTML: '"', class: 'aoiCoordinatesLabel'}));
        lowerLeftLongitudeSecondsInput.appendChild(new NumberSpinner({
            id: 'lowerLeftLongitudeSeconds',
            class: 'latLongInput',
            smallDelta: 1,
            largeDelta: 1,
            constraints: { min: 0, max: 59, places: 0 },
            required: true,
            trim: true,
            onChange: function() {
                AOICoordinatesViewController.onLongitudeChange(dijit.byId('lowerLeftLongitudeDegrees'),
                    dijit.byId('lowerLeftLongitudeMinutes'), this);
                AOICoordinatesViewController.checkCornerCoordinatesFormReady();
            }
        }).domNode);

        let lowerLeftLongitudeDirectionInput = domConstruct.create('div', {style: 'display:inline-block;'});
        lowerLeftLongitudeDirectionInput.appendChild(new Select({
            id: 'lowerLeftLongitudeDirection',
            class: 'latLongInput',
            options: [
                {label: 'W', value: 'W'},
                {label: 'E', value: 'E'}
            ]
        }).domNode);

        lowerLeftLongitudeInputContainer.appendChild(lowerLeftLongitudeDegreesInput);
        lowerLeftLongitudeInputContainer.appendChild(lowerLeftLongitudeMinutesInput);
        lowerLeftLongitudeInputContainer.appendChild(lowerLeftLongitudeSecondsInput);
        lowerLeftLongitudeInputContainer.appendChild(lowerLeftLongitudeDirectionInput);

        aoiCornerCoordinatesContainer.domNode.appendChild(lowerLeftLatitudeInputContainer);
        aoiCornerCoordinatesContainer.domNode.appendChild(lowerLeftLongitudeInputContainer);

        /************************************* UPPER RIGHT SECTION ****************************************/
        /*************************************************************************************************/
        let upperRightLabelDiv = domConstruct.create('div', {style:'padding: 5px; margin-bottom:5px; background-color:#411145; text-align:center;'});
        upperRightLabelDiv.appendChild(domConstruct.create('label', {innerHTML: 'Upper Right', style: 'color:white; font-size:small;'}));
        aoiCornerCoordinatesContainer.domNode.appendChild(upperRightLabelDiv);

        /*************** LATITUDE ***************/
        /****************************************/
        let upperRightLatitudeInputContainer = domConstruct.create('div', {style:'width:50%; display:inline-block; margin-bottom:15px;'});
        upperRightLatitudeInputContainer.appendChild(domConstruct.create('h3', {innerHTML: 'Latitude', style:'margin-bottom:10px;'}));

        let upperRightLatitudeDegreesInput = domConstruct.create('div', {style: 'display:inline-block;'});
        upperRightLatitudeDegreesInput.appendChild(domConstruct.create('label', {innerHTML: '&#176;', class: 'aoiCoordinatesLabel'}));
        upperRightLatitudeDegreesInput.appendChild(new NumberSpinner({
            id: 'upperRightLatitudeDegrees',
            class: 'latLongInput',
            smallDelta: 1,
            largeDelta: 1,
            constraints: { min: 0, max: 90, places: 0 },
            required: true,
            trim: true,
            onChange: function() {
                AOICoordinatesViewController.onLatitudeChange(this, dijit.byId('upperRightLatitudeMinutes'),
                    dijit.byId('upperRightLatitudeSeconds'));
                AOICoordinatesViewController.checkCornerCoordinatesFormReady();
            }
        }).domNode);

        let upperRightLatitudeMinutesInput = domConstruct.create('div', {style: 'display:inline-block;'});
        upperRightLatitudeMinutesInput.appendChild(domConstruct.create('label', {innerHTML: "'", class: "aoiCoordinatesLabel"}));
        upperRightLatitudeMinutesInput.appendChild(new NumberSpinner({
            id: 'upperRightLatitudeMinutes',
            class: 'latLongInput',
            smallDelta: 1,
            largeDelta: 1,
            constraints: { min: 0, max: 59, places: 0 },
            required: true,
            trim: true,
            onChange: function() {
                AOICoordinatesViewController.onLatitudeChange(dijit.byId('upperRightLatitudeDegrees'), this,
                    dijit.byId('upperRightLatitudeSeconds'));
                AOICoordinatesViewController.checkCornerCoordinatesFormReady();
            }
        }).domNode);

        let upperRightLatitudeSecondsInput = domConstruct.create('div', {style: 'display:inline-block;'});
        upperRightLatitudeSecondsInput.appendChild(domConstruct.create('label', {innerHTML: '"', class: 'aoiCoordinatesLabel'}));
        upperRightLatitudeSecondsInput.appendChild(new NumberSpinner({
            id: 'upperRightLatitudeSeconds',
            class: 'latLongInput',
            smallDelta: 1,
            largeDelta: 1,
            constraints: { min: 0, max: 59, places: 0 },
            required: true,
            trim: true,
            onChange: function() {
                AOICoordinatesViewController.onLatitudeChange(dijit.byId('upperRightLatitudeDegrees'),
                    dijit.byId('upperRightLatitudeMinutes'), this);
                AOICoordinatesViewController.checkCornerCoordinatesFormReady();
            }
        }).domNode);

        let upperRightLatitudeDirectionInput = domConstruct.create('div', {style: 'display:inline-block;'});
        upperRightLatitudeDirectionInput.appendChild(new Select({
            id: 'upperRightLatitudeDirection',
            class: 'latLongInput',
            options: [
                {label: 'N', value: 'N'},
                {label: 'S', value: 'S'}
            ]
        }).domNode);

        upperRightLatitudeInputContainer.appendChild(upperRightLatitudeDegreesInput);
        upperRightLatitudeInputContainer.appendChild(upperRightLatitudeMinutesInput);
        upperRightLatitudeInputContainer.appendChild(upperRightLatitudeSecondsInput);
        upperRightLatitudeInputContainer.appendChild(upperRightLatitudeDirectionInput);

        /******************* LONGITUDE ******************/
        /************************************************/
        let upperRightLongitudeInputContainer = domConstruct.create('div', {style:'width:50%; display:inline-block; margin-bottom:15px;'});
        upperRightLongitudeInputContainer.appendChild(domConstruct.create('h3', {innerHTML: 'Longitude', style:'margin-bottom:10px;'}));

        let upperRightLongitudeDegreesInput = domConstruct.create('div', {style: 'display:inline-block;'});
        upperRightLongitudeDegreesInput.appendChild(domConstruct.create('label', {innerHTML: '&#176;', class: 'aoiCoordinatesLabel'}));
        upperRightLongitudeDegreesInput.appendChild(new NumberSpinner({
            id: 'upperRightLongitudeDegrees',
            class: 'latLongInput',
            smallDelta: 1,
            largeDelta: 1,
            constraints: { min: 0, max: 180, places: 0 },
            required: true,
            trim: true,
            onChange: function() {
                AOICoordinatesViewController.onLongitudeChange(this, dijit.byId('upperRightLongitudeMinutes'),
                    dijit.byId('upperRightLongitudeSeconds'));
                AOICoordinatesViewController.checkCornerCoordinatesFormReady();
            }
        }).domNode);

        let upperRightLongitudeMinutesInput = domConstruct.create('div', {style: 'display:inline-block;'});
        upperRightLongitudeMinutesInput.appendChild(domConstruct.create('label', {innerHTML: "'", class: "aoiCoordinatesLabel"}));
        upperRightLongitudeMinutesInput.appendChild(new NumberSpinner({
            id: 'upperRightLongitudeMinutes',
            class: 'latLongInput',
            smallDelta: 1,
            largeDelta: 1,
            constraints: { min: 0, max: 59, places: 0 },
            required: true,
            trim: true,
            onChange: function() {
                AOICoordinatesViewController.onLongitudeChange(dijit.byId('upperRightLongitudeDegrees'), this,
                    dijit.byId('upperRightLongitudeSeconds'));
                AOICoordinatesViewController.checkCornerCoordinatesFormReady();
            }
        }).domNode);

        let upperRightLongitudeSecondsInput = domConstruct.create('div', {style: 'display:inline-block;'});
        upperRightLongitudeSecondsInput.appendChild(domConstruct.create('label', {innerHTML: '"', class: 'aoiCoordinatesLabel'}));
        upperRightLongitudeSecondsInput.appendChild(new NumberSpinner({
            id: 'upperRightLongitudeSeconds',
            class: 'latLongInput',
            smallDelta: 1,
            largeDelta: 1,
            constraints: { min: 0, max: 59, places: 0 },
            required: true,
            trim: true,
            onChange: function() {
                AOICoordinatesViewController.onLongitudeChange(dijit.byId('upperRightLongitudeDegrees'),
                    dijit.byId('upperRightLongitudeMinutes'), this);
                AOICoordinatesViewController.checkCornerCoordinatesFormReady();
            }
        }).domNode);

        let upperRightLongitudeDirectionInput = domConstruct.create('div', {style: 'display:inline-block;'});
        upperRightLongitudeDirectionInput.appendChild(new Select({
            id: 'upperRightLongitudeDirection',
            class: 'latLongInput',
            options: [
                {label: 'W', value: 'W'},
                {label: 'E', value: 'E'}
            ]
        }).domNode);

        upperRightLongitudeInputContainer.appendChild(upperRightLongitudeDegreesInput);
        upperRightLongitudeInputContainer.appendChild(upperRightLongitudeMinutesInput);
        upperRightLongitudeInputContainer.appendChild(upperRightLongitudeSecondsInput);
        upperRightLongitudeInputContainer.appendChild(upperRightLongitudeDirectionInput);

        aoiCornerCoordinatesContainer.domNode.appendChild(upperRightLatitudeInputContainer);
        aoiCornerCoordinatesContainer.domNode.appendChild(upperRightLongitudeInputContainer);

        /************************** SUBMIT SECTION *****************************/
        /***********************************************************************/
        let submitCornerCoordinatesDiv = domConstruct.create('div', {style: 'margin-top:25px; padding: 5px; text-align:center;'});
        submitCornerCoordinatesDiv.appendChild(new Button({
            id: 'resetCornerCoordinatesBtn',
            label: 'Reset',
            class: 'secondaryAppBtn',
            onClick: AOICoordinatesViewController.onCornerCoordinatesFormReset
        }).domNode);

        submitCornerCoordinatesDiv.appendChild(new Button({
            id: 'submitCornerCoordinatesBtn',
            label: 'OK',
            class: 'disabledAppBtn',
            disabled: true,
            onClick: AOICoordinatesViewController.onCornerCoordinatesFormSubmit
        }).domNode);
        aoiCornerCoordinatesContainer.domNode.appendChild(submitCornerCoordinatesDiv);

        return aoiCornerCoordinatesContainer;
    }

    /**
     * Renders the form and associated components for specifying AOI coordinates
     * using MGRS.
     * @returns Dijit ContentPane
     */
    function renderMGRSCoordinatesForm() {
        let aoiMGRSCoordinatesContainer = new ContentPane({
            class: 'aoiCoordinatesFormContainer',
            title: 'MGRS'
        });

        /************************************* Grid Reference SECTION ****************************************/
        /*************************************************************************************************/
        let gridReferenceLabelDiv = domConstruct.create('div', {style:'padding: 5px; margin-bottom:5px; background-color:#411145; text-align:center;'});
        gridReferenceLabelDiv.appendChild(domConstruct.create('label', {innerHTML: 'Grid Reference', style: 'color:white; font-size:small;'}));
        aoiMGRSCoordinatesContainer.domNode.appendChild(gridReferenceLabelDiv);

        let gridReferenceExampleLabelDiv = domConstruct.create('div', {style:'padding: 1px; margin-bottom:2px; text-align:center;'});
        gridReferenceExampleLabelDiv.appendChild(domConstruct.create('h3', {innerHTML: 'Example (e.g. Honolulu, HI)'}));
        aoiMGRSCoordinatesContainer.domNode.appendChild(gridReferenceExampleLabelDiv);

        let gridReferenceExampleWrapper = domConstruct.create('div', {style: 'margin-bottom:15px; text-align:center;'});
        let gridReferenceExampleDiv = domConstruct.create('div', {style: 'background-color: beige; padding:15px; border: 1px solid grey; font-size:small; display:inline-block;'});
        gridReferenceExampleDiv.appendChild(domConstruct.create('p', {innerHTML: '4QFJ16&nbsp(10km)<br>4QFJ1267&nbsp&nbsp(1km)<br>4QFJ123678&nbsp&nbsp(100m)<br>' +
                '4QFJ12346789&nbsp&nbsp(10m)<br>4QFJ1234567890&nbsp&nbsp(1m)'}));
        gridReferenceExampleWrapper.appendChild(gridReferenceExampleDiv);
        aoiMGRSCoordinatesContainer.domNode.appendChild(gridReferenceExampleWrapper);

        let gridReferenceInputContainer = domConstruct.create('div', {style: 'text-align:center; margin-bottom:15px;'});
        gridReferenceInputContainer.appendChild(domConstruct.create('label', {innerHTML: 'Reference'}));
        gridReferenceInputContainer.appendChild(new ValidationTextBox({
            id: 'gridReference',
            placeHolder: 'Define an MGRS grid reference...',
            regExp: '\\d{1,2}[^ABIOYZ]{3}(\\d{10}|\\d{8}|\\d{6}|\\d{4}|\\d{2})',
            invalidMessage: 'The value is not a valid MGRS reference!',
            style: 'padding:5px; width: 200px; font-size:small; margin-left: 10px;',
            onChange: AOICoordinatesViewController.checkMGRSGridReferenceFormReady
        }).domNode);
        aoiMGRSCoordinatesContainer.domNode.appendChild(gridReferenceInputContainer);

        /************************** SUBMIT SECTION *****************************/
        /***********************************************************************/
        let submitGridReferenceDiv = domConstruct.create('div', {style: 'margin-top:25px; padding: 5px; text-align:center;'});
        submitGridReferenceDiv.appendChild(new Button({
            id: 'resetMGRSBtn',
            label: 'Reset',
            class: 'secondaryAppBtn',
            onClick: AOICoordinatesViewController.onMGRSGridReferenceFormReset
        }).domNode);

        submitGridReferenceDiv.appendChild(new Button({
            id: 'submitMGRSBtn',
            label: 'OK',
            class: 'disabledAppBtn',
            disabled: true,
            onClick: AOICoordinatesViewController.onMGRSGridReferenceFormSubmit
        }).domNode);
        aoiMGRSCoordinatesContainer.domNode.appendChild(submitGridReferenceDiv);

        return aoiMGRSCoordinatesContainer;
    }

    return declare(null, {
        /******************** Public properties ********************/

        /******************** Public constructor ************************/
        constructor: function (args) {
            aoiCoordinatesWidget = new Dialog({
                id: 'aoiCoordinatesWidget',
                title: 'Define AOI Coordinates',
                class: 'appModalDialog'
            });
            aoiCoordinatesWidget.set('content', renderCoordinatesTypeSelectorWrapper());
        },

        /******************** Public functions *********************/
        showCoordinatesWidget: function() {
            if (aoiCoordinatesWidget) {
                aoiCoordinatesWidget.show();
            }
        }
    });
});