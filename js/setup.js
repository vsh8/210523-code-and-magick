'use strict';

(function () {

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


  // Number of wizards to generate.
  var WIZARDS_NUMBER = 4;

  // Generate a random wizard name.
  var generateWizardName = function () {
    return window.rand.randChoice(WIZARD_FIRST_NAMES) + ' '
      + window.rand.randChoice(WIZARD_LAST_NAMES);
  };

  // Generate a random wizard descrition.
  var generateWizardData = function () {
    return {
      name: generateWizardName(),
      coatColor: window.rand.randChoice(window.colors.WIZARD_COAT_COLORS),
      eyesColor: window.rand.randChoice(window.colors.WIZARD_EYES_COLORS)
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
})();
