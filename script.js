var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var gameOverNotify = document.querySelector('.game-over-notify');

var ballRadius = 10;
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 1.5;
var dy = -1.5;

var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth)/2;

var rightPressed = false;
var leftPressed = false;

var brickRowCount = 12;
var brickColumnCount = 20;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 45;

var bricks = [];
for(var c=0; c<brickColumnCount; c++) {
  bricks[c] = [];
  for(var r=0; r<brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

var score = 0;
var lives = 3;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);
gameOverNotify.addEventListener("click", function() {
  document.location.reload();
});


function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
}
function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}

function mouseMoveHandler(e) {
  var relativeX = e.clientX - canvas.offsetLeft;
  if(relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth/2;
  }
}

function collisionDetection() {
  for(var c=0; c<brickColumnCount; c++) {
    for(var r=0; r<brickRowCount; r++) {
      var b = bricks[c][r];
      if(b.status == 1) {
        if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
          dy = -dy;
          b.status = 0;
          score++;
          if(score == brickRowCount*brickColumnCount) {
              draw();
              alert("C'est gagné, Bravo!");
              document.location.reload();
              clearInterval(interval); // Needed for Chrome to end game
          }
        }
      }
    }
  }
}

function drawBall() {
    ctx.fillStyle = "#A55FCD";
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fill();
    ctx.closePath();
}
function drawPaddle() {
    ctx.fillStyle = "#CD5FC1";
    ctx.beginPath();
    ctx.rect(paddleX, (canvas.height-paddleHeight)-3, paddleWidth, paddleHeight);
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
  for(var c=0; c<brickColumnCount; c++) {
    for(var r=0; r<brickRowCount; r++) {
      if(bricks[c][r].status == 1) {
        var brickX = (r*(brickWidth+brickPadding))+brickOffsetLeft;
        var brickY = (c*(brickHeight+brickPadding))+brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#61C78F";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0c0c0c";
    ctx.fillText("Score: "+score, 8, 20);
}

function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0c0c0c";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();

    if(x + dx > canvas.width-ballRadius/1.9 || x + dx < ballRadius/1.9) {
        dx = -dx;
    }
    if(y + dy < ballRadius/1.9) {
        dy = -dy;
    }
    else if(y + dy > canvas.height-ballRadius-11) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }
        else {
          lives--;
          if(!lives) {
            draw();
            gameOverNotify.style.display = 'flex';
            clearInterval(interval);
            return;
          }
          else {
              x = canvas.width/2;
              y = canvas.height-30;
              dx = 1.5;
              dy = -1.5;
              paddleX = (canvas.width-paddleWidth)/2;
          }
        }
    }

    if(rightPressed && paddleX < canvas.width-paddleWidth-2) {
        paddleX += 3;
    }
    else if(leftPressed && paddleX > 2) {
        paddleX -= 3;
    }

    x += dx;
    y += dy;
}

var interval = setInterval(draw, 10);
