const users = []
let regex =  /^[a-öA-Ö]+$/

if (localStorage.getItem("users") == null) {
    localStorage.setItem("users", JSON.stringify(users))
}
const votes = [
    {
        voteName: "Liikennesäännöt",
        voteDescription: "Poistakaa liikennesäännöt",
        votesAmount: 0,
        voters: []
    },
    {
        voteName: "Viemärit",
        voteDescription: "Lisää viemäreitä kaduille",
        votesAmount: 0,
        voters: []
    }
]

if (localStorage.getItem("votes") == null) {
    localStorage.setItem("votes", JSON.stringify(votes))
}

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

    // check if username in use
    for (let user of JSON.parse(localStorage.getItem("users"))) {
        if (username === user["username"]) {
            document.getElementById("error-message-register").innerHTML = "Käyttäjätunnus on jo käytössä"
            return;
        }
    }

    // check for admin account
    if (username == "ADMIN" && password == "ADMIN123") {
        let localStorageUsers = JSON.parse(localStorage.getItem("users"))
        localStorageUsers.push({
            username: username,
            password: password,
            isAdmin: true
        })
        localStorage.setItem("users", JSON.stringify(localStorageUsers))
    }

    else {
        let localStorageUsers = JSON.parse(localStorage.getItem("users"))
        localStorageUsers.push({
            username: username,
            password: password,
            isAdmin: false
        })
        localStorage.setItem("users", JSON.stringify(localStorageUsers))
    }

    // check for empty inputs
    if (username == "" || password == "") {
        document.getElementById("error-message-register").innerHTML = "Kaikki kentät tulee täyttää"
        return;
    } else {
        document.getElementById("error-message-register").innerHTML = ""
    }

    document.getElementById("success-message-register").innerHTML = "Rekisteröidyit onnistuneesti"

}

function logIn() {

    let currentAddress = document.location.href.substring(0, (document.location.href.length - 10))

    let username = document.getElementById("log-in-account-name").value
    let password = document.getElementById("log-in-password").value

    let accountType = document.querySelector('input[name="account-type"]:checked').value;

    // check for empty inputs
    if (username == "" || password == "") {
        document.getElementById("error-message-log-in").innerHTML = "Kaikki kentät tulee täyttää"
        return;
    } else {
        document.getElementById("error-message-log-in").innerHTML = ""
    }

    // log into account
    for (let user of JSON.parse(localStorage.getItem("users"))) {
        if (username == user["username"] && password == user["password"]) {
            if (accountType == "basic") {
                localStorage.setItem("currentUser", username)
                document.location.href = `${currentAddress}basicapp.html`
                return;
            }
            if (accountType == "admin" && user["isAdmin"]) {
                localStorage.setItem("currentUser", username)
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

    // iterate through votes
    for (let vote of JSON.parse(localStorage.getItem("votes"))) {
        document.getElementById("votes-list").innerHTML += `<li>${vote["voteDescription"]}<br> Ääniä: ${vote["votesAmount"]} <button class="vote-button" onclick='vote("${vote["voteName"]}")'>Äänestä</button></li><br>`
    }
}

function vote(voteName) {

    let localStorageVotes = JSON.parse(localStorage.getItem("votes"))

    // iterate through votes
    for (let vote of localStorageVotes) {
        if (vote["voteName"] == voteName && ! vote["voters"].includes(localStorage.getItem("currentUser"))) {
            vote["votesAmount"] += 1
            vote["voters"].push(localStorage.getItem("currentUser"))
        }
    }

    localStorage.setItem("votes", JSON.stringify(localStorageVotes))

    displayVotes()
}

displayVotes()