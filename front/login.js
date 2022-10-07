const socket = io("https://whispering-chamber-09886.herokuapp.com");

const pseudo = document.getElementById("pseudo");
const pseudoForm = document.getElementById("pseudoForm");
const sendPseudo = document.getElementById("sendPseudo");
const result = document.getElementById("result");

const specialCaracterRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
const emojiRegex = /\p{Emoji}/u;
const emptyRegex = /^ *$/;
const numberRegex = /\d/;


let limit = 10;

result.textContent = limit + "/" + limit + " characters left";

function verifyMessage(msg, limit) {
  if (msg.length > limit) {
    return false
  } else if (emptyRegex.test(msg)) {
    return false
  } else if (numberRegex.test(msg)) {
    return false
  } else if (specialCaracterRegex.test(msg)) {
    return false
  } else if (numberRegex.test(msg)) {
    return false
  } else if (emojiRegex.test(msg)) {
    return false
  }
  return true
}

function isError(isError, messageError) {
  if (isError) {
    result.textContent = messageError
    sendPseudo.setAttribute('disabled', 'disabled')
    result.style.color = "#A61E22";
   
  } else {
    result.textContent = limit - pseudo.value.length + "/" + limit + " characters left"
    sendPseudo.removeAttribute("disabled", "disabled");
    result.style.color = "#F5F5F5";
  }
}

pseudo.addEventListener("input", function () {
  var textLength = pseudo.value.length;
  if (textLength > limit) {
    isError(true, textLength + "/" + limit + " character limit reached")
  } else if (emptyRegex.test(pseudo.value)) {
    isError(true, "Your pseudo cannot be empty")
  } else if (numberRegex.test(pseudo.value)) {
    isError(true, "Your pseudo must not contain a number")
  } else if (specialCaracterRegex.test(pseudo.value)) {
    isError(true, "Your pseudo must not contain any special character")
  } else if (emojiRegex.test(pseudo.value)) {
    isError(true, "Your pseudo must not contain emoji")
  } else {
    isError(false)
  }
});


socket.emit("getUsers");
socket.on("users", (user) => { 
    console.log(user)
})

if(localStorage.isConnected == "true"){
  window.location.href = 'index.html';
}

pseudoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  localStorage.setItem('isConnected', 'true');
  localStorage.setItem('pseudo', pseudo.value);
  window.location.replace('index.html');
});

