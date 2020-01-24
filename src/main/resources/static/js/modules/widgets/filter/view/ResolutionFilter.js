/*
 * ResolutionFilter.js
 *
 * Defines widget components that comprise the filter tool for filtering by product resolution
 */

define(['dojo/dom-construct',
        'dijit/TitlePane',
        'dijit/form/NumberSpinner'], function(domConstruct, TitlePane, NumberSpinner) {

    return {
        /**
         * Defines the imagery resolution filter components, adds the components to a container, and
         * returns the container dom node.
         * @returns TitlePane domNode
         */
        renderResolutionFilter: function() {
            let resolutionFilter = new TitlePane({
                id: 'resolutionFilter',
                class: 'criteriaFilterSearchWidgets',
                title: 'Resolution (m)'
            });

            let resolutionFilterDiv = domConstruct.create('div');
            resolutionFilterDiv.appendChild(new NumberSpinner({
                id: 'resolutionFilterInputFrom',
                class: 'filterNumberSpinnerInput',
                value: 0,
                smallDelta: 1,
                largeDelta: 1,
                constraints: { min: 0, max: 5999, places: 0 },
                required: true,
                trim: true,
                onChange: function(newValue) {
                    // Validate value change
                    // if (newValue < 0 || newValue > 5999) {
                    //     resolutionFrom.set('value', 0);
                    // }
                    //
                    // if (newValue >= resolutionTo.get('value')) {
                    //     resolutionFrom.set('value', 0);
                    // }
                }
            }).domNode);

            resolutionFilterDiv.appendChild(domConstruct.create('span', {innerHTML: '-'}));

            resolutionFilterDiv.appendChild(new NumberSpinner({
                id: 'resolutionFilterInputTo',
                class: 'filterNumberSpinnerInput',
                value: 6000,
                smallDelta: 1,
                largeDelta: 1,
                constraints: { min: 1, max: 6000, places: 0 },
                required: true,
                trim: true,
                onChange: function(newValue) {
                    // Validate value change
                    // if (newValue < 1 || newValue > 6000) {
                    //     resolutionTo.set('value', 6000);
                    // }
                    //
                    // if (newValue <= resolutionFrom.get('value')) {
                    //     resolutionTo.set('value', 6000);
                    // }
                }
            }).domNode);

            resolutionFilter.set('content', resolutionFilterDiv);
            return resolutionFilter.domNode;
        }
    }
});