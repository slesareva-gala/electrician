
import { smoothScroll } from './helpers';

const accordeon = () => {
  const accordeon = document.querySelector('.accordeon');
  if (!accordeon) return
  const accordeonKeys = [...accordeon.children];
  const headerWrapper = document.querySelector('.header-wrapper')
  if (!accordeonKeys.length || !headerWrapper) return

  const onPressed = (keyCurrent, keyPrevious) => {
    smoothScroll(keyCurrent, - headerWrapper.offsetHeight - 3, 300)
    keyCurrent.classList.add('active')
    if (keyPrevious) keyPrevious.lastElementChild.classList.remove('notransition')
  }

  const offPressed = (key, notCurrent = false) => {
    if (notCurrent) key.lastElementChild.classList.add('notransition')
    key.classList.remove('active')
  }

  const press = (() => {
    let keyActive = null

    return (key) => {
      const isOn = key.classList.contains('active')

      if (isOn) offPressed(key)
      else {
        if (keyActive) offPressed(keyActive, true)
        onPressed(key, keyActive)
      }

      keyActive = isOn ? null : key
    }
  })()

  const play = (e) => {
    const head = e.target.closest('.title');
    if (head) press(head.parentElement);
  }

  accordeon.addEventListener('click', play);
}

export default accordeon
