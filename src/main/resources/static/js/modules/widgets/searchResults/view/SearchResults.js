/*
 * SearchResults.js
 *
 * Defines visual components that compose the search results widget. The search results widget
 * is used to visualize all of the imagery available for export based on defined search criteria
 * i.e. (criteria filters, product filter, and AOI definitions.)
 */

define(['dojo/dom',
        'dojo/on',
        'dojo/dom-construct',
        'dijit/dijit'], function(dom, on, domConstruct, dijit) {

    return {
        /**
         * Renders the dom node that is used for the search results trigger button. The search results
         * trigger button shows/hides the search results widget.
         * @return domNode
         */
        renderSearchResultsBtn: function() {
            // Define search results trigger container and the search results trigger button
            let searchResultsDiv = domConstruct.create("div", {id: 'searchResultsDiv'});
            searchResultsDiv.setAttribute('title', 'Fetch Search Results');

            // We are using an SVG for the projects button. Creating an in-line SVG element with dom-construct
            // does not work, and we cannot work with <object> elements because onclick events are not allowed
            // on code-embeddable elements such as <object> elements. So we are forced to use the document to
            // create a clickable, styleable in-line SVG element.
            let searchResultsBtn = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            searchResultsBtn.setAttributeNS(null, 'x', '0');
            searchResultsBtn.setAttributeNS(null, 'y', '0');
            searchResultsBtn.setAttributeNS(null, 'width', '48');
            searchResultsBtn.setAttributeNS(null, 'height', '48');
            searchResultsBtn.setAttributeNS(null, 'viewBox', '0 0 24 24');
            searchResultsBtn.innerHTML = '<path class="mapFaceActions" d="M20.465 14.646c1.398 1.516-.156 3.949-2.146 3.227 1.462-.311 2.47-1.49 2.146-3.227zm-16.148 3.227c1.99.722 3.545-1.71 2.146-3.227.325 1.737-.683 2.916-2.146 3.227zm12.554-13.561c-.282-.764-1.01-1.312-1.871-1.312-1.298 0-2.313 1.244-1.904 2.582 1.111-.395 2.346-1.103 3.775-1.27zm7.129 11.688c0 2.761-2.238 5-5 5-4.039 0-4.156-4.123-7-4.123s-2.961 4.123-7 4.123c-2.762 0-5-2.239-5-5 0-2.135 1.535-4.567 3.941-8.821 1.908-3.372 4.754-1.26 6.815-.585.781.256 1.654.272 2.486 0 2.062-.674 4.908-2.787 6.815.585 2.408 4.254 3.943 6.686 3.943 8.821zm-16 0c0-1.654-1.346-3-3-3s-3 1.346-3 3 1.346 3 3 3 3-1.346 3-3zm5-2c0-.552-.447-1-1-1s-1 .448-1 1 .447 1 1 1 1-.448 1-1zm9 2c0-1.654-1.346-3-3-3s-3 1.346-3 3 1.346 3 3 3 3-1.346 3-3zm-13-13c-.861 0-1.589.548-1.871 1.312 1.429.168 2.664.875 3.775 1.27.409-1.338-.606-2.582-1.904-2.582z"/>';

            // Register the click event handler for the searchResultsBtn
            on(searchResultsBtn, 'click', function(evt) {
                console.log('This will trigger the search results widget window...');
            });

            searchResultsDiv.appendChild(searchResultsBtn);
            return searchResultsDiv;
        }
    }
});