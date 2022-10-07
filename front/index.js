const socket = io("https://whispering-chamber-09886.herokuapp.com");

const messageForm = document.getElementById("messageForm");
const messageList = document.getElementById("messageList");
const sendMessage = document.getElementById("sendMessage");
const sendMessageSvg = document.querySelector("#sendMessage svg");
const message = document.getElementById("message");
const userList = document.getElementById("userList");
const result = document.getElementById("result");
const one = document.getElementById("one");
const two = document.getElementById("two");
const iconGood = document.querySelector(".good")
const iconWrong = document.querySelector(".wrong")
const alphabet = document.querySelectorAll(".letter");

const specialCaracterRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
const emojiRegex = /\p{Emoji}/u;
const emptyRegex = /^ *$/;
const numberRegex = /\d/;
let userArray = [];
let limit = 15;
let fileAttente = [];
let callLightning = true;
const firstBlinkTime = 900; // On met 900ms à allumer
const secBlinkTime = firstBlinkTime + 100 // On met 100ms à éteindre
const thirdBlinkTime = secBlinkTime + 100 // On met 100ms à allumer
const fourthBlinkTime = thirdBlinkTime + 500 // 500ms à éteindre 

if (localStorage.isConnected !== "true") {
  window.location.href = 'login.html';
}

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

function asTabs(node) {
  var tabs = [];
  for (var i = 0; i < node.childNodes.length; i++) {
    var child = node.childNodes[i];
    if (child.nodeType == document.ELEMENT_NODE)
      tabs.push(child);
  }
  var tabList = document.createElement("div");
  tabs.forEach(function (tab, i) {
    var button = document.createElement("button");
    button.innerHTML = `<div class="tv-button tv-button-${i}"><svg width="20" height="20" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="20" cy="20" r="20" fill="#192A3E"/>
    <circle cx="20.0002" cy="20" r="12.6316" fill="#101E2B"/>
    </svg>`;
    button.addEventListener("click", function () { selectTab(i); });
    tabList.appendChild(button);
  });
  node.insertBefore(tabList, node.firstChild);
  function selectTab(n) {
    tabs.forEach(function (tab, i) {
      if (i == n) {
        // document.querySelector(".tv-button-" + i ).innerHTML = `<svg width="20" height="20" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="20" fill="#192A3E"/>
        // <circle cx="20.0002" cy="20" r="12.6316" fill="#213B54"/></svg>`
        document.querySelector(".tv-button-" + i).innerHTML = `<svg width="20" height="20" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_130_1086)">
        <circle cx="20" cy="20" r="20" fill="#192A3E"/>
        <g filter="url(#filter0_f_130_1086)">
        <path d="M4.98832 14.4764C8.03927 6.1869 17.234 1.93736 25.5236 4.98832C33.8131 8.03927 38.0626 17.234 35.0117 25.5236C31.9607 33.8131 22.766 38.0626 14.4764 35.0117C6.1869 31.9607 1.93736 22.766 4.98832 14.4764Z" fill="url(#paint0_radial_130_1086)" style="mix-blend-mode:screen"/>
        <path d="M4.98832 14.4764C8.03927 6.1869 17.234 1.93736 25.5236 4.98832C33.8131 8.03927 38.0626 17.234 35.0117 25.5236C31.9607 33.8131 22.766 38.0626 14.4764 35.0117C6.1869 31.9607 1.93736 22.766 4.98832 14.4764Z" fill="url(#paint1_radial_130_1086)" style="mix-blend-mode:screen"/>
        </g>
        <circle cx="20.0002" cy="20" r="12.6316" fill="#1D29FF"/>
        </g>
        <defs>
        <filter id="filter0_f_130_1086" x="-6" y="-6" width="52" height="52" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
        <feGaussianBlur stdDeviation="5" result="effect1_foregroundBlur_130_1086"/>
        </filter>
        <radialGradient id="paint0_radial_130_1086" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(8.5 25) rotate(-45) scale(29.6985 256.241)">
        <stop stop-color="#1D1DFF"/>
        <stop offset="1" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="paint1_radial_130_1086" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(33 21) rotate(-180) scale(26 224.33)">
        <stop stop-color="#1D1DFF"/>
        <stop offset="1" stop-opacity="0"/>
        </radialGradient>
        <clipPath id="clip0_130_1086">
        <rect width="40" height="40" fill="white"/>
        </clipPath>
        </defs>
        </svg>`
        tab.style.display = "block";
      } else {
        document.querySelector(".tv-button-" + i).innerHTML = `<svg width="20" height="20" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="20" cy="20" r="20" fill="#192A3E"/>
        <circle cx="20.0002" cy="20" r="12.6316" fill="#101E2B"/> </svg>`
        tab.style.display = "none"
      }
    });
  }
  selectTab(0);
}
asTabs(document.querySelector(".tv"));

