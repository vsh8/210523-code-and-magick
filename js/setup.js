'use strict';

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


// Generate a random int number.
var randInt = function (n) {
  return Math.floor(n * Math.random());
};

// Get random item from the array.
var randChoice = function (items) {
  return items[randInt(items.length)];
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
var WIZARDS_NUMBER = 4;
var wizards = [];
for (var i = 0; i < WIZARDS_NUMBER; i++) {
  wizards.push(generateWizardData());
}

// Find and show the settings window.
var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

// Find the similar characters list block and the wizard template.
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

// Draw the wizards.
renderWizards(similarListElement, wizards, similarWizardTemplate);

// Show the similar characters block.
document.querySelector('.setup-similar').classList.remove('hidden');
