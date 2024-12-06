"use strict";

export const dbload = (url) => fetch(url)
  .then(response => {
    if (!response.ok) throw new Error(response.statusText)
    return response.json()
  })

export const animate = ({ draw = () => { }, duration = 1000, timingplane = 'linear', timeframe = 16.7, execute = () => true }) => {

  const timing = {
    linear: (x) => x,

    easeOutCubic: (x) => 1 - Math.pow(1 - x, 3),
    easeInOutCubic: (x) => x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2,
    easeOutQuart: (x) => 1 - Math.pow(1 - x, 5),
    easeOutExpo: (x) => x === 1 ? 1 : 1 - Math.pow(2, -10 * x),
    easeInExpo: (x) => x === 0 ? 0 : Math.pow(2, 10 * x - 10),

  };
  if (!(timingplane in timing)) { timingplane = 'linear'; }

  const maxCountAnimation = Math.max(Math.round(duration / timeframe), 1);
  let countAnimation = 0;

  requestAnimationFrame(function animation() {
    let progress = countAnimation === 0 ? 0 :
      countAnimation > maxCountAnimation - 1 ? 1 :
        timing[timingplane](countAnimation / maxCountAnimation);

    if (!execute()) return

    draw(progress);

    if (countAnimation < maxCountAnimation) {
      countAnimation++;
      requestAnimationFrame(animation);
    }
  });
};

export const smoothScroll = (selectors, shift = 0, duration = 1000) => {

  const scrollY = window.scrollY;

  const transitionHeight = document.querySelector(selectors).getBoundingClientRect().top + shift;

  animate({
    duration: duration,
    timingplane: 'easeOutCubic',
    draw(progress) {
      window.scrollTo(0, scrollY + transitionHeight * progress);
    }
  });
};

export const modal = ({ modal, modalContent, states = 'show', time = undefined }) => {

  const actions = {

    show: (time = 1000) => {

      modal.style.transform = 'translateX(0)'

      if (time === 0) {
        modalContent.style.left = `50%`;
        modalContent.style.transform = `translateX(-50% )`;

      } else {
        animate({
          timingplane: 'easeOutExpo',
          draw(progress) {
            modalContent.style.left = `${100 - progress * 50}%`;
            modalContent.style.transform = `translateX( ${-50 * progress}% )`;
          },
          duration: time
        });
      }
    },

    hide: (time = 300) => {

      if (time === 0) {
        modalContent.style.left = ``;
        modalContent.style.transform = ``;
        modal.style.transform = '';
      } else {
        animate({
          draw(progress) {
            if (progress === 1) {
              modal.style.opacity = '';
              modalContent.style.left = ``;
              modalContent.style.transform = ``;
              modal.style.transform = ''
            } else modal.style.opacity = `${1 - progress}`;
          },
          duration: time
        });
      }
    }
  }
  if (modal && modalContent) actions[states](time)
}
