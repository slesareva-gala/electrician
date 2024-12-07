import { modal, smoothScroll } from './helpers';

const navigateDocument = (maxMediaMobile) => {
    const mobileMenu = document.querySelector('.mobile-menu')
    const orderCallback = document.querySelector('.modal-overlay');
    const orderCallbackContent = orderCallback ? orderCallback.querySelector('.modal-callback') : null;
    const headerWrapper = document.querySelector('.header-wrapper')

    const clickList = {
        name: 'click',
        '.up': () => {
            smoothScroll('.main-wrapper')
        }
    }
    const mousedownList = { name: 'mousedown' }

    if (orderCallbackContent) {
        clickList['.order-call'] = (t) => {
            if (t.closest('.mobile-menu')) mobileMenu.classList.remove('open')
            modal({
                modal: orderCallback,
                modalContent: orderCallbackContent,
                states: 'show',
                time: window.innerWidth < maxMediaMobile + 1 ? 0 : 1000,
            })
        }
        mousedownList['.modal-overlay'] = (t, p) => {
            if (t === p || t.closest('.modal-close')) {
                modal({
                    modal: orderCallback,
                    modalContent: orderCallbackContent,
                    states: 'hide',
                    time: window.innerWidth < maxMediaMobile + 1 ? 0 : 300,
                })
            }
        }
    }
    if (headerWrapper) {
        clickList['.smooth-scroll'] = (t) => {
            if (t.closest('.mobile-menu')) mobileMenu.classList.remove('open')
            smoothScroll(t.getAttribute('href'), 1 - headerWrapper.offsetHeight)
        }
    }
    if (mobileMenu) {
        clickList['.mob-menu-btn'] = () => { mobileMenu.classList.add('open') }
        clickList['.mobile-menu-close'] = () => { mobileMenu.classList.remove('open') }
        clickList['.overlay'] = () => { mobileMenu.classList.remove('open') }
    }

    [clickList, mousedownList].forEach(o => {
        document.addEventListener(o.name, (e) => {
            let elParent
            for (let key in o) {
                if (key === 'name') continue
                if ((elParent = e.target.closest(key))) {
                    o[key](e.target, elParent)
                    break
                }
            }
        })
    });
}
export default navigateDocument