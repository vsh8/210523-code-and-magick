'use strict';

(function () {
  var setupElement = document.querySelector('.setup');
  var setupOpenElement = document.querySelector('.setup-open');
  var setupCloseElement = setupElement.querySelector('.setup-close');
  var setupSubmitElement = setupElement.querySelector('.setup-submit');
  var userNameInput = setupElement.querySelector('.setup-user-name');

  var setupElementOrigX;
  var setupElementOrigY;

  var onPopupEscPress = function (evt) {
    if (evt.target !== userNameInput) {
      window.util.isEscEvent(evt, closePopup);
    }
  };

  var onPopupCloseKeyPress = function (evt) {
    window.util.isEnterEvent(evt, closePopup);
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

  var getElementColor = function (element) {
    return element.style.fill;
  };

  var fillElement = function (element, color) {
    element.style.fill = color;
  };

  var getElementBackgroundColor = function (element) {
    var backgroundColor = element.style.backgroundColor ||
        window.getComputedStyle(fireballElement, null).getPropertyValue('background-color');
    return window.colors.rgbToHex(backgroundColor);
  };

  var changeElementBackgroundColor = function (element, color) {
    element.style.backgroundColor = color;
  };

  window.colorizeElement(
      wizardCoatElement, window.colors.WIZARD_COAT_COLORS, getElementColor, fillElement);
  window.colorizeElement(
      wizardEyesElement, window.colors.WIZARD_EYES_COLORS, getElementColor, fillElement);
  window.colorizeElement(
      fireballElement, window.colors.FIREBALL_COLORS, getElementBackgroundColor, changeElementBackgroundColor);


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


  var shopElement = document.querySelector('.setup-artifacts-shop');
  var draggedItem = null;

  var artifactsElement = document.querySelector('.setup-artifacts');

  var onShopElementDragStart = function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem = evt.target;
      evt.dataTransfer.setData('text/plain', evt.target.alt);

      artifactsElement.style.outline = '2px dashed red';
    }
  };

  var onShopElementDragEnd = function () {
    artifactsElement.style.outline = '';
  };

  var onArtifactsElementDragOver = function (evt) {
    evt.preventDefault();

    return false;
  };

  var onArtifactsElementDrop = function (evt) {
    evt.target.style.backgroundColor = '';
    evt.target.appendChild(draggedItem);
    evt.preventDefault();

    artifactsElement.style.outline = '';
  };

  var onArtifactsElementDragEnter = function (evt) {
    evt.target.style.backgroundColor = 'yellow';
    evt.preventDefault();
  };

  var onArtifactsElementDragLeave = function (evt) {
    evt.target.style.backgroundColor = '';
    evt.preventDefault();
  };


  var openPopup = function () {
    if (typeof setupElementOrigX === 'undefined') {
      setupElement.classList.remove('hidden');

      setupElementOrigX = setupElement.offsetLeft;
      setupElementOrigY = setupElement.offsetTop;
    } else {
      setupElement.style.left = setupElementOrigX + 'px';
      setupElement.style.top = setupElementOrigY + 'px';

      setupElement.classList.remove('hidden');
    }

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

    dialogHandleElement.addEventListener('mousedown', onDialogHandleMouseDown);

    shopElement.addEventListener('dragstart', onShopElementDragStart);
    shopElement.addEventListener('dragend', onShopElementDragEnd);

    artifactsElement.addEventListener('dragover', onArtifactsElementDragOver);
    artifactsElement.addEventListener('drop', onArtifactsElementDrop);
    artifactsElement.addEventListener('dragenter', onArtifactsElementDragEnter);
    artifactsElement.addEventListener('dragleave', onArtifactsElementDragLeave);
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

    dialogHandleElement.removeEventListener('mousedown', onDialogHandleMouseDown);

    shopElement.removeEventListener('dragstart', onShopElementDragStart);
    shopElement.removeventListener('dragend', onShopElementDragEnd);

    artifactsElement.removeEventListener('dragover', onArtifactsElementDragOver);
    artifactsElement.removeEventListener('drop', onArtifactsElementDrop);
    artifactsElement.removeEventListener('dragenter', onArtifactsElementDragEnter);
    artifactsElement.removeEventListener('dragleave', onArtifactsElementDragLeave);
  };

  setupOpenElement.addEventListener('click', openPopup);

  setupOpenElement.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openPopup);
  });
})();
