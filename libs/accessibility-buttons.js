/*!
*   Accessibility Buttons v3.1.2
*   http://tiagoporto.github.io/accessibility-buttons
*   Copyright (c) 2014-2017 Tiago Porto (http://tiagoporto.com)
*   Released under the MIT license
*/

"use strict";

/**
 * accessibilityButtons
 * @param  {Array}  -
 * @return
 */

/* exported accessibilityButtons */
var accessibilityButtons = function accessibilityButtons(options) {
  'use strict';

  /**
   * hasClass
   * @param  {string}  element - DOM element
   * @param  {string}  clazz   - Class Name
   * @return {Boolean}
   */

  function hasClass(element, clazz) {
    return " ".concat(element.className, " ").indexOf(" ".concat(clazz, " ")) > -1;
  }

  var setting = {
    font: {
      nameButtonIncrease: '+A',
      ariaLabelButtonIncrease: 'Increase Font',
      nameButtonDecrease: '-A',
      ariaLabelButtonDecrease: 'Decrease Font'
    },
    contrast: {
      nameButtonAdd: 'Add Contrast',
      ariaLabelButtonAdd: 'Add Contrast',
      nameButtonRemove: 'Remove Contrast',
      ariaLabelButtonRemove: 'Remove Contrast'
    }
  }; // Set buttons name and aria label

  if (options) {
    for (var key in options) {
      if (options.hasOwnProperty(key)) {
        var obj = options[key];

        for (var prop in obj) {
          if (obj.hasOwnProperty(prop)) {
            setting[key][prop] = obj[prop];
          }
        }
      }
    }
  }

  var $body = document.body,storageFont,storageContrast,
      $fontButton = document.getElementById('accessibility-font'),
      $contrastButton = document.getElementById('accessibility-contrast'),
      $accessibilityButtons = document.getElementsByClassName('js-accessibility');

  /*
  if(localStorage) {
      storageFont = localStorage.accessibility_font;
      storageContrast = localStorage.accessibility_contrast; // Check if exist storage and set the correct button names and aria attributes
  }
*/

  if (storageFont && $fontButton) {
    $body.classList.add('accessibility-font');
//    $fontButton.innerHTML = setting.font.nameButtonDecrease;
    $fontButton.setAttribute('aria-label', setting.font.ariaLabelButtonDecrease);
  } else if ($fontButton) {
//    $fontButton.innerHTML = setting.font.nameButtonIncrease;
    $fontButton.setAttribute('aria-label', setting.font.ariaLabelButtonIncrease);
  }

  if (storageContrast && $contrastButton) {
    $body.classList.add('accessibility-contrast');
//    $contrastButton.innerHTML = setting.contrast.nameButtonRemove;
    $contrastButton.setAttribute('aria-label', setting.contrast.ariaLabelButtonRemove);
  } else if ($contrastButton) {
//    $contrastButton.innerHTML = setting.contrast.nameButtonAdd;
    $contrastButton.setAttribute('aria-label', setting.contrast.ariaLabelButtonAdd);
  }
  /**
   * Get the click event
   * Rename the buttons
   * Apply/Remove Contrast or Font Size
   * Manage storage
   */


  function accessibility() {

    return function () {
      var $this = this;

      if (hasClass($body, $this.getAttribute('id'))) {
        $body.classList.remove($this.getAttribute('id'));

        if ($this.getAttribute('id') === 'accessibility-font') {
    //      $this.innerHTML = setting.font.nameButtonIncrease;
    //      $this.setAttribute('aria-label', setting.font.ariaLabelButtonIncrease);
          localStorage.removeItem('accessibility_font');
        } else {
    //      $this.innerHTML = setting.contrast.nameButtonAdd;
    //      $this.setAttribute('aria-label', setting.contrast.ariaLabelButtonAdd);
          localStorage.removeItem('accessibility_contrast');
        }
          accessFont = false
          $("label").css({
              'font-size': '100%'
          });
          $("a, text").css({
              'font-size': '100%'
          });
          $("ul").css({
              'font-size': '100%'
          });
          $("tspan").css({
              'font-size': '100%'
          });
          $("h1, h2, h3, h4, h5").css({
              'font-size': '100%'
          });
          $(".top-bar").css({
              'height': '2.8rem'
          });
          $("#textAndSelect .switch-toggle").css({
              'width': '580px'
          });
          $(".top-bar input").css({
              'height': '1.75rem'
          });
      } else {
          accessFont = true
        $body.classList.add($this.getAttribute('id'));

          $("label").css({
              'font-size': '101%'
          });
          $("a, text").css({
              'font-size': '110%'
          });
          $("ul, td").css({
              'font-size': '102%'
          });
          $("tspan").css({
              'font-size': '102%'
          });
          $("h1, h2, h3, h4, h5").css({
              'font-size': '102%'
          });
          /*
          $("button ,.button").css({
              'font-size': '102%'
          });
          */
          $(".top-bar").css({
              'height': '3.7rem'
          });
          $(".top-bar input").css({
              'height': '2.75rem'
          });
          $("#textAndSelect .switch-toggle").css({
              'width': '680px'
          });


          if ($this.getAttribute('id') === 'accessibility-font') {
          if (!storageFont) {
            localStorage.setItem('accessibility_font', true);
          }

 //         $this.innerHTML = setting.font.nameButtonDecrease;
 //         $this.setAttribute('aria-label', setting.font.ariaLabelButtonDecrease);
        } else {
          if (!storageContrast) {
            localStorage.setItem('accessibility_contrast', true);
          }

   //       $this.innerHTML = setting.contrast.nameButtonRemove;
   //       $this.setAttribute('aria-label', setting.contrast.ariaLabelButtonRemove);
        }
      }
        if(window.PAGE.TYPE === "bars") {
            HankeVisBar.update();
        } else if (window.PAGE.TYPE === "circles") {
            color_by()
        } else if(window.PAGE.TYPE === "map") {
            MapVis.start()
        } else if(window.PAGE.TYPE === "table") {
            TableVis.start()
        }
    };
  } // Listening Click Event


  for (var i = 0; i < $accessibilityButtons.length; i++) {
    $accessibilityButtons[i].addEventListener('click', accessibility());
  }
};
function isEven(n) {
    return n % 2 == 0;
}
