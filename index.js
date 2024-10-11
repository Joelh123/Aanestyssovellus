let users = []
let regex =  /^[a-öA-Ö]+$/

function register() {

    document.getElementById("success-message-register").innerHTML = ""

    let username = document.getElementById("register-account-name").value
    let password = document.getElementById("register-password").value

    if (! regex.test(username)) {
        document.getElementById("error-message-register").innerHTML = "Tunnuksessa tulee olla vain kirjaimia"
        return;
    } else {
        document.getElementById("error-message-register").innerHTML = ""
    }

    for (let user of users) {
        if (username === user["username"]) {
            document.getElementById("error-message-register").innerHTML = "Käyttäjätunnus on jo käytössä"
            return;
        }
    }

    if (username == "" || password == "") {
        document.getElementById("error-message-register").innerHTML = "Kaikki kentät tulee täyttää"
        return;
    } else {
        document.getElementById("error-message-register").innerHTML = ""
    }

    users.push({
        username: username,
        password: password
    })

    document.getElementById("success-message-register").innerHTML = "Rekisteröidyit onnistuneesti"

}

function logIn() {
    let username = document.getElementById("log-in-account-name").value
    let password = document.getElementById("log-in-password").value

    
}