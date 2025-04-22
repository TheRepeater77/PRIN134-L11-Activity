const gameArea = document.getElementById('gameArea');
const target = document.getElementById('target');
const scoreBoard = document.getElementById('scoreBoard');
const Accuracy = document.getElementById('Accuracy');



let score = 0;
let missclick = 0;
let accuracy = 0;

function moveTarget() {
  const gameAreaRect = gameArea.getBoundingClientRect();
  const maxX = gameAreaRect.width - target.offsetWidth;
  const maxY = gameAreaRect.height - target.offsetHeight;
  
  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);
  
  target.style.left = `${randomX}px`;
  target.style.top = `${randomY}px`;
}


// Initial target position
moveTarget();

const target_click = target.addEventListener("contextmenu",(e)=>{
  moveTarget();
  score++;
  scoreBoard.innerHTML = "Score: " + score;
});

const disable_rmb_gameArea = gameArea.addEventListener("contextmenu", (e)=>{
  e.preventDefault();
  missclick++;
  accuracy = Math.round(score/missclick * 100)/100;
  Accuracy.innerHTML = "Accuracy: " + accuracy + "%";
});