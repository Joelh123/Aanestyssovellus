const users = []
let regex =  /^[a-öA-Ö]+$/

const votes = [
    {
        voteName: "Liikennesäännöt",
        voteDescription: "Poistakaa liikennesäännöt",
        votesAmount: 0
    },
    {
        voteName: "Viemärit",
        voteDescription: "Lisää viemäreitä kaduille",
        votesAmount: 0
    }
]

function register() {

    document.getElementById("success-message-register").innerHTML = ""

    let username = document.getElementById("register-account-name").value
    let password = document.getElementById("register-password").value


    if (username == "ADMIN" && password == "ADMIN123") {
        localStorage.setItem(username, password)
        localStorage.setItem(`${username}-is-admin`, "true")
    }

    else if (localStorage.getItem(username) == null) {
        localStorage.setItem(username, password)
        localStorage.setItem(`${username}-is-admin`, "false")
    }
     

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

    if (localStorage.getItem(username) == null) {
        localStorage.setItem(username, password)
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

    for (const [key, value] of Object.entries(localStorage)) {
        if (username == key && password == value) {
            if (accountType == "basic") {
                document.location.href = `${currentAddress}basicapp.html`
                return;
            }
            if (accountType == "admin" && localStorage.getItem(`${key}-is-admin`) == "true") {
                document.location.href = `${currentAddress}adminapp.html`
                return;
            } else{
                document.getElementById("error-message-log-in").innerHTML = "Käyttäjä ei ole ylläpitäjä"
                return
            }
        }
    }

    document.getElementById("error-message-log-in").innerHTML = "Käyttäjää ei löydy"
}

function displayVotes() {
    document.getElementById("votes-list").innerHTML = ""

    for (let vote of votes) {
        document.getElementById("votes-list").innerHTML += `<li>${vote["voteDescription"]}<br> Ääniä: ${vote["votesAmount"]} <button class="vote-button" onclick='vote("${vote["voteName"]}")'>Äänestä</button></li><br>`
    }
}

function vote(voteName) {
    for (let vote of votes) {
        if (vote["voteName"] == voteName) {
            vote["votesAmount"] += 1
        }
    }

    displayVotes()
}

displayVotes()