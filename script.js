window.addEventListener('DOMContentLoaded', () => {
    const hotbar = document.querySelector('.hotbar');
    const heading = document.querySelector('h1');
    heading.style.marginTop = hotbar.offsetHeight + 'px';
  });

 

function wpm(){ 
  const sampleText = document.getElementById("sample-text").textContent.trim();
  const input = document.getElementById("typing-box");
  const wpmDisplay = document.getElementById("wpm");

  let startTime = null;

  input.addEventListener("input", () => {
    const typed = input.value.trim();

    if (!startTime && typed.length > 0) {
      startTime = new Date();
    }

    if (typed.length === 0) {
      wpmDisplay.textContent = "WPM: 0";
      startTime = null;
      return;
    }

    const now = new Date();
    const elapsedTimeInMinutes = (now - startTime) / 1000 / 60;

    const wordsTyped = typed.split(/\s+/).length;
    const wpm = Math.round(wordsTyped / elapsedTimeInMinutes);

    wpmDisplay.textContent = `WPM: ${wpm}`;
  });
}

function startWPM() {
    const typingBox = document.getElementById("typing-box");
    const sampleElement = document.getElementById("sample-text");
  
    sampleText = sampleElement.innerText;
    typingBox.disabled = false;
    typingBox.value = "";
    typingBox.focus();
    startTime = new Date();
  
    typingBox.addEventListener("input", checkInput);

    wpm()
  }

  function checkInput() {
    const typingBox = document.getElementById("typing-box");
    const typedText = typingBox.value;
  
    if (typedText.length >= sampleText.length) {
      endWPM();
    }
  }

  function endWPM() {
    const typingBox = document.getElementById("typing-box");
    const result = document.getElementById("result");
    const endTime = new Date();
  
    const typedText = typingBox.value;
    typingBox.disabled = true;
  
    const elapsedTime = (endTime - startTime) / 1000 / 60; 
    const wordsTyped = sampleText.length / 5; 
    const wpm = Math.round(wordsTyped / elapsedTime);
  
    let correctChars = 0;
    for (let i = 0; i < typedText.length; i++) {
      if (typedText[i] === sampleText[i]) {
        correctChars++;
      }
    }
  
    const accuracy = ((correctChars / typedText.length) * 100).toFixed(2);
  
    document.getElementById("result").innerText = `Accuracy: ${accuracy}%`;
  
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