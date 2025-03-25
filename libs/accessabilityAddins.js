/**
 * Created by Roope on 20.10.2020.
 */



var focusedElementBeforeModal = null;
var focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';


$(document).on('click', '[data-reveal-id]', function() {

    focusedElementBeforeModal = document.activeElement;

});

$(document).on('closed.fndtn.reveal', '[data-reveal]', function() {
    var modal = this;
    var modal_id = modal.id;
//    modal.setAttribute("tabindex", "-1");

    modal.setAttribute("aria-hidden", true);
    setLastFocusedElement();
  //  removeTabHandler(modal);
    modal.querySelector('.close-reveal-button').removeEventListener('click', modalCloseClick);

});

function setLastFocusedElement() {

    if (focusedElementBeforeModal) {
        focusedElementBeforeModal.focus();
        focusedElementBeforeModal = null;
    }
}

$(document).on('opened.fndtn.reveal', '[data-reveal]', function() {
    var modal = this;
    // tabindex can probably be removed
    //  modal.setAttribute("tabindex", "-1");
    modal.setAttribute("aria-hidden", false);
    createTabHandler(modal);
    var inputs = modal.querySelectorAll(focusableElementsString);
    var firstInput = inputs[0];
    firstInput.focus();
//    modal.focus();
    modal.querySelector('.close-reveal-button').addEventListener('click', modalCloseClick.bind(modal));
});

var lastFocusedElement;

function modalCloseClick(event) {
    var modal = this;
    modal.querySelector('.close-reveal-modal').click();
    //      lastFocusedElement.focus();
}

//
// Seems we do need a tab handler for modal key trapping
//
function createTabHandler(modal) {
    var inputs = modal.querySelectorAll(focusableElementsString);
    var firstInput = inputs[0];
    var lastInput = inputs[inputs.length - 1];

    /*set focus on first input*/
    firstInput.focus();

    /*redirect last tab to first input*/
    lastInput.addEventListener('keydown', function(e) {
        if ((e.which === 9 && !e.shiftKey)) {
            e.preventDefault();
            firstInput.focus();
        }
    });

    /*redirect first shift+tab to last input*/
    firstInput.addEventListener('keydown', function(e) {
        if ((e.which === 9 && e.shiftKey)) {
            e.preventDefault();
            lastInput.focus();
        }
    });
}

$(document).ready(function() {
    accessibilityButtons()
    $('.translate').each(function () {
        var that = $(this);

        var str = that.html();
        str = $.trim(str);
        str = str.replace(/(\r\n|\n|\r)/gm, '');
        str = _(str);
        that.html(str);
    });



})
