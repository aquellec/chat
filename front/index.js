const socket = io("https://whispering-chamber-09886.herokuapp.com");

const pseudo = document.getElementById("pseudo");
const pseudoForm = document.getElementById("pseudoForm");
const messageForm = document.getElementById("messageForm");
const messageList = document.getElementById("messageList");
const message = document.getElementById("message");
const userList = document.getElementById("userList");
const alphabet = document.querySelectorAll("#alphabet>*");

socket.emit("getMessages"); //Demande la liste des messages

socket.on("messages", (message) => {
  // message.sort((a, b) => b.time - a.time);
  // message.map((message) => (
  //   messageList.innerHTML += "<div> <span class='user'> Username :" + message.user.name + "</span> <span class='message'> Message :" + message.value + "</span> <span class='date'>" + new Date(message.time) + "</span> <div> </br>"
  //   )
  // )
});
// Recupere la liste complete des messages (après avoir appeler getMessages)

socket.on("message", (message) => {
  messageList.innerHTML +=
    "<div> <span class='user'> Username :" +
    message.user.name +
    "</span> <span class='message'> Message :" +
    message.value +
    "</span> <span class='date'>" +
    new Date(message.time) +
    "</span> <div> </br>";

  
  messageList.scrollTo(0, messageList.scrollHeight); // scroller en bas pour voir le dernier message
  
  let letters = message.value.split("");  // séparer les lettres

  letters.forEach((letter,index) => {
   
  
    setTimeout(() =>{ 
       const findLetter = Array.from(alphabet).find((alphabetLetterElement)=>{
      return alphabetLetterElement.textContent.toLowerCase() === letter.toLowerCase()
    })
    findLetter.style.animation = `blink 1s steps(2,end)`
    setTimeout(() => {
      findLetter.style.animation = null
    }, 1000);
    }, (index) * 1000)
  }); 
}); // Reçoit l'historique message par message, possibilité de filtrer par ID

pseudoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  
  socket.emit("setUsername", pseudo.value);
});

messageForm.addEventListener("submit", (event) => {
  event.preventDefault();
  socket.emit("message", message.value);
  message.value = "";
});

socket.emit("getUsers"); // Demande a recupere la liste complete des users
socket.on("users", (user) => {
}); // Récupère la liste complete des users
socket.on(
  "updateUsername",
  (user) => (userList.innerHTML += user.name + "</br>")
); // // Reçoit la liste des users 1 par 1

var result = document.getElementById("result");
var limit = 2;
result.textContent = 0 + "/" + limit;

message.addEventListener("input",function(){
    var textLength = message.value.length;
    result.textContent = textLength + "/" + limit;

    if(textLength > limit){
      message.style.borderColor = "#ff0000";
        result.style.color = "#ff0000";
    }
    else{
      message.style.borderColor = "#b2b2b2";
        result.style.color = "#1a75ff";
    }
});

