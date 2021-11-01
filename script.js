'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnOpenModal = document.querySelector('.btn--show-modal');
const navLinks = document.querySelector('.nav__links');
const navLink = document.querySelectorAll('.nav__link');
const learnMoreBtn = document.querySelector('.btn--text');
const sections = document.querySelectorAll('.section');
const imgs = document.querySelectorAll('.section img');
const tabContainer = document.querySelector('.operations__tab-container');
const buttons = tabContainer.querySelectorAll('button');

// --------- modal section ---------------
const openModalFunc = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModalFunc = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// open modal event listener
btnOpenModal.addEventListener('click', openModalFunc);

// close modal event listeners
// 1- close with icon
btnCloseModal.addEventListener('click', closeModalFunc);

// 2- close with esc
window.addEventListener('keydown', e => {
  if (e.code == 'Escape') {
    closeModalFunc();
  }
});

// 3- close with  click outside the modal
overlay.addEventListener('click', closeModalFunc);

// -------------- navbar focus ------------
navLinks.addEventListener('mouseover', e => {
  if (e.target.classList.contains('nav__link')) {
    navLink.forEach(value => {
      value.style.opacity = '0.5';
    });
    e.target.style.opacity = '1';
  }
});

navLinks.addEventListener('mouseout', e => {
  navLink.forEach(value => {
    value.style.opacity = '1';
  });
});

//-----------------section navbar link------------------

const smoothSectionFunc = function (e) {
  e.preventDefault();
  const target = document.querySelector(e.target.getAttribute('href'));
  target.scrollIntoView({
    behavior: 'smooth',
  });
};

navLinks.addEventListener('click', smoothSectionFunc);

// -----------------------learn more button ----------

learnMoreBtn.addEventListener('click', () => {
  document.querySelector('.section').scrollIntoView({ behavior: 'smooth' });
});

// ------ up component ---------

let observeCallBack = function (e) {
  let [trueInter] = e;

  if (trueInter.isIntersecting) {
    const target = trueInter.target;
    target.classList.remove('hidden');
    target.style.transform = 'translateY(0px)';
    observer.unobserve(target);
  }
};

let ObserveOption = {
  root: null,
  rootMargin: '0px',
  threshold: 0.2,
};

let observer = new IntersectionObserver(observeCallBack, ObserveOption);

sections.forEach(value => {
  value.classList.add('hidden');
  value.style.transform = 'translateY(150px)';
  observer.observe(value);
});

// -------- lazy loading ---------

const imgObserveFunc = function (e) {
  const [imgOE] = e;
  const mainImg = imgOE.target;

  if (!mainImg.classList.contains('features__img')) return;

  mainImg.src = mainImg.dataset.src;

  mainImg.addEventListener('load', () => {
    mainImg.classList.remove('lazy-img');
  });
};

const imgObserveOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1,
};

const imgObserver = new IntersectionObserver(imgObserveFunc, imgObserveOptions);

imgs.forEach(value => {
  imgObserver.observe(value);
});

// -------tabbed component--------
// tab container event
tabContainer.addEventListener('click', e => {
  // get equal button with content
  const content = document.querySelector(
    `.operations__content--${e.target.dataset.tab}`
  );

  // break function if we click on tab number
  if (!e.target.classList.contains('btn')) return;

  // remove tab active for all buttons
  buttons.forEach(v => {
    v.classList.remove('operations__tab--active');
  });

  // add active class for my target button
  e.target.classList.add('operations__tab--active');

  // remove all content activity
  document.querySelectorAll('.operations__content').forEach(v => {
    v.classList.remove('operations__content--active');
  });

  // add active class for my target content
  content.classList.add('operations__content--active');
});

// -------- slider component ------------

const sliderContainer = document.querySelector('.all-slide');
const slides = document.querySelectorAll('.slide');
const prevButton = document.querySelector('.slider__btn--left');
const nextButton = document.querySelector('.slider__btn--right');

function sliderComponent() {
  let counter = 0;
  let slideSize = slides[0].getBoundingClientRect().width;

  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * i}%)`;
  });

  const transferFunc = function (where) {
    if (where) {
      if (counter >= slides.length - 1) {
        counter = 0;
      } else {
        counter++;
      }

      sliderContainer.style.transition = 'transform 0.4s ease-in-out';
      sliderContainer.style.transform = `translateX(-${counter * slideSize}px)`;
    } else {
      if (counter <= slides.length - 1) {
        counter = 0;
      } else {
        counter--;
      }

      sliderContainer.style.transition = 'transform 0.4s ease-in-out';
      sliderContainer.style.transform = `translateX(${counter * slideSize}px)`;
    }
  };

  nextButton.addEventListener('click', () => {
    transferFunc(true);
  });

  prevButton.addEventListener('click', () => {
    transferFunc(false);
  });
}

sliderComponent();
