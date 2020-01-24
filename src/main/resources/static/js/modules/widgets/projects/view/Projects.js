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
        'dijit/dijit'], function(dom, domConstruct, on, dijit) {

    return {
        /**
         * Renders the dom node that is used for the projects trigger button. The projects
         * trigger button shows/hides the projects tool.
         * @return domNode
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
                console.log('This will trigger the projects tool...');
            });

            projectsDiv.appendChild(projectsBtn);
            return projectsDiv;
        }
    }
});