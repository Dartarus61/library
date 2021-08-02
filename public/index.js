const parag = document.querySelector('p')
function onClick() {
    parag.innerText = parag.innerText === 'restart' ? 'test' : 'restart'
    parag.style = 'color:red'
}
