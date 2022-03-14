const CELL_SIZE = 20;
const CANVAS_SIZE = 400;
const REDRAW_INTERVAL = 50;
const WIDTH = CANVAS_SIZE / CELL_SIZE;
const HEIGHT = CANVAS_SIZE / CELL_SIZE;
const DIRECTION = {
  STOP: -1,
  LEFT: 0,
  RIGHT: 1,
  UP: 2,
  DOWN: 3,
};
let MOVE_INTERVAL = 150;

let eatSound = new Audio();
let levelAudio = new Audio();
let deadAudio = new Audio();
let doneAudio = new Audio();

eatSound.src = "./assets/audio/eat.mp3";
levelAudio.src = "./assets/audio/level-up.mp3";
deadAudio.src = "./assets/audio/game-over.mp3";
doneAudio.src = "./assets/audio/done.mp3";
var sum = 0;
// declare wall
var wallX = [];
var wallY = [];
var levelWall2 = [
  {
    x1: 5,
    x2: 15,
    y: 10,
  },
  {
    x1: 5,
    x2: 15,
    y: 3,
  },
];
var levelWall3 = [
  {
    x1: 5,
    x2: 15,
    y: 15,
  },
];
var levelWall4 = [
  {
    x1: 5,
    x2: 15,
    y: 20,
  },
];
var levelWall5 = [
  {
    x1: 5,
    x2: 15,
    y: 25,
  },
];
// end declare wall

function initPosition() {
  return {
    x: Math.floor(Math.random() * WIDTH),
    y: Math.floor(Math.random() * HEIGHT),
  };
}

function initHeadAndBody() {
  let head = initPosition();
  let body = [{ x: head.x, y: head.y }];
  return {
    head: head,
    body: body,
  };
}

function initDirection() {
  return Math.floor(Math.random() * 4);
}

function initSnake(color) {
  return {
    color: color,
    ...initHeadAndBody(),
    direction: initDirection(),
    score: 0,
    health: 3,
  };
}
let heartIcon = {
  position:initPosition()
};
var life = [
  {
      x: sum,
      y: 0
  },
  {
      x: sum + 20,
      y: 0
  },
  {
      x: sum + 40,
      y: 0
  },
];
let lifes = {
  color: "green",
  position: initPosition(),
};

let snake1 = initSnake("red");

let apple1 = {
  color: "red",
  position: initPosition(),
};

let apple2 = {
  color: "red",
  position: initPosition(),
};

function isPrime(number) {
  let divider = 0;

  for (let i = 1; i <= number; i++) {
    if (number % i == 0) {
      divider++;
    }
  }
  return divider == 2 ? true : false;
}

// start draw life
function drawLife(ctx, lifes) {
  let img = document.getElementById("heart");
  ctx.drawImage(
    img,
    lifes.position.x * CELL_SIZE,
    lifes.position.y * CELL_SIZE,
    CELL_SIZE,
    CELL_SIZE
  );
}
if (isPrime(snake1.score)) {
  drawLife(ctx, lifes);
}
// end draw life

// start draw cell
function drawCell(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}
// end draw cell

// start draw level
function drawLevel() {
  let levelCanvas = document.getElementById("levelBoard");

  if (levelCanvas.getContext) {
    let levelCtx = levelCanvas.getContext("2d");

    levelCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    levelCtx.font = "25px Arial";
    levelCtx.fillStyle = "blue";
    levelCtx.fillText("Level: " + level, 13, levelCanvas.scrollHeight / 2);
  }
}
// end draw level

// start draw score
function drawScore(snake) {
  let scoreCanvas = document.getElementById("scoreBoard");

  if (scoreCanvas.getContext) {
    let scoreCtx = scoreCanvas.getContext("2d");

    scoreCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    scoreCtx.font = "25px Arial";
    scoreCtx.fillStyle = snake.color;
    scoreCtx.fillText("Score: " + snake.score, 7, scoreCanvas.scrollHeight / 2);
  }
}
// end draw score

// start draw speed
function drawSpeed() {
  let speedCanvas = document.getElementById("speedBoard");

  if (speedCanvas.getContext) {
    let speedCtx = speedCanvas.getContext("2d");

    speedCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    speedCtx.font = "25px Arial";
    speedCtx.fillStyle = "#8A2BE2";
    speedCtx.fillText(
      "Speed : " + MOVE_INTERVAL,
      7,
      speedCanvas.scrollHeight / 2
    );
  }
}
// end draw speed

