/*
 * Projects.js
 *
 * Defines the visual components that compose the projects tool. The projects tool allows
 * users to save search criteria (i.e. criteria filters, product filters, and AOI definitions
 * for future recall, making it easier to recall previous export jobs, etc.
 */

define(['dojo/dom',
        'dojo/dom-construct',
        'dojo/on',
        'dijit/dijit',
        'dijit/Dialog',
        'dijit/form/RadioButton',
        'dijit/form/Button'], function(dom, domConstruct, on, dijit, Dialog, RadioButton, Button) {

    /**
     * Defines the header for the Projects tool. The header contains actions to take for filtering
     * and creating new Projects.
     */
    function renderProjectsHeader() {
        let projectsHeaderDiv = domConstruct.create("div", {style: 'border-bottom: 1px solid #411145; padding-bottom:5px;'});

        // Project Filter
        let projectFilterDiv = domConstruct.create("div", {style: 'margin-right:8px; display:inline-block;'});
        let projectFilterForm = domConstruct.create("form", {id: 'projectFilterForm', style: 'font-size:small;'});

        let iOwnFilterDiv = domConstruct.create("div", {style: 'margin-right:5px; display:inline-block;'});
        iOwnFilterDiv.appendChild(domConstruct.create('label', {innerHTML: 'I own:', style: 'margin-right:2px; display:inline-block;', for: 'iOwnRadio'}));
        iOwnFilterDiv.appendChild(new RadioButton({
            id: 'iOwnRadio',
            checked: true,
            title: 'View projects I own'
        }).domNode);

        let sharedFilterDiv = domConstruct.create("div", {style: 'display:inline-block;'});
        sharedFilterDiv.appendChild(domConstruct.create('label', {innerHTML: 'Shared w/ me:', style: 'margin-right:2px; display:inline-block;', for: 'sharedRadio'}));
        sharedFilterDiv.appendChild(new RadioButton({
            id: 'sharedRadio',
            checked: false,
            title: 'View projects shared with me'
        }).domNode);

        projectFilterForm.appendChild(iOwnFilterDiv);
        projectFilterForm.appendChild(sharedFilterDiv);
        projectFilterDiv.appendChild(projectFilterForm);

        // Create Project
        let projectCreateDiv = domConstruct.create("div", {style: 'display:inline-block;'});
        projectCreateDiv.appendChild(new Button({
            id: 'createNewProjectBtn',
            label: 'Create Project',
            showLabel: false,
            iconClass: 'dijitIconNewTask',
            onClick: function() {
                console.log('Use REST to create new project...');
            }
        }).domNode);

        projectsHeaderDiv.appendChild(projectFilterDiv);
        projectsHeaderDiv.appendChild(projectCreateDiv);
        return projectsHeaderDiv;
    }

    /**
     * Defines and renders the components for the Projects tool
     */
    function renderProjectsToolComponents() {
        let projectsToolDiv = domConstruct.create("div", {style: 'padding:4px;'});
        projectsToolDiv.appendChild(renderProjectsHeader());

        return projectsToolDiv;
    }

    // Projects Tool window
    let projectsToolWindow = new Dialog({
        id: 'projectsTool',
        title: 'Projects',
        class: 'appNonModalDialog'
    });
    projectsToolWindow.focus = function() {}; // This is a hack to prevent the dialog from requesting focus
    projectsToolWindow.set('content', renderProjectsToolComponents());

    return {
        /**
         * Renders the dom node that is used for the projects trigger button. The projects
         * trigger button shows/hides the projects tool.
         * @return div domNode
         */
        renderProjectsBtn: function() {
            // Define the projects trigger container and the projects trigger button
            let projectsDiv = domConstruct.create("div", {id: 'projectsDiv'});
            projectsDiv.setAttribute('title', 'View Projects');

            // We are using an SVG for the projects button. Creating an in-line SVG element with dom-construct
            // does not work, and we cannot work with <object> elements because onclick events are not allowed
            // on code-embeddable elements such as <object> elements. So we are forced to use the document to
            // create a clickable, styleable in-line SVG element.
            let projectsBtn = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            projectsBtn.setAttributeNS(null, 'x', '0');
            projectsBtn.setAttributeNS(null, 'y', '0');
            projectsBtn.setAttributeNS(null, 'width', '48');
            projectsBtn.setAttributeNS(null, 'height', '48');
            projectsBtn.setAttributeNS(null, 'viewBox', '0 0 24 24');
            projectsBtn.innerHTML = "<path class=\"mapFaceActions\" d=\"M5.607 8h12.787l.606 1h-14l.607-1zm10.359-4h-7.931l-.607 1h9.145l-.607-1zm-9.145 2l-.607 1h11.573l-.607-1h-10.359zm17.179 3.986v13.014h-24v-13.014l5.477-8.986h13.069l5.454 8.986zm-8 4.014c0-.552-.447-1-1-1h-6c-.553 0-1 .448-1 1s.447 1 1 1h6c.553 0 1-.448 1-1zm5.669-4l-4.249-7h-10.82l-4.266 7h19.335z\"/>";

            // Register the click event handler for the projectsBtn
            on(projectsBtn, "click", function(e) {
                if (projectsToolWindow.open) {
                    projectsToolWindow.hide();
                }
                else {
                    projectsToolWindow.show();
                }
            });

            projectsDiv.appendChild(projectsBtn);
            return projectsDiv;
        }
    }
});