function convertToAscii(string) {
  const unicodeToAsciiMap = { 'Ⱥ': 'A', 'Æ': 'AE', 'Ꜻ': 'AV', 'Ɓ': 'B', 'Ƀ': 'B', 'Ƃ': 'B', 'Ƈ': 'C', 'Ȼ': 'C', 'Ɗ': 'D', 'ǲ': 'D', 'ǅ': 'D', 'Đ': 'D', 'Ƌ': 'D', 'Ǆ': 'DZ', 'Ɇ': 'E', 'Ꝫ': 'ET', 'Ƒ': 'F', 'Ɠ': 'G', 'Ǥ': 'G', 'Ⱨ': 'H', 'Ħ': 'H', 'Ɨ': 'I', 'Ꝺ': 'D', 'Ꝼ': 'F', 'Ᵹ': 'G', 'Ꞃ': 'R', 'Ꞅ': 'S', 'Ꞇ': 'T', 'Ꝭ': 'IS', 'Ɉ': 'J', 'Ⱪ': 'K', 'Ꝃ': 'K', 'Ƙ': 'K', 'Ꝁ': 'K', 'Ꝅ': 'K', 'Ƚ': 'L', 'Ⱡ': 'L', 'Ꝉ': 'L', 'Ŀ': 'L', 'Ɫ': 'L', 'ǈ': 'L', 'Ł': 'L', 'Ɱ': 'M', 'Ɲ': 'N', 'Ƞ': 'N', 'ǋ': 'N', 'Ꝋ': 'O', 'Ꝍ': 'O', 'Ɵ': 'O', 'Ø': 'O', 'Ƣ': 'OI', 'Ɛ': 'E', 'Ɔ': 'O', 'Ȣ': 'OU', 'Ꝓ': 'P', 'Ƥ': 'P', 'Ꝕ': 'P', 'Ᵽ': 'P', 'Ꝑ': 'P', 'Ꝙ': 'Q', 'Ꝗ': 'Q', 'Ɍ': 'R', 'Ɽ': 'R', 'Ꜿ': 'C', 'Ǝ': 'E', 'Ⱦ': 'T', 'Ƭ': 'T', 'Ʈ': 'T', 'Ŧ': 'T', 'Ɐ': 'A', 'Ꞁ': 'L', 'Ɯ': 'M', 'Ʌ': 'V', 'Ꝟ': 'V', 'Ʋ': 'V', 'Ⱳ': 'W', 'Ƴ': 'Y', 'Ỿ': 'Y', 'Ɏ': 'Y', 'Ⱬ': 'Z', 'Ȥ': 'Z', 'Ƶ': 'Z', 'Œ': 'OE', 'ᴀ': 'A', 'ᴁ': 'AE', 'ʙ': 'B', 'ᴃ': 'B', 'ᴄ': 'C', 'ᴅ': 'D', 'ᴇ': 'E', 'ꜰ': 'F', 'ɢ': 'G', 'ʛ': 'G', 'ʜ': 'H', 'ɪ': 'I', 'ʁ': 'R', 'ᴊ': 'J', 'ᴋ': 'K', 'ʟ': 'L', 'ᴌ': 'L', 'ᴍ': 'M', 'ɴ': 'N', 'ᴏ': 'O', 'ɶ': 'OE', 'ᴐ': 'O', 'ᴕ': 'OU', 'ᴘ': 'P', 'ʀ': 'R', 'ᴎ': 'N', 'ᴙ': 'R', 'ꜱ': 'S', 'ᴛ': 'T', 'ⱻ': 'E', 'ᴚ': 'R', 'ᴜ': 'U', 'ᴠ': 'V', 'ᴡ': 'W', 'ʏ': 'Y', 'ᴢ': 'Z', 'ᶏ': 'a', 'ẚ': 'a', 'ⱥ': 'a', 'æ': 'ae', 'ꜻ': 'av', 'ɓ': 'b', 'ᵬ': 'b', 'ᶀ': 'b', 'ƀ': 'b', 'ƃ': 'b', 'ɵ': 'o', 'ɕ': 'c', 'ƈ': 'c', 'ȼ': 'c', 'ȡ': 'd', 'ɗ': 'd', 'ᶑ': 'd', 'ᵭ': 'd', 'ᶁ': 'd', 'đ': 'd', 'ɖ': 'd', 'ƌ': 'd', 'ı': 'i', 'ȷ': 'j', 'ɟ': 'j', 'ʄ': 'j', 'ǆ': 'dz', 'ⱸ': 'e', 'ᶒ': 'e', 'ɇ': 'e', 'ꝫ': 'et', 'ƒ': 'f', 'ᵮ': 'f', 'ᶂ': 'f', 'ɠ': 'g', 'ᶃ': 'g', 'ǥ': 'g', 'ⱨ': 'h', 'ɦ': 'h', 'ħ': 'h', 'ƕ': 'hv', 'ᶖ': 'i', 'ɨ': 'i', 'ꝺ': 'd', 'ꝼ': 'f', 'ᵹ': 'g', 'ꞃ': 'r', 'ꞅ': 's', 'ꞇ': 't', 'ꝭ': 'is', 'ʝ': 'j', 'ɉ': 'j', 'ⱪ': 'k', 'ꝃ': 'k', 'ƙ': 'k', 'ᶄ': 'k', 'ꝁ': 'k', 'ꝅ': 'k', 'ƚ': 'l', 'ɬ': 'l', 'ȴ': 'l', 'ⱡ': 'l', 'ꝉ': 'l', 'ŀ': 'l', 'ɫ': 'l', 'ᶅ': 'l', 'ɭ': 'l', 'ł': 'l', 'ſ': 's', 'ẜ': 's', 'ẝ': 's', 'ɱ': 'm', 'ᵯ': 'm', 'ᶆ': 'm', 'ȵ': 'n', 'ɲ': 'n', 'ƞ': 'n', 'ᵰ': 'n', 'ᶇ': 'n', 'ɳ': 'n', 'ꝋ': 'o', 'ꝍ': 'o', 'ⱺ': 'o', 'ø': 'o', 'ƣ': 'oi', 'ɛ': 'e', 'ᶓ': 'e', 'ɔ': 'o', 'ᶗ': 'o', 'ȣ': 'ou', 'ꝓ': 'p', 'ƥ': 'p', 'ᵱ': 'p', 'ᶈ': 'p', 'ꝕ': 'p', 'ᵽ': 'p', 'ꝑ': 'p', 'ꝙ': 'q', 'ʠ': 'q', 'ɋ': 'q', 'ꝗ': 'q', 'ɾ': 'r', 'ᵳ': 'r', 'ɼ': 'r', 'ᵲ': 'r', 'ᶉ': 'r', 'ɍ': 'r', 'ɽ': 'r', 'ↄ': 'c', 'ꜿ': 'c', 'ɘ': 'e', 'ɿ': 'r', 'ʂ': 's', 'ᵴ': 's', 'ᶊ': 's', 'ȿ': 's', 'ɡ': 'g', 'ᴑ': 'o', 'ᴓ': 'o', 'ᴝ': 'u', 'ȶ': 't', 'ⱦ': 't', 'ƭ': 't', 'ᵵ': 't', 'ƫ': 't', 'ʈ': 't', 'ŧ': 't', 'ᵺ': 'th', 'ɐ': 'a', 'ᴂ': 'ae', 'ǝ': 'e', 'ᵷ': 'g', 'ɥ': 'h', 'ʮ': 'h', 'ʯ': 'h', 'ᴉ': 'i', 'ʞ': 'k', 'ꞁ': 'l', 'ɯ': 'm', 'ɰ': 'm', 'ᴔ': 'oe', 'ɹ': 'r', 'ɻ': 'r', 'ɺ': 'r', 'ⱹ': 'r', 'ʇ': 't', 'ʌ': 'v', 'ʍ': 'w', 'ʎ': 'y', 'ᶙ': 'u', 'ᵫ': 'ue', 'ꝸ': 'um', 'ⱴ': 'v', 'ꝟ': 'v', 'ʋ': 'v', 'ᶌ': 'v', 'ⱱ': 'v', 'ⱳ': 'w', 'ᶍ': 'x', 'ƴ': 'y', 'ỿ': 'y', 'ɏ': 'y', 'ʑ': 'z', 'ⱬ': 'z', 'ȥ': 'z', 'ᵶ': 'z', 'ᶎ': 'z', 'ʐ': 'z', 'ƶ': 'z', 'ɀ': 'z', 'œ': 'oe', 'ₓ': 'x' };
  const stringWithoutAccents = string
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  return stringWithoutAccents.replace(
    /[^\u0000-\u007E]/g,
    (character) => unicodeToAsciiMap[character] || ""
  );
}

