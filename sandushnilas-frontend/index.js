import i11n from './i11n.js';

let currentLanguage = 'en';
let clientWidth = document.body.clientWidth;

const indentityLinkElement = document.getElementById('identity-link');
const projectivityLinkElement = document.getElementById('projectivity-link');
const contactivityLinkElement = document.getElementById('contactivity-link');

const languageSwitcherElement = document.getElementById('language-switcher');
const themeSwitcherElement = document.getElementById('theme-switcher');

window.addEventListener('resize', onWindowResize);
languageSwitcherElement.addEventListener('click', onLanguageSwitcherClick);
themeSwitcherElement.addEventListener('click', onThemeSwitcherClick);

function renderText() {
  if (clientWidth < 1024) {
    renderShortText();
  } else {
    renderLongText();
  }

  languageSwitcherElement.textContent =
    i11n[currentLanguage]['page-title-you-can'];

  document.title = languageSwitcherElement.textContent + ' ' + '💕';
}

function renderShortText() {
  indentityLinkElement.textContent =
    i11n[currentLanguage]['identity-link-short-text'];
  projectivityLinkElement.textContent =
    i11n[currentLanguage]['projectivity-link-short-text'];
  contactivityLinkElement.textContent =
    i11n[currentLanguage]['contactivity-link-short-text'];
}

function renderLongText() {
  indentityLinkElement.textContent =
    i11n[currentLanguage]['identity-link-long-text'];
  projectivityLinkElement.textContent =
    i11n[currentLanguage]['projectivity-link-long-text'];
  contactivityLinkElement.textContent =
    i11n[currentLanguage]['contactivity-link-long-text'];
}

function onWindowResize() {
  clientWidth = document.body.clientWidth;
  renderText();
}

function onLanguageSwitcherClick() {
  if (currentLanguage === 'en') {
    currentLanguage = 'ru';
  } else {
    currentLanguage = 'en';
  }

  renderText();
}

function onThemeSwitcherClick() {
  themeSwitcherElement.classList.toggle('mirror-x');
}

onWindowResize();
