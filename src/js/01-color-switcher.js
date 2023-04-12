const bodyEl = document.querySelector('body');
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

let timerID = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeColor() {
  bodyEl.style.backgroundColor = getRandomHexColor();
}

startBtn.addEventListener('click', () => {
  startBtn.setAttribute('disabled', true);
  stopBtn.removeAttribute('disabled');
  timerID = setInterval(changeColor, 1000);
});

stopBtn.addEventListener('click', () => {
  startBtn.removeAttribute('disabled');
  stopBtn.setAttribute('disabled', true);
  clearInterval(timerID);
});
