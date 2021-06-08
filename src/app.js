import {Question} from './question'
import { createModal, isValid } from './utils'
import { authWithEmailAndPassword, getAuthForm } from './auth'
import './style.css'


const form = document.getElementById('form')
const modalBtn = document.getElementById('modal-btn')
const input = form.querySelector('#question-input')
const submitBtn = form.querySelector('#submit')

window.addEventListener('load', Question.renderList)
form.addEventListener('submit', submitFormHandler)
modalBtn.addEventListener('click', openModal)
input.addEventListener('input', () => {
    submitBtn.disabled = !isValid(input.value)
})

function submitFormHandler(event) {
    event.preventDefault() // Чтобы форма не перезагружалась

    if (isValid(input.value)) { // Проверка на валидность благодаря импортированной функции.
        const question = { // Создание объекта вопроса
            text: input.value.trim(), //trim удяляет лишние пробелы
            date: new Date().toJSON(),
        }

        submitBtn.disabled = true // Откл кнопку во время запроса. 
        // Async request to server to save question
        Question.create(question).then(() => {
            input.value = '' // Очистить поле после окончания запроса.  
            input.className = ''
            submitBtn.disabled = false
        })
    }
}



function openModal() { 
    createModal('Авторизация', getAuthForm())
    document
        .getElementById('auth-form')
        .addEventListener('submit', authFormHandler, {once: true}) // при отправке запроса запустить функцию, которая не даст перезагрузить сайт. Также создаем объект чтобы вызвать это событие 1 раз. 
}

function authFormHandler(event) { // Отменить перезагрузку сайта (есть дефолтное поведение у формы - перезагрузка)
    event.preventDefault()

    const btn = event.target.querySelector('button')
    const email = event.target.querySelector('#email').value // ev targ - это сама форма, в которой мы ищем что либо.
    const password = event.target.querySelector('#password').value

    btn.disabled = true
    authWithEmailAndPassword(email, password)
        .then(Question.fetch)
        .then(renderModalAfterAuth)
        .then(() => btn.disabled = false)
}

function renderModalAfterAuth(content) {
    if (typeof content === 'string') {
        createModal('Ошибка!', content)
    } else {
        createModal('Список вопросов', Question.listToHTML(content))
    }
}





