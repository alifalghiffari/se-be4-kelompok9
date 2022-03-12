const CELL_SIZE = 20;
const CANVAS_SIZE = 600;
const REDRAW_INTERVAL = 50;
const WIDTH = CANVAS_SIZE / CELL_SIZE;
const HEIGHT = CANVAS_SIZE / CELL_SIZE;
const DIRECTION = {
    STOP:-1,
    LEFT: 0,
    RIGHT: 1,
    UP: 2,
    DOWN: 3,
}
let MOVE_INTERVAL = 150;


// declare wall
var wallX = [];
var wallY = [];
var levelWall2 = [
  {
    x1: 8,
    x2: 22,
    y: 10,
  },
  {
    x1: 8,
    x2: 22,
    y: 5,
  },
];
var levelWall3 = [
  {
    x1: 8,
    x2: 22,
    y: 15,
  },
];
var levelWall4 = [
  {
    x1: 8,
    x2: 22,
    y: 20,
  },
];
var levelWall5 = [
  {
    x1: 8,
    x2: 22,
    y: 25,
  },
];
// end declare wall


function initPosition() {
    return {
        x: Math.floor(Math.random() * WIDTH),
        y: Math.floor(Math.random() * HEIGHT),
    }
}

function initHeadAndBody() {
    let head = initPosition();
    let body = [{x: head.x, y: head.y}];
    return {
        head: head,
        body: body,
    }
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
    }
}
let snake1 = initSnake("purple");


let apple1 = {
    color: "red",
    position: initPosition(),
}

let apple2 = {
    color: "red",
    position: initPosition(),
}

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
  function hitTheWall(snake) {
    for (let i = 0; i < wallX.length; i++) {
      if (
        snake.head.x === wallX[i] &&
        (snake.direction == 2 || snake.direction == 3)
      ) {
        if (
          snake.head.y - 1 === wallY[i] ||
          snake.head.y + 1 === wallY[i]
        ) {
           
            stop(snake);
            alert("Nabrak Gan !!!");
        }
      }
  
      if (
        snake.head.y === wallY[i] &&
        (snake.direction == 0 || snake.direction == 1)
      ) {
        if (
          snake.head.x - 1 === wallX[i] ||
          snake.head.x + 1 === wallX[i]
        ) {
            
            stop(snake);
            alert("Nabrak Gan !!!");
        }
      }
    }
  }
 // end snake hit wall 

function drawCell(ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
}


function drawScore(snake) {
    let scoreCanvas;
    if (snake.color == snake1.color) {
        scoreCanvas = document.getElementById("score1Board");
    } 

    let scoreCtx = scoreCanvas.getContext("2d");

    scoreCtx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    scoreCtx.font = "30px Arial";
    scoreCtx.fillStyle = snake.color
    scoreCtx.fillText(snake.score, 10, scoreCanvas.scrollHeight / 2);
}
// level statement
let level = 1;
function initLevel(snake){
    if(level===1 && snake.score === 5){
        
        levelUp();
        MOVE_INTERVAL = MOVE_INTERVAL - 20;
        initWall2();
    }if(level === 2 && snake.score ===10){
        
        levelUp();
        MOVE_INTERVAL = MOVE_INTERVAL - 40;
    }if(level === 3 && snake.score === 15){
        
        levelUp();
        MOVE_INTERVAL = MOVE_INTERVAL - 60;
        initWall3();
    }if(level === 4 && snake.score === 20){
        
        levelUp();
        MOVE_INTERVAL = MOVE_INTERVAL - 70;
        initWall4();
    }if(level === 5 && snake.score === 25){
        alert("Congratulation");
    }   
}
function levelUp(){
    level++;
  if (level == 2) {
    alert("Level Up To : "+level);
  } else if (level == 3) {
    alert("Level Up To : "+level);
  } else if (level == 4) {
    alert("Level Up To : "+level);
  } else if (level == 5) {
    alert("Level Up To : "+level);
  }
}

// end level statement
function draw() {
    
    setInterval(function() {

        

        let snakeCanvas = document.getElementById("snakeBoard");
        let ctx = snakeCanvas.getContext("2d");

        ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);


        //membuat kepala ular
        var headImg = document.getElementById("head");
        ctx.drawImage(headImg, snake1.head.x * CELL_SIZE, snake1.head.y * CELL_SIZE, CELL_SIZE, CELL_SIZE);
        
        for (let i = 1; i < snake1.body.length; i++) {
            //membuat body ular
            var bodyImg = document.getElementById("body");
            ctx.drawImage(bodyImg, snake1.body[i].x * CELL_SIZE, snake1.body[i].y * CELL_SIZE, CELL_SIZE, CELL_SIZE);

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
         
         createWall(); 
        drawScore(snake1);
        //drawScore(snake2);
        //drawScore(snake3);
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
    if (snake.head.x == apple1.position.x && snake.head.y == apple1.position.y ||
        snake.head.x == apple2.position.x && snake.head.y == apple2.position.y) {
        apple1.position = initPosition();
        apple2.position = initPosition();
        snake.score++;
        
        snake.body.push({x: snake.head.x, y: snake.head.y});
    }
}

function moveLeft(snake) {
    snake.head.x--;
    teleport(snake);
    eat(snake, apple1, apple2);
    hitTheWall(snake);
}

function moveRight(snake) {
    snake.head.x++;
    teleport(snake);
    eat(snake, apple1, apple2);
    hitTheWall(snake);
}

function moveDown(snake) {
    snake.head.y++;
    teleport(snake);
    eat(snake, apple1, apple2);
    hitTheWall(snake);
}

function moveUp(snake) {
    snake.head.y--;
    teleport(snake);
    eat(snake, apple1, apple2);
    hitTheWall(snake);
}

function checkCollision(snakes) {
    let isCollide = false;
    //this
    for (let i = 0; i < snakes.length; i++) {
        for (let j = 0; j < snakes.length; j++) {
            for (let k = 1; k < snakes[j].body.length; k++) {
                if (snakes[i].head.x == snakes[j].body[k].x && snakes[i].head.y == snakes[j].body[k].y) {
                    isCollide = true;
                }
            }
        }
    }
    if (isCollide) {
        alert("Game over");
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
        setTimeout(function() {
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
    }

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

 
})

function initGame() {
    move(snake1);
   
}

initGame();