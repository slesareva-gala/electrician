const placeArrowUp = () => {
    const services = document.getElementById('services')
    const headerWrapper = document.querySelector('.header-wrapper')
    const arrowUp = document.querySelector('.up')

    if (!services || !headerWrapper || !arrowUp) return

    const arrowTopWidth = arrowUp.offsetWidth

    const visibilityArrowTop = () => {
        const right = (window.innerWidth - arrowUp.parentNode.offsetWidth) / 2 - arrowTopWidth

        arrowUp.hidden = services.offsetTop > window.pageYOffset + headerWrapper.offsetHeight
        arrowUp.style.right = right > 0 ? `${right}px` : ''
    }

    window.addEventListener('scroll', () => {
        visibilityArrowTop()
    });

    window.addEventListener('resize', () => {
        visibilityArrowTop()
    })

    visibilityArrowTop()
}
export default placeArrowUp