function renderMessageList(message) {
  messageList.innerHTML +=
    "<div class='message-container'><div><span class='user'>" +
    message.user.name +
    "</span> <br><span class='message'>" +
    message.value +
    "</span> <div/><div/>";

  messageList.scrollTo(0, messageList.scrollHeight); // scroller en bas pour voir le dernier message
}

function renderUserList(userArray) {
  userArray.forEach(user => {
    userList.innerHTML += user.name + "</br>"
  })
}

function updateAndRenderUserArray(newUser) {
  console.log("newUser : ", newUser);
  let isInList = false
  if (userArray.length > 0) {
    userArray.forEach(user => {
      if (user.id == newUser.id) {
        isInList = true
        if (user.name !== newUser.name) {
          user.name = newUser.name
        }
      }
    })

    if (!isInList) {
      userArray.push(newUser)
    }
  } else {
    userArray.push(newUser)
  }
  console.log("userArray : ", userArray);
  userList.innerHTML = ""
  renderUserList(userArray)
}

socket.emit("setUsername", localStorage.pseudo);

socket.emit("getMessages"); //Demande la liste des messages

socket.on("messages", (message) => {
});

socket.on("message", (message) => {
})

socket.emit("getMessages"); //Demande la liste des messages

socket.on("messages", (messages) => {
});

