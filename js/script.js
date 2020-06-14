'use strict';
// Кнопка выпадающего меню //

var showNavigationLink = document.querySelector('.catalog-button');
var showNavigationLinkHover = document.querySelector('.catalog-button-hover');
var showNavigation = document.querySelector('.site-nav__sublist');

showNavigationLinkHover.classList.remove('catalog-button-hover');
showNavigationLink.addEventListener('click', function (evt) {
  evt.preventDefault();
  showNavigation.classList.toggle('sublist-visible');
});

// Сервис слайдер //

var servicesControls = document.querySelector('.services__controls');
var servicesLinks = document.querySelectorAll('.services__switch');
var servicesItems = document.querySelectorAll('.services__item');

servicesControls.addEventListener('click', function (evt) {
  evt.preventDefault();
  var target = evt.target;
  if (target.classList.contains('services__switch')) {
    for (var i = 0; i < servicesItems.length; i++) {
      servicesItems[i].classList.remove('services__item-show');
      servicesLinks[i].classList.remove('services__switch-active');
    }
    target.classList.add('services__switch-active');
    var currentItem = document.querySelector('.services__item-' + target.id);
    currentItem.classList.add('services__item-show');
  }
});

// Модальное окно обратной связи и карта //

var linkForm = document.querySelector('.feedback-button');
var linkMap = document.querySelector('.map');
var modalForm = document.querySelector('.modal-feedback');
var modalMap = document.querySelector('.modal-map');
var formClose = modalForm.querySelector('.modal-close');
var mapClose = modalMap.querySelector('.modal-close');
var feedbackForm = modalForm.querySelector(".modal-feedback__form");
var modalFormName = modalForm.querySelector(".modal-feedback__form__input-name");
var modalFormEmail = modalForm.querySelector(".modal-feedback__form__input-email");
var modalFormComment = modalForm.querySelector(".modal-feedback__form__input-comment");

var isStorageSupport = true;
var storage = "";

try {
  storage = localStorage.getItem("email");
} catch (err) {
  isStorageSupport = false;
}
linkForm.addEventListener('click', function (evt) {
  evt.preventDefault();
  modalForm.classList.add('modal-show');
  modalFormName.focus();
});

formClose.addEventListener('click', function (evt) {
  evt.preventDefault();
  modalForm.classList.remove('modal-show');
  modalForm.classList.remove("modal-error");
});

linkMap.addEventListener('click', function (evt) {
  evt.preventDefault();
  modalMap.classList.add('modal-show');
});

mapClose.addEventListener('click', function (evt) {
  evt.preventDefault();
  modalMap.classList.remove('modal-show');
});

feedbackForm.addEventListener("submit", function (evt) {
  if (!modalFormName.value || !modalFormEmail.value || !modalFormComment.value) {
    evt.preventDefault();
    setTimeout(function () {
      modalForm.classList.remove("modal-error");
    }, 1000);
    modalForm.classList.add("modal-error");
  } else {
    if (isStorageSupport) {
      localStorage.setItem("email", modalFormEmail.value);
    }
  }
});

window.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (modalForm.classList.contains('modal-show')) {
      evt.preventDefault();
      modalForm.classList.remove('modal-show');
      modalForm.classList.remove("modal-error");
    }
    if (modalMap.classList.contains('modal-show')) {
      modalMap.classList.remove('modal-show');
    }
  }
});
