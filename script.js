window.addEventListener('DOMContentLoaded', () => {
  const hotbar = document.querySelector('.hotbar');
  const heading = document.querySelector('h1');
  heading.style.marginTop = hotbar.offsetHeight + 'px';

  const clickSounds = [
    new Audio("sounds/click1.mp3"),
    new Audio("sounds/click2.mp3"),
    new Audio("sounds/click3.mp3"),
    new Audio("sounds/click4.mp3"),
    new Audio("sounds/click5.mp3")
    ];
    
    let currentVolume = 1.0; // Default volume
    
    const volumeSlider = document.getElementById("volume");
    volumeSlider.addEventListener("input", (e) => {
    currentVolume = parseFloat(e.target.value); 
    console.log("Volume set to:", currentVolume);
    });
    
    document.addEventListener("keydown", (e) => {
    if (e.repeat) return;
    
    const randomIndex = Math.floor(Math.random() * clickSounds.length);
    const sound = clickSounds[randomIndex];
    
    const soundClone = sound.cloneNode(); // Clone for independent playback
    soundClone.volume = currentVolume;   
    soundClone.play().catch(err => console.error("Play error:", err));
    });
});

function startWPM() {
  const typingBox = document.getElementById("typing-box");
  const sampleElement = document.getElementById("sample-text");

  console.log("startWPM called")

  sampleText = sampleElement.innerText;
  typingBox.disabled = false;
  typingBox.value = "";
  typingBox.focus();
  startTime = new Date();

  typingBox.addEventListener("input", checkInput);

}

function checkInput() {
  let testEnded = false;
  const typingBox = document.getElementById("typing-box");
  const typedText = typingBox.value;

  console.log("checkInput called, length:", typedText.length);


  let correctChars = 0;
  for (let i = 0; i < typedText.length; i++) {
    if (typedText[i] === sampleText[i]) {
      correctChars++;
    }
  }
  const accuracy = ((correctChars / typedText.length) * 100).toFixed(2);
  document.getElementById("accuracy").textContent = `Accuracy: ${accuracy}%`;

  if (!testEnded && typedText.length >= sampleText.length) {
    testEnded = true;
    endWPM();
  }
}


function endWPM() {
  const typingBox = document.getElementById("typing-box");
  typingBox.disabled = true;

  const typedText = typingBox.value;
  console.log("Typed Text:", typedText)

  typingBox.disabled = true;
  typingBox.removeEventListener("input", checkInput);
}

document.addEventListener('keydown', (e) => {
  const key = e.key.toLowerCase();
  const keyElement = document.querySelector(`.key[data-key="${key}"]`);
  if (keyElement) {
    keyElement.classList.add('active');
  }
});

document.addEventListener('keyup', (e) => {
  const key = e.key.toLowerCase();
  const keyElement = document.querySelector(`.key[data-key="${key}"]`);
  if (keyElement) {
    keyElement.classList.remove('active');
  }
});


const layouts = {
  qwerty:  "QWERTYUIOPASDFGHJKL;ZXCVBNM,. ",
  dvorak:  ",.PYFGRCL/AOEUIDHTNSQJKXBMWVZ ",
  colemak: "QWFPGJLUY;ARSTDHNEIOZXCVBKM., "
};

const defaultMap = "QWERTYUIOPASDFGHJKL;ZXCVBNM,. ";
let currentLayout = "qwerty";
const keys = document.querySelectorAll('.key');

// Define the setLayout function globally
function setLayout(layoutName) {
  currentLayout = layoutName; // Set the current layout
  const layout = layouts[layoutName];

  if (!layout || layout.length !== keys.length) {
    console.error("Invalid layout or mismatched key count.");
    return;
  }

  keys.forEach((key, index) => {
    const char = layout[index];
    key.textContent = char;
  });
}

document.addEventListener("keydown", function(event) {
  const typingBox = document.getElementById("typing-box");
  const key = event.key;
  const keyUpper = event.key.toUpperCase();
  const index = defaultMap.indexOf(keyUpper); 

  if (typingBox.disabled) return;

  let capsLockOn = event.getModifierState("CapsLock");

  console.log("Key:", key, "Index:", index);

  if (index !== -1) {
    event.preventDefault(); // stop normal input

    let mappedChar = layouts[currentLayout][index];
    
    const shiftPressed = event.shiftKey;
    const shouldBeUpper = (shiftPressed && !capsLockOn) || (!shiftPressed && capsLockOn);

    if (!shouldBeUpper) {
      mappedChar = mappedChar.toLowerCase();
    }
      typingBox.value += mappedChar;

    const typedText = typingBox.value;
    const now = new Date();
    const elapsedTimeInMinutes = (now - startTime) / 1000 / 60;

    const wordsTyped = typedText.split(/\s+/).length;
    const wpm = Math.round(wordsTyped / elapsedTimeInMinutes);

    const wpmDisplay = document.getElementById("wpm");
    wpmDisplay.textContent = `WPM: ${wpm}`;

    checkInput();
  }
});

// text samples
const sampleTexts = {
  easy: "The quick brown fox jumps over the lazy dog.",
  medium: "The quick brown fox jumps over the lazy dog. This sentence contains every letter of the alphabet.",
  hard: "The quick brown fox jumps over the lazy dog. This sentence contains every letter of the alphabet, making it a pangram. It is often used for testing fonts, typing skills, and other similar tasks."
};

// update sample based on difficulty
function updateSampleText() {
  const difficultySelect = document.getElementById("difficulty");
  const selectedDifficulty = difficultySelect.value;
  
  const sampleTextElement = document.getElementById("sample-text");
  sampleTextElement.textContent = sampleTexts[selectedDifficulty];
}

document.getElementById("difficulty").addEventListener("change", updateSampleText);
updateSampleText();
