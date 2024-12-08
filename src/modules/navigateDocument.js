import { modal, smoothScroll } from './helpers';


export const replacingModal = (parent, newChild) => {
    const currentChild = parent.firstElementChild

    currentChild.style.display = ''
    document.body.append(currentChild)
    parent.append(newChild)
    newChild.style.display = 'block'
}

const navigateDocument = (maxMediaMobile) => {
    const mobileMenu = document.querySelector('.mobile-menu')
    const modalOverlay = document.querySelector('.modal-overlay')
    const modalContentDefault = modalOverlay ? modalOverlay.querySelector('.modal-callback') : null;
    const headerWrapper = document.querySelector('.header-wrapper')

    const clickList = {
        name: 'click',
        '.up': () => {
            smoothScroll('.main-wrapper')
        }
    }
    const mousedownList = { name: 'mousedown' }

    if (modalContentDefault) {
        clickList['.fancyboxModal'] = (t) => {
            if (t.closest('.mobile-menu')) mobileMenu.classList.remove('open')
            modal({
                modal: modalOverlay,
                modalContent: modalOverlay.firstElementChild,
                states: 'show',
                method: window.innerWidth < maxMediaMobile + 1 ? 'opacity' : 'translate',
                time: window.innerWidth < maxMediaMobile + 1 ? 300 : 1000,
            })
        }
        mousedownList['.modal-overlay'] = (t, p) => {
            if (t === p || t.closest('.modal-close') || t.closest('.fancyClose')) {
                modal({
                    modal: modalOverlay,
                    modalContent: modalOverlay.firstElementChild,
                    states: 'hide',
                    time: 300,
                    postCallback: () => {
                        if (modalOverlay.firstElementChild !== modalContentDefault) {
                            replacingModal(modalOverlay, modalContentDefault)
                        }
                    }
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