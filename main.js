const gameArea = document.getElementById('gameArea');
const target = document.getElementById('main-target');
const scoreBoard = document.getElementById('scoreBoard');
const Accuracy = document.getElementById('Accuracy');
const TotalClicks = document.getElementById('TotalClicks');
const movingTargetBtn = document.getElementById('moving-target');
const scatterShotBtn = document.getElementById('scatter-shot');
const movingTargetTitle = document.getElementById('move-target-title');
const scatterShotTitle = document.getElementById('scatter-target-title');
const scatterHTMLForm = document.getElementById('scatter-form');
const scatterFormInput = document.getElementById('ball_num_input');
const scatterFormBtn = document.getElementById('scatter-generate-btn');

let scatterBalls;

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


function generateScatterShot(){
  let ball_num = scatterFormInput.value
  console.log(ball_num);
}

// Enable Ctrl Button Reset
const rCtrl_listen = window.addEventListener("keydown", (e)=>{
  if(e.code == "ControlRight"){
    e.preventDefault();
    reset();
  }
});

// Prevent Form Refresh
const scatterFormDisable = scatterHTMLForm.addEventListener("submit", (e)=>{
  e.preventDefault();
});

// Scatter Generate Button
const scatterGenerate = scatterFormBtn.addEventListener("click",()=>{
  generateScatterShot();
});

// Change Modes
const moveTargetClick = movingTargetBtn.addEventListener("click",()=>{
  if(mode != 0){
    mode = 0;
    reset();
    movingTargetTitle.classList.toggle("hide");
    scatterShotTitle.classList.toggle("hide");
  }
});
const scatterShotClick = scatterShotBtn.addEventListener("click",()=>{
  if(mode != 1){
    mode = 1;
    reset();
    movingTargetTitle.classList.toggle("hide");
    scatterShotTitle.classList.toggle("hide");
  }
});


// Initial target position
moveTarget();

const target_click = target.addEventListener("contextmenu",(e)=>{
  if(mode == 0){
    moveTarget();
    score++;
    scoreBoard.innerHTML = "Score: " + score;
  }
});

const disable_rmb_gameArea = gameArea.addEventListener("contextmenu", (e)=>{
  e.preventDefault();
  if(mode == 0){
    total_clicks++;
    accuracy = Math.round(score/total_clicks * 100);
    Accuracy.innerHTML = "Accuracy: " + accuracy + "%";
    TotalClicks.innerHTML = "Total Clicks: " + total_clicks;
  }
});