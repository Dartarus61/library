const modal = document.getElementById('addBookModal')
const form = document.getElementById('addBook')
const submitButton = form.querySelector('button[type="submit"]')
const openAddFormButton = document.getElementById('addBookButton')

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
    const authorId = data.get('authorId')
    const name = data.get('name')
    const description = data.get('description')
    try {
        submitButton.innerHTML = 'Создание...'
        submitButton.disabled = true
        modal.removeEventListener('click', hideModal)

        await fetch('/books/add', {
            method: 'POST',
            body: JSON.stringify({
                name,
                description,
                authorId,
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

/*eslint-disable */
async function removeBook(element, bookId) {
    try {
        await fetch(`/books/${bookId}`, {
            method: 'DELETE',
        })
        element.parentElement.parentElement.removeChild(element.parentElement)
    } catch (error) {
        console.error(error)
        alert('Error')
    }
}
/*eslint-enable */
