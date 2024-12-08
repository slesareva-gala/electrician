import { replacingModal } from './navigateDocument';


const sendForm = ({ url, formsName = [] }) => {
    const modalOverlay = document.querySelector('.modal-overlay')
    const statusBlock = document.getElementById('responseMessage')

    const progress = document.getElementById('preloader')
    const addProgress = (block) => {
        block.querySelector('input[type="submit"]').parentNode.append(progress)
        progress.style.display = "block"
        progress.style.backgroundColor = "white"
    }
    const delProgress = () => {
        progress.style.display = ''
        document.body.append(progress)
    }
    const showStatus = (status) => {
        const statusList = {
            error: 'Произошла ошибка, сообщение не отправлено. <br /> Попробуйте позже.',
            success: `Ваше сообщение отправлено. <br /> Наш менеджер с вами свяжется!`
        }
        statusBlock.querySelector('.modal-content').innerHTML = statusList[status]
        if (status === 'error') statusBlock.classList.add('error')
        else statusBlock.classList.remove('error')
        replacingModal(modalOverlay, statusBlock)
    }

    const regValid = {
        'fio': /[а-яё]/gi,
        'tel': /[\d+]/g
    }
    const isValid = (name, value) => (name in regValid) ? value.replace(regValid[name], '').length === 0 : true

    const sendData = (data) => {
        return fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            },
        }).then(res => {
            if (!res.ok) throw new Error(res.statusText)
            return res.json()
        })
    }

    const submitForm = (form) => {
        const formElements = form.querySelectorAll('input:not([type="submit"])')
        const formData = new FormData(form)
        const formBody = { form: form.name }

        const validate = (list) => {
            let success = true

            list.forEach(input => {
                if (!isValid(input.name, input.value) || !input.value.trim().length) {
                    input.parentNode.classList.add('no-valid')
                    success = false
                }
            })
            return success
        }

        formData.forEach((val, key) => {
            formBody[key] = val
        })

        form.append()
        if (validate(formElements)) {
            addProgress(form)

            sendData(formBody)
                .then(() => {
                    delProgress()
                    showStatus('success')
                    formElements.forEach((input) => {
                        input.value = ''
                    })
                })
                .catch(() => {
                    delProgress()
                    showStatus('error')
                })
        }
    }

    document.body.addEventListener('submit', (e) => {
        const form = e.target.closest('form')
        e.preventDefault()

        if (form && formsName.includes(form.name)) {
            submitForm(e.target)
        }
    })
}

export default sendForm