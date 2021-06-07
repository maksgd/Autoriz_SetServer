export class Question {
    static create(question) { // Запрос к беку c сылкой к бд и ключем к объекту (questions.json)
        return fetch('https://autoriz-setdate-default-rtdb.firebaseio.com/questions.json', { // Настройка
            method: 'POST',
            body: JSON.stringify(question),
            headers: {
                'Content-Type': 'application/json'
            }
        }) 
        .then(response => response.json()) // Преобразование в нужный формат 
        .then(response => {
            question.id = response.name // Т.к в поле name хранится id, мы id приравниваем к name
            return question
        })
        .then(addToLocalStorage) // Добавление данных в LS
        .then(Question.renderList)
    }

    static renderList() {
        const questions = getQuestionsFromLocalStorage()

        const html = questions.length
            ? questions.map(toCard).join(' ')
            : `<div class="mui--text-headline">Вы пока ничего не спрашивали!</div>`

        const list = document.getElementById('list')

        list.innerHTML = html
    }
}

function addToLocalStorage(question) { // Функция для LS
    const all = getQuestionsFromLocalStorage() 
    all.push(question) // Добавляем в массив новый вопрос
    localStorage.setItem('questions', JSON.stringify(all)) // Запись массива с вопросами
}

function getQuestionsFromLocalStorage() {
    return JSON.parse(localStorage.getItem('questions') || '[]') // Получение массива, которую распарсим.
}

function toCard(question) {
    return `
        <div class="mui--text-black-54">
            ${new Date(question.date).toLocaleDateString()}
            ${new Date(question.date).toLocaleTimeString()}
        </div>
        <div>
            ${question.text}
        </div>
        <br>
    `
}