// start draw health
function drawHealth(snake) {
  let healthCanvas = document.getElementById("healthBoard");

  if (healthCanvas.getContext) {
    let healthCtx = healthCanvas.getContext("2d");

    healthCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    healthCtx.font = "25px Arial";
    healthCtx.fillStyle = "green";
    healthCtx.fillText(
      "Lifes : " + snake.health,
      10,
      healthCanvas.scrollHeight / 2
    );
  }
}
// end draw health

// initial wall
function initWall2() {
  for (let i = 0; i < levelWall2.length; i++) {
    for (let j = levelWall2[i].x1; j <= levelWall2[i].x2; j++) {
      wallX.push(j);
      wallY.push(levelWall2[i].y);
    }
  }
}

function initWall3() {
  for (let i = 0; i < levelWall3.length; i++) {
    for (let j = levelWall3[i].x1; j <= levelWall3[i].x2; j++) {
      wallX.push(j);
      wallY.push(levelWall3[i].y);
    }
  }
}

function initWall4() {
  for (let i = 0; i < levelWall4.length; i++) {
    for (let j = levelWall4[i].x1; j <= levelWall4[i].x2; j++) {
      wallX.push(j);
      wallY.push(levelWall4[i].y);
    }
  }
}

function initWall5() {
  for (let i = 0; i < levelWall5.length; i++) {
    for (let j = levelWall5[i].x1; j <= levelWall5[i].x2; j++) {
      wallX.push(j);
      wallY.push(levelWall5[i].y);
    }
  }
}
//end initial wall

// create wall
function createWall() {
  let wallCanvas = document.getElementById("snakeBoard");
  let ctx = wallCanvas.getContext("2d");
  for (let i = 0; i < wallX.length; i++) {
    drawCell(ctx, wallX[i], wallY[i], "#808080");
  }
}
// end create wall

//snake hit wall
function stop(snake) {
 
  snake.direction = DIRECTION.STOP;
  
}

function reStart() {
  snake1.score = 0;
  level = 1;
  wallX = [];
  wallY = [];
  MOVE_INTERVAL = 150;
}

function hitTheWall(snake) {
  for (let i = 0; i < wallX.length; i++) {
    if (
      snake.head.x === wallX[i] &&
      (snake.direction == 2 || snake.direction == 3)
    ) {
      if (snake.head.y - 1 === wallY[i] || snake.head.y + 1 === wallY[i]) {
        stop(snake);
        reStart();
      }
    }

    if (
      snake.head.y === wallY[i] &&
      (snake.direction == 0 || snake.direction == 1)
    ) {
      if (snake.head.x - 1 === wallX[i] || snake.head.x + 1 === wallX[i]) {
        stop(snake);
        reStart();
      }
    }
  }
}
// end snake hit wall

// level statement
let level = 1;
function initLevel(snake) {
  if (level === 1 && snake.score === 5) {
    levelUp();
    MOVE_INTERVAL -= 20;
    initWall2();
  }
  if (level === 2 && snake.score === 10) {
    levelUp();
    MOVE_INTERVAL -= 20;
  }
  if (level === 3 && snake.score === 15) {
    levelUp();
    MOVE_INTERVAL -= 20;
    initWall3();
  }
  if (level === 4 && snake.score === 20) {
    levelUp();
    MOVE_INTERVAL -= 20;
    initWall4();
  }
  if (level === 5 && snake.score === 25) {
    doneAudio.play();
    alert("Congratulation");
    reStart();
  }
}

function levelUp() {
  level++;
  if (level == 2) {
    levelAudio.play();
    alert("Level Up To : " + level);
  } else if (level == 3) {
    levelAudio.play();
    alert("Level Up To : " + level);
  } else if (level == 4) {
    levelAudio.play();
    alert("Level Up To : " + level);
    levelAudio.play();
  } else if (level == 5) {
    alert("Level Up To : " + level);
  }
}

