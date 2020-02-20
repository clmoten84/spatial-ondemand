/*
 * CloudCoverFilter.js
 *
 * Defines widget components that comprise the filter tool for filtering by product cloud cover
 */

define(['dojo/dom-construct',
        'dijit/TitlePane',
        'dijit/form/NumberSpinner',
        'app/widgets/filter/viewController/CriteriaFilterViewController'],
            function(domConstruct, TitlePane, NumberSpinner, CriteriaFilterViewController) {

    return {
        /**
         * Defines the cloud cover filter components, adds the components to a container, and
         * returns the container dom node.
         * @returns TitlePane domNode
         */
        renderCloudCoverFilter: function() {
            let cloudCoverFilter = new TitlePane({
                id: 'cloudCoverFilter',
                class: 'criteriaFilterSearchWidgets',
                title: 'Cloud Cover (%)'
            });

            let cloudCoverFilterDiv = domConstruct.create('div');
            cloudCoverFilterDiv.appendChild(new NumberSpinner({
                id: 'cloudCoverInputFrom',
                class: 'filterNumberSpinnerInput',
                value: 0,
                smallDelta: 1,
                largeDelta: 1,
                constraints: { min: 0, max: 99, places: 0 },
                required: false,
                trim: true,
                onChange: CriteriaFilterViewController.validateCloudCoverFromVal
            }).domNode);

            cloudCoverFilterDiv.appendChild(domConstruct.create('span', {innerHTML: '-'}));

            cloudCoverFilterDiv.appendChild(new NumberSpinner({
                id: 'cloudCoverInputTo',
                class: 'filterNumberSpinnerInput',
                value: 100,
                smallDelta: 1,
                largeDelta: 1,
                constraints: { min: 1, max: 100, places: 0 },
                required: true,
                trim: true,
                onChange: CriteriaFilterViewController.validateCloudCoverToVal
            }).domNode);

            cloudCoverFilter.set('content', cloudCoverFilterDiv);
            return cloudCoverFilter.domNode;
        }
    }
});