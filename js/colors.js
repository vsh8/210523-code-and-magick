'use strict';

window.colors = (function () {
  var componentToHex = function (c) {
    var hex = c.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return {
    WIZARD_COAT_COLORS: [
      'rgb(101, 137, 164)',
      'rgb(241, 43, 107)',
      'rgb(146, 100, 161)',
      'rgb(56, 159, 117)',
      'rgb(215, 210, 55)',
      'rgb(0, 0, 0)'
    ],

    WIZARD_EYES_COLORS: [
      'black',
      'red',
      'blue',
      'yellow',
      'green'
    ],

    FIREBALL_COLORS: [
      '#ee4830',
      '#30a8ee',
      '#5ce6c0',
      '#e848d5',
      '#e6e848',
    ],

    // Perform the RGB to hex color convertion.
    rgbToHex: function (rgbStr) {
      var componentsStr = rgbStr.match(/rgb\((.*)\)/)[1];
      var components = componentsStr.split(/, ?/);
      return '#' +
        componentToHex(parseInt(components[0], 10)) +
        componentToHex(parseInt(components[1], 10)) +
        componentToHex(parseInt(components[2], 10));
    }
  };
})();
