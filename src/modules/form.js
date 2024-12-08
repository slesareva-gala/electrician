const form = () => {

    document.body.addEventListener('input', e => {
        const el = e.target

        if (el.closest('form input')) {
            el.parentNode.classList.remove('no-valid')

            switch (`${el.type}${el.type === "text" ? "_" + el.name : ""}`) {
                case 'text_fio':
                    el.value = el.value.replace(/[^а-яё]/gi, '')
                    break
                case 'text_tel':
                    el.value = el.value.replace(/[^\d+]/g, '')
                    break
            }
        }
    })

    document.body.addEventListener('blur', e => {
        const el = e.target

        if (el.closest('form input')) {

            if (el.name === 'fio')
                el.value = el.value.replace(/((?:^)[а-яё])([а-яё]*)/gi,
                    (_, first, next) => first.toUpperCase() + next.toLowerCase())
            if (el.name === 'tel')
                el.value = el.value.replace(/(?<=\d)[+]+/g, '').replace(/[+]{2,}/g, '+')
        }
    }, true)

}
export default form