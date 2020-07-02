//"use strict";
// Кнопка выпадающего меню //

var showNavigationLink = document.querySelector(".catalog-button");
var showNavigationLinkHover = document.querySelector(".catalog-button-hover");
var showNavigation = document.querySelector(".site-nav__sublist");

showNavigationLinkHover.classList.remove("catalog-button-hover");
showNavigationLink.addEventListener("click", function (evt) {
  evt.preventDefault();
  showNavigation.classList.toggle("sublist-visible");
});

// Сервис слайдер //

var servicesControls = document.querySelector(".services__controls");
var servicesLinks = document.querySelectorAll(".services__switch");
var servicesItems = document.querySelectorAll(".services__item");

servicesControls.addEventListener("click", function (evt) {
  evt.preventDefault();
  var target = evt.target;
  if (target.classList.contains("services__switch")) {
    for (var i = 0; i < servicesItems.length; i++) {
      servicesItems[i].classList.remove("services__item-show");
      servicesLinks[i].classList.remove("services__switch-active");
    }
    target.classList.add("services__switch-active");
    var currentItem = document.querySelector(".services__item-" + target.id);
    currentItem.classList.add("services__item-show");
  }
});

// Модальное окно обратной связи и карта //

var feedbackButton = document.querySelector(".feedback-button");
var linkMap = document.querySelector(".map");
var modalForm = document.querySelector(".modal-feedback");
var modalMap = document.querySelector(".modal-map");
var overlay = document.querySelector(".modal-overlay");
var formClose = modalForm.querySelector(".modal-close");
var mapClose = modalMap.querySelector(".modal-close");
var feedbackForm = modalForm.querySelector(".modal-feedback-form");
var modalFormName = modalForm.querySelector(".modal-feedback-form__input-name");
var modalFormEmail = modalForm.querySelector(".modal-feedback-form__input-email");
var modalFormComment = modalForm.querySelector(".modal-feedback-form__input-comment");
var fields = modalForm.querySelectorAll(".modal-feedback-form__input");

//Проверка локального хранилища//

var isStorageSupport = true;
var nameStorage = "";
var emailStorage = "";

try {
  nameStorage = localStorage.getItem("name");
  emailStorage = localStorage.getItem("email");
} catch(err) {
  isStorageSupport = false;
}

//Открытие модального окна и добавления overlay//

feedbackButton.addEventListener("click", function (evt) {
  evt.preventDefault();
  modalForm.classList.remove("modal-out");
  overlay.style.display = "block";
  modalForm.classList.add("modal-show");
  modalFormName.focus();
  if (nameStorage) {
    modalFormName.value = nameStorage;
    modalFormEmail.focus();
  }
  if (emailStorage) {
    modalFormEmail.value = emailStorage;
    modalFormComment.focus();
  }
});

//Закрытие модального окна//

formClose.addEventListener("click", function (evt) {
  evt.preventDefault();
  modalForm.classList.add("modal-out");
  setTimeout(function() {
    modalForm.classList.remove("modal-show");
    modalForm.classList.remove("modal-error");
    overlay.style.display = "";
  }, 800);
});

linkMap.addEventListener("click", function (evt) {
  evt.preventDefault();
  modalMap.classList.remove("modal-out");
  overlay.style.display = "block";
  modalMap.classList.add("modal-show");
});

mapClose.addEventListener("click", function (evt) {
  evt.preventDefault();
  modalMap.classList.add("modal-out");
  setTimeout(function() {
    modalMap.classList.remove("modal-show");
    overlay.style.display = "";
  }, 800);
});

//Проверка заполнения полей формы//

function checkName() {
  if(modalFormName.value){
    modalFormName.classList.remove("error");
  } else {
    modalFormName.classList.add("error");
  }
}

function checkEmail() {
  if(modalFormEmail.value){
    modalFormEmail.classList.remove("error");
  } else {
    modalFormEmail.classList.add("error");
  }
}

function checkComment() {
  if(modalFormComment.value){
    modalFormComment.classList.remove("error");
  } else {
    modalFormComment.classList.add("error");
  }
}

modalFormName.addEventListener("change", function(){
  checkName();
});

modalFormEmail.addEventListener("change", function(){
  checkEmail();
});

modalFormComment.addEventListener("change", function(){
  checkComment();
});

feedbackForm.addEventListener("submit", function (evt) {
  if (!modalFormName.value || !modalFormEmail.value || !modalFormComment.value) {
    evt.preventDefault();
    modalForm.classList.remove("modal-error");
    modalForm.offsetWidth = modalForm.offsetWidth;
    modalForm.classList.add("modal-error");
  } else {
    if (isStorageSupport) {
      localStorage.setItem("name", modalFormName.value);
      localStorage.setItem("email", modalFormEmail.value);
    }
  }

  checkName();
  checkEmail();
  checkComment();
});

//Закрытие модального окна клавишой ESC//

window.addEventListener("keydown", function(evt) {
  if (evt.keyCode === 27) {
    if (modalForm.classList.contains("modal-show")) {
      evt.preventDefault();
      modalForm.classList.add("modal-out");
      setTimeout(function() {
        modalForm.classList.remove("modal-show");
        modalForm.classList.remove("modal-error");
        overlay.style.display = "";
      }, 800);
    }
    if (modalMap.classList.contains("modal-show")) {
      evt.preventDefault();
      modalMap.classList.add("modal-out");
      setTimeout(function() {
        modalMap.classList.remove("modal-show");
        overlay.style.display = "";
      }, 800);
    }
  }
});
