/*
 * AcquisitionRangeFilter.js
 *
 * Defines widget components that comprise the filter tool for filtering by product acquisition range
 */

define(['dojo/dom-construct',
        'dijit/TitlePane',
        'dijit/form/DateTextBox',
        'app/widgets/filter/viewController/CriteriaFilterViewController'], function(domConstruct, TitlePane, DateTextBox, CriteriaFilterViewController) {

    return {
        /**
         * Defines the acquisition range filter components, adds the components to a container, and
         * returns the container dom node.
         * @returns TitlePane domNode
         */
        renderAcquisitionRangeFilter: function() {
            //TODO: set validation for date inputs in AcquisitionRangeFilterViewController
            let acquisitionRangeFilter = new TitlePane({
                id: 'acquisitionRangeFilter',
                class: 'criteriaFilterSearchWidgets',
                title: 'Acquisition Range'
            });

            let acquisitionRangeFilterDiv = domConstruct.create('div');
            acquisitionRangeFilterDiv.appendChild(new DateTextBox({
                id: 'acquistionRangeBegin',
                class: 'acquisitionRangeDateBox',
                title: 'Acquisition Range (Begin)',
                placeHolder: 'Acquisition Range (Begin)',
                required: true,
                value: new Date(1970, 0, 1),
                rangeMessage: 'Selected date is out of valid range!',
                missingMessage: 'Begin date is required!',
                constraints: {
                    min: new Date(1970, 0, 1),
                    max: new Date()
                },
                onChange: CriteriaFilterViewController.validateAcquisitionRangeBeginDate
            }).domNode);

            acquisitionRangeFilterDiv.appendChild(domConstruct.create('span', {innerHTML: '-'}));

            acquisitionRangeFilterDiv.appendChild(new DateTextBox({
                id: 'acquisitionRangeEnd',
                class: 'acquisitionRangeDateBox',
                title: 'Acquisition Range (End)',
                placeHolder: 'Acquisition Range (End)',
                required: true,
                value: new Date(),
                rangeMessage: 'Selected date is out of valid range!',
                missingMessage: 'End date is required!',
                constraints: {
                    min: new Date(1970, 0, 1),
                    max: new Date()
                },
                onChange: CriteriaFilterViewController.validateAcquisitionRangeEndDate
            }).domNode);

            acquisitionRangeFilter.set('content', acquisitionRangeFilterDiv);

            return acquisitionRangeFilter.domNode;
        }
    }
});