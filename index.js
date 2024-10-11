const users = []
let regex =  /^[a-öA-Ö]+$/

function register() {

    document.getElementById("success-message-register").innerHTML = ""

    let username = document.getElementById("register-account-name").value
    let password = document.getElementById("register-password").value

    // check if username has characters other than the alphabet
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

    let currentAddress = document.location.href.substring(0, (document.location.href.length - 10))

    let username = document.getElementById("log-in-account-name").value
    let password = document.getElementById("log-in-password").value

    let accountType = document.querySelector('input[name="account-type"]:checked').value;

    if (username == "" || password == "") {
        document.getElementById("error-message-log-in").innerHTML = "Kaikki kentät tulee täyttää"
        return;
    } else {
        document.getElementById("error-message-log-in").innerHTML = ""
    }

    for (let user of users) {
        if (username === user["username"] && password === user["password"]) {
            if (accountType == "basic") {
                document.location.href = `${currentAddress}basicapp.html`
                return;
            }
            if (accountType == "admin") {
                document.location.href = `${currentAddress}adminapp.html`
                return;
            }
        }
    }

    document.getElementById("error-message-log-in").innerHTML = "Käyttäjää ei löydy"
}