let lastTime = 0;
let SNAKE_SPEED = 3;

function paint(currentTime) {
  let timeSecond = (currentTime - lastTime) / 1000;
  window.requestAnimationFrame(paint);
  if (timeSecond < 1 / SNAKE_SPEED) return;
  lastTime = currentTime;

  draw();
  update();
}
window.requestAnimationFrame(paint);

// // ======================================================================

let game_board = document.querySelector(".game-board");
let EXPENDING_AMOUNT = 1 ;
let snake_body = [
  {
    x: 10,
    y: 9,
  },
];
let food = {
  x: 15,
  y: 15,
};
let input_direction = {
  x: -1,
  y: 0,
};
let last_input_direction = input_direction;

function draw() {
  draw_snake();
  draw_food();
}

function draw_food() {
  let foodEl = document.createElement("div");
  foodEl.classList.add("food");
  foodEl.style.gridColumnStart = food.x;
  foodEl.style.gridRowStart = food.y;

  game_board.appendChild(foodEl);
}

function draw_snake() {
  game_board.innerHTML = "";
  snake_body.forEach((segment, index) => {
    let snakeEl = document.createElement("div");
    if (index == 0) {
      let angle = 0;
      snakeEl.classList.add("head");
      if (input_direction.y == -1) {
        //top
        angle = 180;
      } else if (input_direction.y == 1) {
        //down
        angle = 0;
      } else if (input_direction.x == -1) {
        //left
        angle = 90;
      } else if (input_direction.x == 1) {
        //right
        angle = -90;
      }
      snakeEl.style.transform = `rotate(${angle}deg)`;
    } else {
      snakeEl.classList.add("body");
    }
    snakeEl.style.gridColumnStart = segment.x;
    snakeEl.style.gridRowStart = segment.y;

    game_board.appendChild(snakeEl);
  });
}

function update() {
  snake_move();
  food_eated();
}

function snake_move() {
    input_direction = getInputDirection();
    for (i = snake_body.length - 2; i >= 0; i--) {
        snake_body[i + 1] = {...snake_body[i]
        }
    }

    snake_body[0].x += input_direction.x;
    snake_body[0].y += input_direction.y;
    check_game_over();
}

function getInputDirection() {
    window.addEventListener("keydown", (e) => {
        switch (e.key) {
            case "ArrowUp":
                if (last_input_direction.y == 1) break;
                input_direction = {
                    x: 0,
                    y: -1
                };
                break;
            case "ArrowDown":
                if (last_input_direction.y == -1) break;
                input_direction = {
                    x: 0,
                    y: 1
                };
                break;

            case "ArrowLeft":
                if (last_input_direction.x == 1) break;
                input_direction = {
                    x: -1,
                    y: 0
                };
                break;
            case "ArrowRight":
                if (last_input_direction.x == -1) break;
                input_direction = {
                    x: 1,
                    y: 0
                };
                break;
            default:
                input_direction = {
                    x: 0,
                    y: 0
                }
        }
    })
    last_input_direction = input_direction;
    return input_direction;
}
let score = 0;
function food_eated (){
    if(is_eated()){
      score ++ ;
     score =  score < 10 ? "0" + score : score;
      document.getElementById("score").innerText = `Score : ${score}`;
        food= getRandomPosition();
        expending_snake();
    }
}

function is_eated(){
    return (snake_body[0].x == food.x && snake_body[0].y == food.y);
}

function getRandomPosition(){
    let a , b , condition = true ;
    a = Math.floor(Math.random()*20);
    b = Math.floor(Math.random()*20);
    if(condition){
        snake_body.some(segment =>{
            return segment.x === a && segment.y === b ;
        })
    }
    return {
        x : a,
        y : b
    }
}

function expending_snake(){
    for(i = 0 ; i < EXPENDING_AMOUNT ; i++){
        snake_body.push(snake_body[snake_body.length - 1])
    }
}

function check_game_over(){
    if(out_of_grid() || snake_intersection()){
        location.reload();
        alert("losser")
    }
}

function out_of_grid(){
    return snake_body[0].x < 0 || snake_body[0].x > 21 || snake_body[0].y < 0 || snake_body[0].y > 21 ;
}
function snake_intersection(){
    for(i = 1 ; i < snake_body.length ; i++){
        if(snake_body[0].x === snake_body[i].x && snake_body[0].y === snake_body[i].y){
            return true;
        }
    }
}
