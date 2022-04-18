const participants = prompt("Qual é o seu nome?");

let participantsObject = {
    name: participants
  }

function enterRoom() {
   const request = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", participantsObject);
   console.log(request);
   request.then(username)
   request.catch(invalidUsername);
}

function username (response) {
    console.log(response);
}

function invalidUsername () {
    alert("O nome já está sendo usado, tente novamente.");
    window.location.reload();
}

enterRoom();

function activeUser() {
    const request = axios.post("https://mock-api.driven.com.br/api/v6/uol/status", participantsObject);
    request.then(function() {
        console.log("active user");
    });
    request.catch(function() {
        console.log("unactive user");
        window.location.reload();
    });
}

setInterval(activeUser, 5000);

function getMessages() {
    const promise = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    promise.then(messages)
    promise.catch(errorMessages)
}

function messages(response) {
    let returnedMessages = response.data;
    //console.log("rodou" + response.data)
    const element = document.querySelector("ul");
    element.innerHTML = "";
    for(let i = 0; i < returnedMessages.length; i++){
        if(returnedMessages[i].type === "status") {
            element.innerHTML += `<li class="statusMessage"><b>(${returnedMessages[i].time})</b> <span>${returnedMessages[i].from}</span> ${returnedMessages[i].text}</li>`
        }else if(returnedMessages[i].type === "message"){
            element.innerHTML += `<li class="publicMessage"><b>(${returnedMessages[i].time})</b> <span>${returnedMessages[i].from}</span> para <span>${returnedMessages[i].to}</span>: ${returnedMessages[i].text}</li>`
        }else if(returnedMessages[i].type === "private_message" && returnedMessages[i].to == participants){
            element.innerHTML += `<li class="privateMessage"><b>(${returnedMessages[i].time})</b> <span>${returnedMessages[i].from}</span> reservadamente para <span>${returnedMessages[i].to}</span>: ${returnedMessages[i].text}</li>`
        }
    }
    element.scrollIntoView(false);
}

function errorMessages() {
    window.location.reload();
}

setInterval(getMessages, 3000);

function sendMessage() {
    let message = document.querySelector("input").value;
    let messageObjects = {
        from: participants,
        to: "Todos",
        text: message,
        type: "message"}
    console.log(message);
    console.log(messageObjects);
    const request = axios.post("https://mock-api.driven.com.br/api/v6/uol/messages", messageObjects);
    request.then(getMessages)
    request.catch(errorMessages);
    message = document.querySelector("input").value="";
}

getMessages();
