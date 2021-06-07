import {Question} from './question'
import { isValid } from './utils'
import './style.css'


const form = document.getElementById('form')
const input = form.querySelector('#question-input')
const submitBtn = form.querySelector('#submit')


form.addEventListener('submit', submitFormHandler)
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








