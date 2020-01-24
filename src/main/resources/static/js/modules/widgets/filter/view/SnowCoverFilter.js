/*
 * SnowCoverFilter.js
 *
 * Defines widget components that comprise the filter tool for filtering by product snow cover
 */

define(['dojo/dom-construct',
        'dijit/TitlePane',
        'dijit/form/NumberSpinner'], function(domConstruct, TitlePane, NumberSpinner) {

    return {
        /**
         * Defines the snow cover filter components, adds the components to a container, and
         * returns the container dom node.
         * @returns TitlePane domNode
         */
        renderSnowCoverFilter: function() {
            let snowCoverFilter = new TitlePane({
                id: 'snowCoverFilter',
                class: 'criteriaFilterSearchWidgets',
                title: 'Snow Cover (%)'
            });

            let snowCoverFilterDiv = domConstruct.create('div');
            snowCoverFilterDiv.appendChild(new NumberSpinner({
                id: 'snowCoverInputFrom',
                class: 'filterNumberSpinnerInput',
                value: 0,
                smallDelta: 1,
                largeDelta: 1,
                constraints: { min: 0, max: 99, places: 0 },
                required: true,
                trim: true,
                onChange: function (newValue) {
                    // Validate value change
                    // if (newValue < 0 || newValue > 99) {
                    //     snowCoverFrom.set('value', 0);
                    // }
                    //
                    // if (newValue >= snowCoverTo.get('value')) {
                    //     snowCoverFrom.set('value', 0);
                    // }
                }
            }).domNode);

            snowCoverFilterDiv.appendChild(domConstruct.create('span', {innerHTML: '-'}));

            snowCoverFilterDiv.appendChild(new NumberSpinner({
                id: 'snowCoverInputTo',
                class: 'filterNumberSpinnerInput',
                value: 100,
                smallDelta: 1,
                largeDelta: 1,
                constraints: { min: 1, max: 100, places: 0 },
                required: true,
                trim: true,
                onChange: function (newValue) {
                    // Validate value change
                    // if (newValue < 1 || newValue > 100) {
                    //     snowCoverTo.set('value', 0);
                    // }
                    //
                    // if (newValue <= snowCoverFrom.get('value')) {
                    //     snowCoverTo.set('value', 0);
                    // }
                }
            }).domNode);

            snowCoverFilter.set('content', snowCoverFilterDiv);
            return snowCoverFilter.domNode;
        }
    }
});