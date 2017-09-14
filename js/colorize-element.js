'use strict';

window.colorizeElement = function (element, colors, currentColorFunc, setColorFunc) {
  element.addEventListener('click', function (evt) {
    var newColor = window.rand.randChoiceNotEqualTo(
        colors, currentColorFunc(evt.target));
    setColorFunc(evt.target, newColor);
  });
};