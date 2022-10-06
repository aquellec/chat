const socket = io("https://whispering-chamber-09886.herokuapp.com");

const pseudo = document.getElementById("pseudo");
const pseudoForm = document.getElementById("pseudoForm");
const messageForm = document.getElementById("messageForm");
const messageList = document.getElementById("messageList");
const sendMessage = document.getElementById("sendMessage");
const sendMessageSvg = document.querySelector("#sendMessage svg");
const message = document.getElementById("message");
const userList = document.getElementById("userList");
const result = document.getElementById("result");
const one = document.getElementById("one");
const two = document.getElementById("two");
const iconGood =document.querySelector(".good")
const iconWrong =document.querySelector(".wrong")

const alphabet = document.querySelectorAll("#alphabet>*");

const specialCaracterRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
const emojiRegex = /\p{Emoji}/u;
const emptyRegex = /^ *$/;
const numberRegex = /\d/;


function asTabs(node) {
  var tabs = [];
  for (var i = 0; i < node.childNodes.length; i++) {
    var child = node.childNodes[i];
    if (child.nodeType == document.ELEMENT_NODE)
      tabs.push(child);
  }
  var tabList = document.createElement("div");
  tabs.forEach(function(tab, i) {
    var button = document.createElement("button");
    button.innerHTML = `<svg class="tv-button tv-button-${i}" width="20" height="20" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="20" fill="#192A3E"/>
    <circle cx="20.0002" cy="20" r="12.6316" fill="#101E2B"/>
    </svg>`;
    button.addEventListener("click", function() { selectTab(i); });
    tabList.appendChild(button);
  });
  node.insertBefore(tabList, node.firstChild);
  function selectTab(n) {
    tabs.forEach(function(tab, i) {
      if (i == n){
        document.querySelector(".tv-button-" + i ).innerHTML = `<circle cx="20" cy="20" r="20" fill="#192A3E"/>
        <circle cx="20.0002" cy="20" r="12.6316" fill="#213B54"/>`
        tab.style.display = "block";
      }else{
        document.querySelector(".tv-button-" + i ).innerHTML = `<circle cx="20" cy="20" r="20" fill="#192A3E"/>
        <circle cx="20.0002" cy="20" r="12.6316" fill="#101E2B"/>`
        tab.style.display = "none"
      }
    });
   
  }
  selectTab(0);
}
asTabs(document.querySelector(".tv"));

