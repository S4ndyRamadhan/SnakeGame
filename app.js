const burger = document.querySelector(".burger");
const navLinks = document.querySelector(".nav-links");

burger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

const sentences = [
  "Welcome to my Website!",
  "U can play Snake Game Here.",
  "My name Sandy Aulia Ramadhan.",
  "Let’s work together!",
];

let sentenceIndex = 0;
let charIndex = 0;
const typeSpeed = 100;
const eraseSpeed = 50;
const delayBetween = 1300; // Time before switching to the next sentence

const typewriterElement = document.querySelector(".typewriter");

function type() {
  if (charIndex < sentences[sentenceIndex].length) {
    typewriterElement.textContent += sentences[sentenceIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typeSpeed);
  } else {
    setTimeout(erase, delayBetween);
  }
}

function erase() {
  if (charIndex > 0) {
    typewriterElement.textContent = sentences[sentenceIndex].substring(
      0,
      charIndex - 1
    );
    charIndex--;
    setTimeout(erase, eraseSpeed);
  } else {
    sentenceIndex = (sentenceIndex + 1) % sentences.length;
    setTimeout(type, typeSpeed);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  setTimeout(type, delayBetween);
});
