/*
 * CriteriaFilter.js
 *
 * Defines visual components that compose the Criter Filter widget. This widget is used
 * to allow for export filtering using different filter parameters.
 */

define(['dojo/_base/declare',
        'dijit/dijit',
        'dojo/dom',
        'dojo/dom-construct',
        'dijit/Dialog',
        'dijit/form/Button',
        'app/widgets/filter/view/AcquisitionRangeFilter',
        'app/widgets/filter/view/ResolutionFilter',
        'app/widgets/filter/view/IncidenceAngleFilter',
        'app/widgets/filter/view/CloudCoverFilter',
        'app/widgets/filter/view/SnowCoverFilter',
        'app/widgets/filter/viewController/CriteriaFilterViewController'],
            function(declare, dijit, dom, domConstruct, Dialog,
                     Button, AcquisitionRangeFilter, ResolutionFilter,
                     IncidenceAngleFilter, CloudCoverFilter, SnowCoverFilter,
                     CriteriaFilterViewController) {

    /**
     * Defines the criteria filter components and adds them to the container div.
     * @return domNode
     */
    function renderCriteriaFilterComponents() {
        let criteriaFilterDiv = domConstruct.create('div');
        criteriaFilterDiv.appendChild(AcquisitionRangeFilter.renderAcquisitionRangeFilter());
        criteriaFilterDiv.appendChild(ResolutionFilter.renderResolutionFilter());
        criteriaFilterDiv.appendChild(IncidenceAngleFilter.renderIncidenceAngleFilter());
        criteriaFilterDiv.appendChild(CloudCoverFilter.renderCloudCoverFilter());
        criteriaFilterDiv.appendChild(SnowCoverFilter.renderSnowCoverFilter());

        let filterFormInputDiv = domConstruct.create('div', {style: 'text-align:center; margin-top:20px;'});
        filterFormInputDiv.appendChild(new Button({
            id: 'criteriaFilterReset',
            label: 'Reset',
            class: 'secondaryAppBtn',
            onClick: CriteriaFilterViewController.resetCriterFilter
        }).domNode);

        filterFormInputDiv.appendChild(new Button({
            id: 'criteriaFilterSubmit',
            label: 'OK',
            class: 'primaryAppBtn',
            onClick: CriteriaFilterViewController.submitCriteriaFilter
        }).domNode);
        criteriaFilterDiv.appendChild(filterFormInputDiv);

        return criteriaFilterDiv;
    }

    // Define the criteria filter window container and render all filter components
    let criteriaFilterWindow = new Dialog({
        id: 'criteriaFilter',
        title: 'Criteria Filter',
        style: 'width:700px;',
        class: 'appModalDialog'
    });
    criteriaFilterWindow.set('content', renderCriteriaFilterComponents());

    return {
        /**
         * Display the criteria filter window
         */
        showCriteriaFilter: function() {
            criteriaFilterWindow.show();
        }
    }
});