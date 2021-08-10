const modal = document.getElementById('addAuthorModal')
const form = document.getElementById('addAuthorForm')
const submitButton = form.querySelector('button[type="submit"]')
const openAddFormButton = document.getElementById('addAuthorButton')

function hideModal() {
    modal.style.opacity = 0
    modal.style.pointerEvents = 'none'
}

function showModal() {
    modal.style.opacity = 1
    modal.style.pointerEvents = 'auto'
}

openAddFormButton.addEventListener('click', showModal)

form.addEventListener('click', (e) => e.stopPropagation())

modal.addEventListener('click', hideModal)

form.oninput = function () {
    if (form.checkValidity()) {
        return (submitButton.disabled = false)
    }
    submitButton.disabled = true
}
form.onsubmit = async function (e) {
    e.preventDefault()
    const data = new FormData(form)
    const name = data.get('name')
    const surname = data.get('surname')
    try {
        submitButton.innerHTML = 'Создание...'
        submitButton.disabled = true
        modal.removeEventListener('click', hideModal)

        await fetch('/authors/create', {
            method: 'POST',
            body: JSON.stringify({
                name,
                surname,
            }),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        })
        window.location.reload()
    } catch (error) {
        console.error(error)
        alert('Error')
    }
}

/*eslint-disable no-unused-vars */
async function removeAuthor(element, authorId) {
    try {
        const res = await fetch(`/authors/${authorId}`, {
            method: 'DELETE',
        })
        if (!res.ok) {
            const data = await res.json()
            throw new Error(data.error || '')
        }
        element.parentElement.parentElement.removeChild(element.parentElement)
    } catch (error) {
        console.error(error)
        alert(error.message || 'Error')
    }
}
/*eslint-enable */
