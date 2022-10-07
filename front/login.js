const socket = io("https://whispering-chamber-09886.herokuapp.com");

const pseudo = document.getElementById("pseudo");
const pseudoForm = document.getElementById("pseudoForm");
const sendPseudo = document.getElementById("sendPseudo");

let limit = 10;


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

