import i11n from './i11n.js';

let currentLanguage = 'en';
let clientWidth = document.body.clientWidth;
let titleOffset = 0;

const logoComponent = document.getElementById('logo');

const indentityLinkElement = document.getElementById('identity-link');
const projectivityLinkElement = document.getElementById('projectivity-link');
const contactivityLinkElement = document.getElementById('contactivity-link');

const languageSwitcherElement = document.getElementById('language-switcher');
const themeSwitcherElement = document.getElementById('theme-switcher');

const contactivityPageElement = document.getElementById('contactivity-page');
const identityPageElement = document.getElementById('identity-page');
const projectivityPageElement = document.getElementById('projectivity-page');
const navPageElement = document.getElementById('nav-page');
const theBurdenPageElement = document.getElementById('theBurden-page');

const videoElement = document.getElementById('video');
const headerElement = document.querySelector('header');

const theBurdenProjectElement = document.getElementById('theBurden-project');

const pages = {
  contactivity: contactivityPageElement,
  identity: identityPageElement,
  projectivity: projectivityPageElement,
  nav: navPageElement,
  theBurden: theBurdenPageElement,
};

window.addEventListener('resize', onWindowResize);
window.addEventListener('popstate', onPopState);
window.addEventListener('click', onWindowClick, {
  once: true,
});

languageSwitcherElement.addEventListener('click', onLanguageSwitcherClick);
themeSwitcherElement.addEventListener('click', onThemeSwitcherClick);
logoComponent.addEventListener('click', onLogoClick);

for (const pageLinkElement of document.querySelectorAll('nav .nav-link')) {
  pageLinkElement.addEventListener('click', onPageLinkClick);
}

theBurdenProjectElement.addEventListener(
  'click',
  onTheBurdenProjectElementClick
);

onWindowResize();
renderPage(getCurrentPage());

function renderText() {
  if (clientWidth < 1024) {
    renderShortText();
  } else {
    renderLongText();
  }

  const pageTitle = i11n[currentLanguage]['page-title'].split(',');

  languageSwitcherElement.textContent =
    pageTitle[titleOffset % pageTitle.length];

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

  titleOffset++;

  renderText();
}

function onThemeSwitcherClick() {
  themeSwitcherElement.classList.toggle('mirror-x');
  document.body.classList.toggle('light');
}

function renderPage(page) {
  const url = new URL(window.location.href);
  let isUpdated = false;

  for (const [key, value] of Object.entries(pages)) {
    if (key === page) {
      value.classList.remove('hidden');
      isUpdated = true;
      continue;
    }

    value.classList.add('hidden');
  }

  if (!isUpdated) {
    pages['nav'].classList.remove('hidden');
    page = 'nav';
  }

  switch (page) {
    case 'nav':
      videoElement.classList.remove('hidden');
      headerElement.classList.remove('box-shadow');
      // videoElement.src = "nav.webm";
      break;

    default:
      // videoElement.pause();
      videoElement.classList.add('hidden');
      headerElement.classList.add('box-shadow');
      break;
  }

  if (page === getCurrentPage()) {
    return;
  }

  url.searchParams.set('page', page);

  history.pushState({}, '', url);
}

function getCurrentPage() {
  return new URL(window.location.href).searchParams.get('page') ?? 'nav';
}

function onPageLinkClick(event) {
  renderPage(event.target.id.split('-')[0]);
}

function onPopState() {
  renderPage(getCurrentPage());
}

function onWindowClick() {
  videoElement.play();
  videoElement.muted = true;
}

function onLogoClick() {
  renderPage();
}

function onTheBurdenProjectElementClick() {
  renderPage('theBurden');
}
