'use strict';

// Keycode constants.
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;


// Predefined data for random wizard generating.
var WIZARD_FIRST_NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var WIZARD_LAST_NAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

var WIZARD_COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var WIZARD_EYES_COLORS = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

var FIREBALL_COLORS = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848',
];

// Number of wizards to generate.
var WIZARDS_NUMBER = 4;


// Generate a random integer number.
var randInt = function (n) {
  return Math.floor(n * Math.random());
};

// Get random item from the array.
var randChoice = function (items) {
  return items[randInt(items.length)];
};

// Get random item not equal to the given one from the array.
var randChoiceNotEqualTo = function (items, prevValue) {
  var newValue = prevValue;
  while (newValue === prevValue) {
    newValue = randChoice(items);
  }
  return newValue;
};


// Perform the RGB to hex color convertion.
var componentToHex = function (c) {
  var hex = c.toString(16);
  return hex.length === 1 ? '0' + hex : hex;
};

var rgbToHex = function (rgbStr) {
  var componentsStr = rgbStr.match(/rgb\((.*)\)/)[1];
  var components = componentsStr.split(/, ?/);
  return '#' +
    componentToHex(parseInt(components[0], 10)) +
    componentToHex(parseInt(components[1], 10)) +
    componentToHex(parseInt(components[2], 10));
};


// Generate a random wizard name.
var generateWizardName = function () {
  return randChoice(WIZARD_FIRST_NAMES) + ' ' + randChoice(WIZARD_LAST_NAMES);
};

// Generate a random wizard descrition.
var generateWizardData = function () {
  return {
    name: generateWizardName(),
    coatColor: randChoice(WIZARD_COAT_COLORS),
    eyesColor: randChoice(WIZARD_EYES_COLORS)
  };
};


// Render the given wizard by his description.
var renderWizard = function (wizard, wizardTemplate) {
  var wizardElement = wizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};


// Render the given wizards to the specified block.
var renderWizards = function (containerBlock, wizards, wizardTemplate) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i], wizardTemplate));
  }
  containerBlock.appendChild(fragment);
};


// Generate 4 random wizards.
var wizards = [];
for (var i = 0; i < WIZARDS_NUMBER; i++) {
  wizards.push(generateWizardData());
}


// Find the similar characters list block and the wizard template.
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

// Draw the wizards.
renderWizards(similarListElement, wizards, similarWizardTemplate);


// Implement setup popup window opening and closing.
var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var userNameInput = setup.querySelector('.setup-user-name');

var onPopupEscPress = function (evt) {
  if (evt.target !== userNameInput && evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});


// Customize name input validation.
userNameInput.addEventListener('invalid', function (evt) {
  var target = evt.target;
  if (target.validity.tooShort) {
    target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (target.validity.tooLong) {
    target.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (target.validity.valueMissing) {
    target.setCustomValidity('Обязательное поле');
  } else {
    target.setCustomValidity('');
  }
});

// Implement minlength behavior for the Edge browser.
userNameInput.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length < 2) {
    target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else {
    target.setCustomValidity('');
  }
});


var setupWizardElement = document.querySelector('.setup-wizard');

// Change wizard coat's color by click.
var wizardCoatElement = setupWizardElement.querySelector('.wizard-coat');
wizardCoatElement.addEventListener('click', function (evt) {
  evt.target.style.fill = randChoiceNotEqualTo(
      WIZARD_COAT_COLORS, evt.target.style.fill);
});

// Change wizard eyes' color by click.
var wizardEyesElement = setupWizardElement.querySelector('.wizard-eyes');
wizardEyesElement.addEventListener('click', function (evt) {
  evt.target.style.fill = randChoiceNotEqualTo(
      WIZARD_EYES_COLORS, evt.target.style.fill);
});

// Change fireboll's color by click.
var fireballElement = document.querySelector('.setup-fireball-wrap');
fireballElement.addEventListener('click', function (evt) {
  var currentColor = evt.target.style.backgroundColor ||
      window.getComputedStyle(fireballElement, null).getPropertyValue('background-color');

  evt.target.style.backgroundColor = randChoiceNotEqualTo(
      FIREBALL_COLORS, rgbToHex(currentColor));
});