socket.on("message", (message) => {
  if (verifyMessage(message.value, limit)) {
    renderMessageList(message)
    if (fileAttente.length > 0) callLightning = false;
    fileAttente.push(message);
    if (callLightning) lightning();
  }
}); // Reçoit l'historique message par message, possibilité de filtrer par ID



socket.emit("getUsers"); // Demande a recupere la liste complete des users
socket.on("users", (user) => { }); // Récupère la liste complete des users
socket.on(
  "updateUsername",
  user => {
    updateAndRenderUserArray(user)
  }
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
  } else if (specialCaracterRegex.test(message.value)) {
    isError(true, "Votre message ne doit pas contenir de caractère spécial")
  } else if (numberRegex.test(message.value)) {
    isError(true, "Votre message ne doit pas contenir de chiffre")
  } else if (emojiRegex.test(message.value)) {
    isError(true, "Votre message ne doit pas contenir d'émoji")
  } else {
    isError(false)
  }
});



function lightning() {
  callLightning = false;
  console.log("\nlightning");

  if (fileAttente.length > 0) {
    const msg = fileAttente[0];

    let letters = msg.value.split(""); // séparer les lettres
    let currentUser = msg.user.name; // Récupère le username courant (du message affiché)
    one.textContent = currentUser;

    letters.forEach((letter, index) => {
      setTimeout(() => {
        let letterById = document.getElementById(letter.toUpperCase());
        letterById.classList.remove("off") // On allume l'ampoule
        letterById.classList.add("on")

        setTimeout(() => {
          letterById.classList.remove("on") // On eteint l'ampoule
          letterById.classList.add("off")

          if (index == letters.length - 1) { // Si on se trouve sur la dernière lettre du message
            console.log("On doit faire clignoter les ampoules du message : ", msg.value);
            blinkLight();
            setTimeout(() => {
              fileAttente.splice(0, 1)
              lightning()
            }, fourthBlinkTime + 1000)
          }
        }, 900);
      }, index * 1000);
    });
    if (fileAttente.length == 0) callLightning = true
  }
  callLightning = true
}

function lightTheLamp(isOn) {
  lettersByClassName = document.getElementsByClassName("letter")

  if (isOn) {
    for (let lamp = 0; lamp < lettersByClassName.length; lamp++) {
      lettersByClassName[lamp].classList.remove("off") // On allume l'ampoule
      lettersByClassName[lamp].classList.add("on")
    }
  } else {
    for (let lamp = 0; lamp < lettersByClassName.length; lamp++) {
      lettersByClassName[lamp].classList.remove("on") // On éteint l'ampoule
      lettersByClassName[lamp].classList.add("off")
    }
  }
}

function blinkLight() {
  setTimeout(() => {
    console.log("On allume");
    lightTheLamp(true)
  }, firstBlinkTime)
  setTimeout(() => {
    console.log("On éteint");
    lightTheLamp(false)
  }, secBlinkTime)
  setTimeout(() => {
    console.log("On allume");
    lightTheLamp(true)
  }, thirdBlinkTime)
  setTimeout(() => {
    console.log("On éteint");
    lightTheLamp(false)
  }, fourthBlinkTime)
}