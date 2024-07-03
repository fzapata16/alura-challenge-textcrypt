
const inputText = document.getElementById("inputText");
const outPutText = document.getElementById("outputText");
const cryptButton = document.getElementById("crypt");
const copyButton = document.getElementById("copyButton");
const pasteButton = document.getElementById("pasteButton");
const decryptButton = document.getElementById("decrypt");
const decriptImage = document.getElementById("decriptImage");
const newButton = document.getElementById("newButton");
const imageUno = "/assets/img/1.png";
const imageDos = "/assets/img/2.gif";
const defaultValue = "escriba aquí el texto. *";

const mapCryter = {
  "a": "ai",
  "e": "enter",
  "i": "imes",
  "o": "ober",
  "u": "ufat"
}

initialValues();

function initialValues() {
  inputText.value = defaultValue;
  outPutText.setAttribute("hidden", "true");
  decriptImage.removeAttribute("hidden");
  decriptImage.setAttribute("src", imageUno);
  inputText.removeAttribute("disabled");
  inputText.focus();
}

inputText.addEventListener("focus", () => inputText.value = "");
inputText.addEventListener("focusout", () => (inputText.value == '') ? (inputText.value = defaultValue) : '');
cryptButton.addEventListener("click", () => { startCrypting(); })
decryptButton.addEventListener("click", () => { startDecrypt(); })
copyButton.addEventListener("click", () => { copy(); })
pasteButton.addEventListener("click", () => { paste(); })

// Verificar que el string de entrada no contenga números, 
// ni caracteres diferentes a los admitidos.
function checkString(cadena) {
  for (let i = 0; i < cadena.length; i++) {
    let codigoAscii = cadena.charCodeAt(i);
    if (codigoAscii != 32 && (codigoAscii < 97 || codigoAscii > 122)) {
      return false;
    }
  }
  return true;
}

function startCrypting() {
  if (inputText.value != defaultValue) {
    if (checkString(inputText.value)) {
      imagesAndAnimations(true);

    } else {
      inputText.value = "Ingresó uno o más caractéres no válidos.";
      setTimeout(() => {
        initialValues();
      }, 1500)
    }
  }
}

function startDecrypt() {
  if (inputText.value != defaultValue) {
    imagesAndAnimations(false);
  }
}



function encrypt(value) {
  let character = "";

  for (const letter of value) {
    if (letter in mapCryter) {
      character += mapCryter[letter];
    } else {
      character += letter;
    }
  }
  // console.log(character);
  return character;
};

function decrypt(value) {
  let decryptedText = value;

  for (const [key, encryptedValue] of Object.entries(mapCryter)) {
    let regex = new RegExp(encryptedValue, "g");
    decryptedText = decryptedText.replace(regex, key);
  }

  return decryptedText;
}

function imagesAndAnimations(crypting) {
  decriptImage.removeAttribute("hidden");
  decriptImage.setAttribute("src", imageDos);

  setTimeout(() => {
    decriptImage.setAttribute("hidden", "true");
    outPutText.removeAttribute("hidden");


    outPutText.innerText = (crypting)
      ? encrypt(inputText.value)
      : decrypt(inputText.value);
  }, 1000);

  inputText.setAttribute("disabled", true)
}



const copy = () => navigator.clipboard.writeText(outPutText.value);


function paste() { navigator.clipboard.readText().then((clipText) => inputText.value = clipText) };



newButton.addEventListener("click", () => {
  initialValues();
})


