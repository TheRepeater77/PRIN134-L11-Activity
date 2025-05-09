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

let scatterBalls = [];

let mode = 0;
let score = 0;
let total_clicks = 0;
let accuracy = 0;
let scatter_count = 0;
let scatter_order = 0;
let ball_num = 0;

function moveTarget(input) {
  const gameAreaRect = gameArea.getBoundingClientRect();
  const maxX = gameAreaRect.width - input.offsetWidth;
  const maxY = gameAreaRect.height - input.offsetHeight;
  
  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);
  
  input.style.left = `${randomX}px`;
  input.style.top = `${randomY}px`;
}

function reset(){
  score = 0;
  total_clicks = 0;
  accuracy = 0;
  scatter_count = 0;
  scatter_order = 0;

  moveTarget(target);
  rescatter();

  scoreBoard.innerHTML = "Score: " + score;
  Accuracy.innerHTML = "Accuracy: " + accuracy + "%";
  TotalClicks.innerHTML = "Total Clicks: " + total_clicks;
}

function rescatter(){
  scatterBalls.forEach(scatterBall => {
    moveTarget(scatterBall);
    if(scatterBall.classList.contains("hide")){
      scatterBall.classList.toggle("hide");
    }
  });
}

function removeScatter(){
  scatterBalls.forEach(scatterBall => {
    scatterBall.remove();
});
}

function increaseScore(){
  score++;
  scoreBoard.innerHTML = "Score: " + score;
}

function increaseClicks(){
  total_clicks++;
  TotalClicks.innerHTML = "Total Clicks: " + total_clicks;
}

function increaseAccuracy(){
  if(mode == 0){
    accuracy = Math.round(score/total_clicks * 100);
  } else if (mode == 1 && scatter_count == 0){
    accuracy = Math.round(score/(total_clicks/ball_num) * 100);
  }
  Accuracy.innerHTML = "Accuracy: " + accuracy + "%";
}

function generateScatterShot(){
  ball_num = parseInt(scatterFormInput.value);
  for (let i = 0; i < ball_num; i++) {
    let scatter_ball = document.createElement("div");
    let scatter_text = document.createElement("p");
    scatter_ball.classList = "scatter-targets ball";
    scatter_text.classList = "scatter-text";
    scatter_text.innerHTML = i + 1;
    gameArea.append(scatter_ball);
    scatter_ball.append(scatter_text);
    moveTarget(scatter_ball);
    
    const scatter_ball_click = scatter_ball.addEventListener("contextmenu",(e)=>{
      e.preventDefault();
      
      if(scatter_count + 1 == ball_num){
        scatter_count = 0;
        scatter_order = 0;
        increaseScore();
        rescatter();
      } else if (scatter_count < ball_num && scatter_order + 1 == scatter_text.innerHTML){
        scatter_order++;
        scatter_count++;
        scatter_ball.classList.toggle("hide");
      } else {
        rescatter();
        scatter_order = 0;
        scatter_count = 0;
        increaseAccuracy();
      }
    });

    
    scatterBalls.push(scatter_ball);
  }
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
  if (parseInt(scatterFormInput.value) <= 10){
    reset();
    removeScatter();
    generateScatterShot();
  }
});

// Change Modes
const moveTargetClick = movingTargetBtn.addEventListener("click",()=>{
  if(mode != 0){
    mode = 0;
    reset();
    movingTargetTitle.classList.toggle("hide");
    scatterShotTitle.classList.toggle("hide");
    removeScatter();
    target.classList.toggle("hide");
  }
});
const scatterShotClick = scatterShotBtn.addEventListener("click",()=>{
  if(mode != 1){
    mode = 1;
    reset();
    movingTargetTitle.classList.toggle("hide");
    scatterShotTitle.classList.toggle("hide");

    target.classList.toggle("hide");
  }
});


// Initial target position
moveTarget(target);

const target_click = target.addEventListener("contextmenu",(e)=>{
  if(mode == 0){
    moveTarget(target);
    increaseScore();
  }
});

const disable_rmb_gameArea = gameArea.addEventListener("contextmenu", (e)=>{
  e.preventDefault();
  increaseClicks();
  increaseAccuracy();
});