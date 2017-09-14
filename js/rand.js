'use strict';

window.rand = (function () {
  return {
    // Generate a random integer number.
    randInt: function (n) {
      return Math.floor(n * Math.random());
    },

    // Get random item from the array.
    randChoice: function (items) {
      return items[window.rand.randInt(items.length)];
    },

    // Get random item not equal to the given one from the array.
    randChoiceNotEqualTo: function (items, prevValue) {
      var newValue = prevValue;
      while (newValue === prevValue) {
        newValue = window.rand.randChoice(items);
      }
      return newValue;
    }
  };
})();