// end level statement
function draw() {
  setInterval(function () {
    let snakeCanvas = document.getElementById("snakeBoard");
    let ctx = snakeCanvas.getContext("2d");

    ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // draw snake head 
        if (snake1.direction == 0) {
            let imgSnakeHead = document.getElementById("snake-head-left");
            ctx.drawImage(imgSnakeHead, snake1.head.x * CELL_SIZE, snake1.head.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }
        else if (snake1.direction == 1) {
            let imgSnakeHead = document.getElementById("snake-head-right");
            ctx.drawImage(imgSnakeHead, snake1.head.x * CELL_SIZE, snake1.head.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }
        else if (snake1.direction == 2) {
            let imgSnakeHead = document.getElementById("snake-head-up");
            ctx.drawImage(imgSnakeHead, snake1.head.x * CELL_SIZE, snake1.head.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }
        else if (snake1.direction == 3) {
            let imgSnakeHead = document.getElementById("snake-head-down");
            ctx.drawImage(imgSnakeHead, snake1.head.x * CELL_SIZE, snake1.head.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        }

    for (let i = 1; i < snake1.body.length; i++) {
      //membuat body ular
      var bodyImg = document.getElementById("body");
      ctx.drawImage(
        bodyImg,
        snake1.body[i].x * CELL_SIZE,
        snake1.body[i].y * CELL_SIZE,
        CELL_SIZE,
        CELL_SIZE
      );
    }

    //draw heart
    let heartImg = document.getElementById("heart");
    for(var i = 0; i < life.length; i++){
    
      ctx.drawImage(
          heartImg,
          life[i].x,
          life[i].y,
          CELL_SIZE,
          CELL_SIZE
      );   
  }
    let img = document.getElementById("apple");
    ctx.drawImage(
      img,
      apple1.position.x * CELL_SIZE,
      apple1.position.y * CELL_SIZE,
      CELL_SIZE,
      CELL_SIZE
    );
    ctx.drawImage(
      img,
      apple2.position.x * CELL_SIZE,
      apple2.position.y * CELL_SIZE,
      CELL_SIZE,
      CELL_SIZE
    );

    if (isPrime(snake1.score)) {
      drawLife(ctx, lifes);
    }

    createWall();
    drawLevel();
    drawScore(snake1);
    drawSpeed(snake1);
    drawHealth(snake1);
    initLevel(snake1);
  }, REDRAW_INTERVAL);
}

function teleport(snake) {
  if (snake.head.x < 0) {
    snake.head.x = CANVAS_SIZE / CELL_SIZE - 1;
  }
  if (snake.head.x >= WIDTH) {
    snake.head.x = 0;
  }
  if (snake.head.y < 0) {
    snake.head.y = CANVAS_SIZE / CELL_SIZE - 1;
  }
  if (snake.head.y >= HEIGHT) {
    snake.head.y = 0;
  }
}

function eat(snake, apple1, apple2) {
  if (snake.head.x == apple1.position.x && snake.head.y == apple1.position.y) {
    apple1.position = initPosition();
    eatSound.play();
    snake.score++;
    snake.scoreReset++;
    snake.body.push({ x: snake.head.x, y: snake.head.y });
  } else if (
    snake.head.x == apple2.position.x &&
    snake.head.y == apple2.position.y
  ) {
    apple2.position = initPosition();
    eatSound.play();
    snake.score++;
    snake.scoreReset++;
    snake.body.push({ x: snake.head.x, y: snake.head.y });
  }else if (snake.head.x == lifes.position.x && snake.head.y == lifes.position.y && isPrime(snake.score)) {
    lifes.position = initPosition();
    snake.lifes++;
    //var msk = document.getElementById("getHealth");
    eatSound.play();
    for(var j = 0; j < snake.lifes; j++){
        if(snake.lifes === 1){
            life.push({x: sum + 60, y: 0});
            sum += 20;
        }
    } 
    snake.lifes = 0;
}

  snake.lifes = 0;
}

function moveLeft(snake) {
  snake.head.x--;
  teleport(snake);
  eat(snake, apple1, apple2);
 // hitTheWall(snake);
}

function moveRight(snake) {
  snake.head.x++;
  teleport(snake);
  eat(snake, apple1, apple2);
 // hitTheWall(snake);
}

function moveDown(snake) {
  snake.head.y++;
  teleport(snake);
  eat(snake, apple1, apple2);
 // hitTheWall(snake);
}

function moveUp(snake) {
  snake.head.y--;
  teleport(snake);
  eat(snake, apple1, apple2);
 // hitTheWall(snake);
}

function checkCollision(snakes) {
  let isCollide = false;
  for (let i = 0; i < snakes.length; i++) {
      for (let j = 0; j < snakes.length; j++) {
          for (let k = 1; k < snakes[j].body.length; k++) {
              if (snakes[i].head.x == snakes[j].body[k].x && snakes[i].head.y == snakes[j].body[k].y) {
                  life.length--;
                   deadAudio.play();
                   
                  sum -= 20;
                  if(life.length == 0){
                      
                      isCollide = true;
                  }
                  
              }
          }
      }
  }

  //check collision wall and snake
  for (let i = 0; i < wallX.length; i++) {
    if (snake1.head.x === wallX[i] && (snake1.direction == 2 || snake1.direction == 3)) {
        if (snake1.head.y === wallY[i] || snake1.head.y === wallY[i]) {
            deadAudio.play();
       
            life.length--;
            if (life.length == 0) {
              
                isCollide = true;
            }
        }
    }
    if (snake1.head.y === wallY[i] && (snake1.direction == 0 || snake1.direction == 1)) {
        if (snake1.head.x === wallX[i] || snake1.head.x === wallX[i]) {
            deadAudio.play();
           
            snake1.health--;
            if (snake1.health == 0) {
                isCollide = true;
            }
        }
    }
}

  //code for check apple and health so it doesn't appear in the obstacle
  for (let i = 0; i < wallX.length; i++) {
      if (apple1.position.x === wallX[i]) {
          if (apple1.position.y === wallY[i] || apple1.position.y === wallY[i]) {
              apple1.position = initPosition();
          }
      }
      if (apple2.position.y === wallY[i]) {
          if (apple2.position.x === wallX[i] || apple2.position.x === wallX[i]) {
              apple2.position = initPosition();
          }
      }
      if (lifes.position.y === wallY[i]) {
          if (lifes.position.x === wallX[i] || lifes.position.x === wallX[i]) {
              lifes.position = initPosition();
          }
      }
  }

  //if collide and life 0 exec code game over
  if (isCollide) {
          deadAudio.play();
          alert("Game over");
          // life = [
          //   {
          //       x: sum,
          //       y: 0
          //   },
          //   {
          //       x: sum + 20,
          //       y: 0
          //   },
          //   {
          //       x: sum + 40,
          //       y: 0
          //   },
          // ];
          location.reload();
          MOVE_INTERVAL = 150;
          snake1 = initSnake("purple");
      
  }
  return isCollide;
}

function move(snake) {
  switch (snake.direction) {
    case DIRECTION.LEFT:
      moveLeft(snake);
      break;
    case DIRECTION.RIGHT:
      moveRight(snake);
      break;
    case DIRECTION.DOWN:
      moveDown(snake);
      break;
    case DIRECTION.UP:
      moveUp(snake);
      break;
  }
  moveBody(snake);
  if (!checkCollision([snake1])) {
    setTimeout(function () {
      move(snake);
    }, MOVE_INTERVAL);
  } else {
    initGame();
  }
}

function moveBody(snake) {
  snake.body.unshift({ x: snake.head.x, y: snake.head.y });
  snake.body.pop();
}

function turn(snake, direction) {
  const oppositeDirections = {
    [DIRECTION.LEFT]: DIRECTION.RIGHT,
    [DIRECTION.RIGHT]: DIRECTION.LEFT,
    [DIRECTION.DOWN]: DIRECTION.UP,
    [DIRECTION.UP]: DIRECTION.DOWN,
  };

  if (direction !== oppositeDirections[snake.direction]) {
    snake.direction = direction;
  }
}

document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowLeft") {
    turn(snake1, DIRECTION.LEFT);
  } else if (event.key === "ArrowRight") {
    turn(snake1, DIRECTION.RIGHT);
  } else if (event.key === "ArrowUp") {
    turn(snake1, DIRECTION.UP);
  } else if (event.key === "ArrowDown") {
    turn(snake1, DIRECTION.DOWN);
  }
});

function initGame() {
  move(snake1);
}

initGame();