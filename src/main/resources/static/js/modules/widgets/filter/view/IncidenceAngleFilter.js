/*
 * IncidenceAngleFilter.js
 *
 * Defines widget components that comprise the filter tool for filtering by product incidence angle
 */

define(['dojo/dom-construct',
        'dijit/TitlePane',
        'dijit/form/NumberSpinner',
        'app/widgets/filter/viewController/CriteriaFilterViewController'],
            function(domConstruct, TitlePane, NumberSpinner, CriteriaFilterViewController) {

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
                onChange: CriteriaFilterViewController.validateIncidenceAngleFromVal
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
                onChange: CriteriaFilterViewController.validateIncidenceAngleToVal
            }).domNode);

            incidenceAngleFilter.set('content', incidenceAngleFilterDiv);
            return incidenceAngleFilter.domNode;
        }
    }
});