function convertToAscii(string) {
  const unicodeToAsciiMap = {'Ⱥ':'A','Æ':'AE','Ꜻ':'AV','Ɓ':'B','Ƀ':'B','Ƃ':'B','Ƈ':'C','Ȼ':'C','Ɗ':'D','ǲ':'D','ǅ':'D','Đ':'D','Ƌ':'D','Ǆ':'DZ','Ɇ':'E','Ꝫ':'ET','Ƒ':'F','Ɠ':'G','Ǥ':'G','Ⱨ':'H','Ħ':'H','Ɨ':'I','Ꝺ':'D','Ꝼ':'F','Ᵹ':'G','Ꞃ':'R','Ꞅ':'S','Ꞇ':'T','Ꝭ':'IS','Ɉ':'J','Ⱪ':'K','Ꝃ':'K','Ƙ':'K','Ꝁ':'K','Ꝅ':'K','Ƚ':'L','Ⱡ':'L','Ꝉ':'L','Ŀ':'L','Ɫ':'L','ǈ':'L','Ł':'L','Ɱ':'M','Ɲ':'N','Ƞ':'N','ǋ':'N','Ꝋ':'O','Ꝍ':'O','Ɵ':'O','Ø':'O','Ƣ':'OI','Ɛ':'E','Ɔ':'O','Ȣ':'OU','Ꝓ':'P','Ƥ':'P','Ꝕ':'P','Ᵽ':'P','Ꝑ':'P','Ꝙ':'Q','Ꝗ':'Q','Ɍ':'R','Ɽ':'R','Ꜿ':'C','Ǝ':'E','Ⱦ':'T','Ƭ':'T','Ʈ':'T','Ŧ':'T','Ɐ':'A','Ꞁ':'L','Ɯ':'M','Ʌ':'V','Ꝟ':'V','Ʋ':'V','Ⱳ':'W','Ƴ':'Y','Ỿ':'Y','Ɏ':'Y','Ⱬ':'Z','Ȥ':'Z','Ƶ':'Z','Œ':'OE','ᴀ':'A','ᴁ':'AE','ʙ':'B','ᴃ':'B','ᴄ':'C','ᴅ':'D','ᴇ':'E','ꜰ':'F','ɢ':'G','ʛ':'G','ʜ':'H','ɪ':'I','ʁ':'R','ᴊ':'J','ᴋ':'K','ʟ':'L','ᴌ':'L','ᴍ':'M','ɴ':'N','ᴏ':'O','ɶ':'OE','ᴐ':'O','ᴕ':'OU','ᴘ':'P','ʀ':'R','ᴎ':'N','ᴙ':'R','ꜱ':'S','ᴛ':'T','ⱻ':'E','ᴚ':'R','ᴜ':'U','ᴠ':'V','ᴡ':'W','ʏ':'Y','ᴢ':'Z','ᶏ':'a','ẚ':'a','ⱥ':'a','æ':'ae','ꜻ':'av','ɓ':'b','ᵬ':'b','ᶀ':'b','ƀ':'b','ƃ':'b','ɵ':'o','ɕ':'c','ƈ':'c','ȼ':'c','ȡ':'d','ɗ':'d','ᶑ':'d','ᵭ':'d','ᶁ':'d','đ':'d','ɖ':'d','ƌ':'d','ı':'i','ȷ':'j','ɟ':'j','ʄ':'j','ǆ':'dz','ⱸ':'e','ᶒ':'e','ɇ':'e','ꝫ':'et','ƒ':'f','ᵮ':'f','ᶂ':'f','ɠ':'g','ᶃ':'g','ǥ':'g','ⱨ':'h','ɦ':'h','ħ':'h','ƕ':'hv','ᶖ':'i','ɨ':'i','ꝺ':'d','ꝼ':'f','ᵹ':'g','ꞃ':'r','ꞅ':'s','ꞇ':'t','ꝭ':'is','ʝ':'j','ɉ':'j','ⱪ':'k','ꝃ':'k','ƙ':'k','ᶄ':'k','ꝁ':'k','ꝅ':'k','ƚ':'l','ɬ':'l','ȴ':'l','ⱡ':'l','ꝉ':'l','ŀ':'l','ɫ':'l','ᶅ':'l','ɭ':'l','ł':'l','ſ':'s','ẜ':'s','ẝ':'s','ɱ':'m','ᵯ':'m','ᶆ':'m','ȵ':'n','ɲ':'n','ƞ':'n','ᵰ':'n','ᶇ':'n','ɳ':'n','ꝋ':'o','ꝍ':'o','ⱺ':'o','ø':'o','ƣ':'oi','ɛ':'e','ᶓ':'e','ɔ':'o','ᶗ':'o','ȣ':'ou','ꝓ':'p','ƥ':'p','ᵱ':'p','ᶈ':'p','ꝕ':'p','ᵽ':'p','ꝑ':'p','ꝙ':'q','ʠ':'q','ɋ':'q','ꝗ':'q','ɾ':'r','ᵳ':'r','ɼ':'r','ᵲ':'r','ᶉ':'r','ɍ':'r','ɽ':'r','ↄ':'c','ꜿ':'c','ɘ':'e','ɿ':'r','ʂ':'s','ᵴ':'s','ᶊ':'s','ȿ':'s','ɡ':'g','ᴑ':'o','ᴓ':'o','ᴝ':'u','ȶ':'t','ⱦ':'t','ƭ':'t','ᵵ':'t','ƫ':'t','ʈ':'t','ŧ':'t','ᵺ':'th','ɐ':'a','ᴂ':'ae','ǝ':'e','ᵷ':'g','ɥ':'h','ʮ':'h','ʯ':'h','ᴉ':'i','ʞ':'k','ꞁ':'l','ɯ':'m','ɰ':'m','ᴔ':'oe','ɹ':'r','ɻ':'r','ɺ':'r','ⱹ':'r','ʇ':'t','ʌ':'v','ʍ':'w','ʎ':'y','ᶙ':'u','ᵫ':'ue','ꝸ':'um','ⱴ':'v','ꝟ':'v','ʋ':'v','ᶌ':'v','ⱱ':'v','ⱳ':'w','ᶍ':'x','ƴ':'y','ỿ':'y','ɏ':'y','ʑ':'z','ⱬ':'z','ȥ':'z','ᵶ':'z','ᶎ':'z','ʐ':'z','ƶ':'z','ɀ':'z','œ':'oe','ₓ':'x'};
  const stringWithoutAccents = string
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  return stringWithoutAccents.replace(
    /[^\u0000-\u007E]/g,
    (character) => unicodeToAsciiMap[character] || ""
  );
}

