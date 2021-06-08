export function getAuthForm() {
    return `
        <form class="mui-form" id="auth-form">

            <div class="mui-textfield mui-textfield--float-label">
                <input type="email" id="email" required>
                <label for="email">Email</label>
            </div>
            <div class="mui-textfield mui-textfield--float-label">
                <input type="password" id="password" required>
                <label for="password">Пароль</label>
            </div>

            <button 
                type="submit" 
                class="mui-btn mui-btn--raised mui-btn--primary"
                >
                Войти
            </button> 

        </form>
    `
}


export function authWithEmailAndPassword(email, password) {
    const apiKey = 'AIzaSyC4I4OzgNdg1MIqkd7gtCtz-amcTV5G60g'
    return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, { // ключ апи получим после регистрации приложения, а ссылку получили из документации farebase rest auth
        method: 'POST',
        body: JSON.stringify({
            email, password,
            returnSecureToken: true // Данное значение необходимо по документации
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }) 
    .then(response => response.json())
    .then(data => data.idToken) 
    
}


