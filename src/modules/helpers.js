"use strict";

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
  const targetElement = (typeof selectors === 'string') ? document.querySelector(selectors) : selectors

  if (!targetElement) return

  const scrollY = window.scrollY;
  const transitionHeight = targetElement.getBoundingClientRect().top + shift;

  animate({
    duration: duration,
    timingplane: 'easeOutCubic',
    draw(progress) {
      window.scrollTo(0, scrollY + transitionHeight * progress);
    }
  });
};

export const modal = ({ modal, modalContent, states = 'show', method = 'translate', time = undefined, postCallback = null }) => {

  const actions = {

    show: (time = 1000) => {
      const mT = method === 'translate'

      modal.style.transform = 'translateX(0)'
      if (!mT || time === 0) {
        modalContent.style.left = `50%`;
        modalContent.style.transform = `translateX(-50% )`;
      }
      if (!mT && time === 0) modal.style.opacity = '1'

      if (time) {

        animate({
          timingplane: mT ? 'easeOutExpo' : 'linear',
          draw(progress) {
            if (mT) {
              modalContent.style.left = `${100 - progress * 50}%`;
              modalContent.style.transform = `translateX( ${-50 * progress}% )`;
            } else modal.style.opacity = `${progress}`
            if (progress === 1 && postCallback) postCallback()
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
              if (postCallback) postCallback()
            } else modal.style.opacity = `${1 - progress}`;
          },
          duration: time
        });
      }
    }
  }
  if (modal && modalContent) actions[states](time)
}

