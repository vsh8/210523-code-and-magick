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
var setupElement = document.querySelector('.setup');
var setupOpenElement = document.querySelector('.setup-open');
var setupCloseElement = setupElement.querySelector('.setup-close');
var setupSubmitElement = setupElement.querySelector('.setup-submit');
var userNameInput = setupElement.querySelector('.setup-user-name');

var onPopupEscPress = function (evt) {
  if (evt.target !== userNameInput && evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var onPopupCloseKeyPress = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
};

var onUserNameInvalidData = function (evt) {
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
};

var onUserNameInputData = function (evt) {
  var target = evt.target;
  if (target.value.length < 2) {
    target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else {
    target.setCustomValidity('');
  }
};

var setupWizardElement = document.querySelector('.setup-wizard');
var wizardCoatElement = setupWizardElement.querySelector('.wizard-coat');
var wizardEyesElement = setupWizardElement.querySelector('.wizard-eyes');
var fireballElement = document.querySelector('.setup-fireball-wrap');

var onWizardCoatClick = function (evt) {
  evt.target.style.fill = randChoiceNotEqualTo(
      WIZARD_COAT_COLORS, evt.target.style.fill);
};

var onWizardEyesClick = function (evt) {
  evt.target.style.fill = randChoiceNotEqualTo(
      WIZARD_EYES_COLORS, evt.target.style.fill);
};

var onFireballClick = function (evt) {
  var currentColor = evt.target.style.backgroundColor ||
      window.getComputedStyle(fireballElement, null).getPropertyValue('background-color');

  evt.target.style.backgroundColor = randChoiceNotEqualTo(
      FIREBALL_COLORS, rgbToHex(currentColor));
};


var dialogHandleElement = setupElement.querySelector('.setup-title');

var onDialogHandleMouseDown = function (evt) {
  if (evt.target !== userNameInput) {
    evt.preventDefault();
  }

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  // Move dialog on mouse move.
  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    setupElement.style.left = (setupElement.offsetLeft - shift.x) + 'px';
    setupElement.style.top = (setupElement.offsetTop - shift.y) + 'px';
  };

  // Remove mouse event listeners on mouse up.
  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
};

var openPopup = function () {
  setupElement.classList.remove('hidden');

  document.addEventListener('keydown', onPopupEscPress);

  // Setup popup closing.
  setupCloseElement.addEventListener('click', closePopup);
  setupCloseElement.addEventListener('keydown', onPopupCloseKeyPress);
  setupSubmitElement.addEventListener('click', closePopup);
  setupSubmitElement.addEventListener('keydown', onPopupCloseKeyPress);

  // Customize name input validation.
  userNameInput.addEventListener('invalid', onUserNameInvalidData);
  // Implement minlength behavior for the Edge browser.
  userNameInput.addEventListener('input', onUserNameInputData);

  // Change wizard coat's color by click.
  wizardCoatElement.addEventListener('click', onWizardCoatClick);
  // Change wizard eyes' color by click.
  wizardEyesElement.addEventListener('click', onWizardEyesClick);
  // Change fireball's color by click.
  fireballElement.addEventListener('click', onFireballClick);

  dialogHandleElement.addEventListener('mousedown', onDialogHandleMouseDown);
};

var closePopup = function () {
  setupElement.classList.add('hidden');

  document.removeEventListener('keydown', onPopupEscPress);

  setupCloseElement.removeEventListener('click', closePopup);
  setupCloseElement.removeEventListener('keydown', onPopupCloseKeyPress);
  setupSubmitElement.removeEventListener('click', closePopup);
  setupSubmitElement.removeEventListener('keydown', onPopupCloseKeyPress);

  userNameInput.removeEventListener('invalid', onUserNameInvalidData);
  userNameInput.removeEventListener('input', onUserNameInputData);

  wizardCoatElement.removeEventListener('click', onWizardCoatClick);
  wizardEyesElement.removeEventListener('click', onWizardEyesClick);
  fireballElement.removeEventListener('click', onFireballClick);

  dialogHandleElement.removeEventListener('mousedown', onDialogHandleMouseDown);
};

setupOpenElement.addEventListener('click', openPopup);

setupOpenElement.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});
