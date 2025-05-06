const gameArea = document.getElementById('gameArea');
const target = document.getElementById('target');
const scoreBoard = document.getElementById('scoreBoard');
const Accuracy = document.getElementById('Accuracy');
const TotalClicks = document.getElementById('TotalClicks');
const movingTargetBtn = document.getElementById('moving-target');
const scatterShotBtn = document.getElementById('scatter-shot');

let mode = 0;
let score = 0;
let total_clicks = 0;
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

function reset(){
  score = 0;
  total_clicks = 0;
  accuracy = 0;
  scoreBoard.innerHTML = "Score: " + score;
  Accuracy.innerHTML = "Accuracy: " + accuracy + "%";
  TotalClicks.innerHTML = "Total Clicks: " + total_clicks;
}

// Enable Ctrl Button Reset
const rCtrl_listen = window.addEventListener("keydown", (e)=>{
  if(e.code == "ControlRight"){
    e.preventDefault();
    reset();
  }
});

// Change Modes
const moveTargetClick = movingTargetBtn.addEventListener("click",()=>{
  if(mode != 0){
    mode = 0;
    reset();
  }
});
const scatterShotClick = scatterShotBtn.addEventListener("click",()=>{
  if(mode != 1){
    mode = 1;
    reset();
  }
});


// Initial target position
moveTarget();




const target_click = target.addEventListener("contextmenu",(e)=>{
  moveTarget();
  score++;
  scoreBoard.innerHTML = "Score: " + score;
});

const disable_rmb_gameArea = gameArea.addEventListener("contextmenu", (e)=>{
  e.preventDefault();
  total_clicks++;
  accuracy = Math.round(score/total_clicks * 100);
  Accuracy.innerHTML = "Accuracy: " + accuracy + "%";
  TotalClicks.innerHTML = "Total Clicks: " + total_clicks;
});