socket.emit("getMessages"); //Demande la liste des messages

socket.on("messages", (message) => {
});

socket.on("message", (message) => {
  messageList.innerHTML +=
    "<div class='message-container'><div><span class='user'>" +
    message.user.name +
    "</span> <br><span class='message'>" +
    message.value +
    "</span> <div/><div/>";

  messageList.scrollTo(0, messageList.scrollHeight); // scroller en bas pour voir le dernier message

  let letters = message.value.split(""); // séparer les lettres
  let currentUser = message.user.name;

  one.textContent = currentUser

  letters.forEach((letter, index) => {
    setTimeout(() => {
      const findLetter = Array.from(alphabet).find((alphabetLetterElement) => {
        return (
          alphabetLetterElement.textContent.toLowerCase() ===
          letter.toLowerCase()
        );
      });
      
      findLetter.style.animation = `blink 1s steps(2,end)`;
      setTimeout(() => {
        findLetter.style.animation = null;
      }, 1000);
    }, index * 1000);
  });
}); // Reçoit l'historique message par message, possibilité de filtrer par ID

pseudoForm.addEventListener("submit", (event) => {
  event.preventDefault();
  
  socket.emit("setUsername", pseudo.value);
});

messageForm.addEventListener("submit", (event) => {
  event.preventDefault();
});

socket.emit("getUsers"); // Demande a recupere la liste complete des users
socket.on("users", (user) => {}); // Récupère la liste complete des users
socket.on(
  "updateUsername",
  (user) => (userList.innerHTML += user.name + "</br>")
); // // Reçoit la liste des users 1 par 1

function isError(isError, messageError) {
  if (isError) {
    result.textContent = messageError
    sendMessage.setAttribute('disabled', 'disabled')
    result.style.color = "#6C0D13";
    iconGood.style.display = "none";
    iconWrong.style.display = "block";
  } else {
    result.textContent = limit - message.value.length + "/" + limit + " caractères restants"
    sendMessage.removeAttribute("disabled", "disabled");
    result.style.color = "#192A3E";
    iconWrong.style.display = "none";
    iconGood.style.display = "block";
  }
}

var limit = 15;
result.textContent = limit + "/" + limit + " caractères restants";

if (message.value.length == 0) {
  sendMessage.setAttribute("disabled", "disabled");
  document.querySelector(".wrong").style.display = "none";
}

sendMessage.addEventListener("click", () => {
  async function wait() {
    convertToAscii(message.value);
    message.value = convertToAscii(message.value);
    socket.emit("message", message.value);
    message.value = "";
    isError(true, "Vous ne pouvez envoyer un message que toutes les 10 secondes")
    message.disabled = true;
    await new Promise((resolve) => setTimeout(resolve, 10000));
    isError(false)
    message.disabled = false;
  }
  wait();
});

message.addEventListener("input", function () {
  var textLength = message.value.length;
  if (textLength > limit) {
    isError(true, textLength + "/" + limit + " limite de caractères atteinte")
  } else if (emptyRegex.test(message.value)) {
    isError(true, "Votre message ne peut pas être vide")
  } else if (numberRegex.test(message.value)) {
    isError(true, "Votre message ne doit pas contenir de chiffre")
  }else if (specialCaracterRegex.test(message.value)) {
    isError(true, "Votre message ne doit pas contenir de caractère spécial")
  } else if (numberRegex.test(message.value)) {
    isError(true, "Votre message ne doit pas contenir de chiffre")
  } else if (emojiRegex.test(message.value)) {
    isError(true, "Votre message ne doit pas contenir d'émoji")
  } else {
    isError(false)
  }
});