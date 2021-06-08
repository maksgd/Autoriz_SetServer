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

    static fetch(token) { 
        if (!token) { // В случае неверно введенных данных
            return Promise.resolve('<p class="error">У вас нет токена</p>')
        }
        return fetch(`https://autoriz-setdate-default-rtdb.firebaseio.com/questions.json?auth=${token}`) // Добавим параметр, чтобы читать могли только авторизированные пользователи, это мы узнаем благодаря значению token
        .then(response => response.json())
        .then(response => {
            if (response && response.error) {
                return `<p class="error">${response.error}</p>`
            }
            return response ? Object.keys(response).map(key => ({ // Узнаем есть ли в resp что либо, далее работаем с массивом из ключей 
                ...response[key], // Трансформируем массив ключей в нужный формат
                id: key
            })) : [] // Иначе пустой массив
        })
    }

    static renderList() {
        const questions = getQuestionsFromLocalStorage()

        const html = questions.length
            ? questions.map(toCard).join(' ')
            : `<div class="mui--text-headline">Вы пока ничего не спрашивали!</div>`

        const list = document.getElementById('list')

        list.innerHTML = html
    }

    static listToHTML(questions) {
        return questions.length
        ? `<ol>${questions.map(q => `<li>${q.text}</li>`).join('')}</ol>`
        : '<p>Вопросов пока нет</p>'
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






