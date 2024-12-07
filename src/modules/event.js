import { modal, smoothScroll } from './helpers';


const event = (maxMediaMobile) => {
    const app = document.body
    const mobileMenu = app.querySelector('.mobile-menu')
    const headerWrapper = app.querySelector('.header-wrapper')
    const orderCallback = app.querySelector('.modal-overlay');
    const orderCallbackContent = orderCallback.querySelector('.modal-callback');

    const clickList = {
        name: 'click',
        '.order-call': (t) => {
            if (t.closest('.mobile-menu')) mobileMenu.classList.remove('open')
            modal({
                modal: orderCallback,
                modalContent: orderCallbackContent,
                states: 'show',
                time: window.innerWidth < maxMediaMobile + 1 ? 0 : 1000,
            })
        },
        '.smooth-scroll': (t) => {
            if (t.closest('.mobile-menu')) mobileMenu.classList.remove('open')
            smoothScroll(t.getAttribute("href"), 1 - headerWrapper.offsetHeight)
        },
        '.mob-menu-btn': () => {
            mobileMenu.classList.add('open')
        },
        '.mobile-menu-close': () => {
            mobileMenu.classList.remove('open')
        },
        '.overlay': () => {
            mobileMenu.classList.remove('open')
        },

    };

    const mousedownList = {
        name: 'mousedown',
        '.modal-overlay': (t, p) => {
            if (t === p || t.closest('.modal-close')) {
                modal({
                    modal: orderCallback,
                    modalContent: orderCallbackContent,
                    states: 'hide',
                    time: window.innerWidth < maxMediaMobile + 1 ? 0 : 300,
                })
            }
        },
    };

    [clickList, mousedownList].forEach(o => {
        app.addEventListener(o.name, (e) => {
            let elParent
            for (let key in o) {
                if ((elParent = e.target.closest(key))) {
                    o[key](e.target, elParent)
                    break
                }
            }
        })
    });
}
export default event