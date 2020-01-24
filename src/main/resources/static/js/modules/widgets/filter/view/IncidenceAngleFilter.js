/*
 * IncidenceAngleFilter.js
 *
 * Defines widget components that comprise the filter tool for filtering by product incidence angle
 */

define(['dojo/dom-construct',
        'dijit/TitlePane',
        'dijit/form/NumberSpinner'], function(domConstruct, TitlePane, NumberSpinner) {

    return {
        /**
         * Defines the incidence angle filter components, adds the components to a container, and
         * returns the container dom node.
         * @returns TitlePane domNode
         */
        renderIncidenceAngleFilter: function() {
            let incidenceAngleFilter = new TitlePane({
                id: 'incidenceAngleFilter',
                class: 'criteriaFilterSearchWidgets',
                title: 'Incidence Angle (&#176;)'
            });

            let incidenceAngleFilterDiv = domConstruct.create('div');
            incidenceAngleFilterDiv.appendChild(new NumberSpinner({
                id: 'incidenceAngleInputFrom',
                class: 'filterNumberSpinnerInput',
                value: 0,
                smallDelta: 1,
                largeDelta: 1,
                constraints: { min: 0, max: 89, places: 0 },
                required: false,
                trim: true,
                onChange: function (newValue) {
                    // Validate value change
                    // if (newValue < 0 || newValue > 89) {
                    //     incidenceAngleFrom.set('value', 0);
                    // }
                    //
                    // if (newValue >= incidenceAngleTo.get('value')) {
                    //     incidenceAngleFrom.set('value', 0);
                    // }
                }
            }).domNode);

            incidenceAngleFilterDiv.appendChild(domConstruct.create('span', {innerHTML: '-'}));

            incidenceAngleFilterDiv.appendChild(new NumberSpinner({
                id: 'incidenceAngleInputTo',
                class: 'filterNumberSpinnerInput',
                value: 90,
                smallDelta: 1,
                largeDelta: 1,
                constraints: { min: 1, max: 90, places: 0 },
                required: false,
                trim: true,
                onChange: function (newValue) {
                    // Validate value change
                    // if (newValue < 1 || newValue > 90) {
                    //     incidenceAngleTo.set('value', 90);
                    // }
                    //
                    // if (newValue <= incidenceAngleFrom.get('value')) {
                    //     incidenceAngleTo.set('value', 90);
                    // }
                }
            }).domNode);

            incidenceAngleFilter.set('content', incidenceAngleFilterDiv);
            return incidenceAngleFilter.domNode;
        }
    }
});