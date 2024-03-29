const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

//load food and ground images
const box = 32;

const ground = new Image();
ground.src = "img/ground.png";

const apple = new Image();
apple.src = "img/food.png";

//load audio files
const dead = new Audio();
const eat = new Audio();
const up = new Audio();
const left = new Audio();
const right = new Audio();
const down = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
left.src = "audio/left.mp3";
down.src = "audio/down.mp3";
right.src = "audio/right.mp3";

//declare position of snake and food
let snake = [];
snake[0] = {
    x : 9 * box,
    y : 10 * box
}

let food = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+3) * box
}


//decide the direction
document.addEventListener("keydown",direction);
let d;
function direction(event){
    if (event.keyCode == 37 && d != "RIGHT") {
        d = "LEFT";
        left.play();
    } else if (event.keyCode == 38 && d != "DOWN") {
        d = "UP";
        up.play();
    } else if (event.keyCode == 39 && d != "LEFT") {
        d = "RIGHT";
        right.play();
    } else if (event.keyCode == 40 && d != "UP") {
        d = "DOWN";
        down.play();
    } 
}

let score = 0;

//check if snakes head collides within the snake
function collision(head, array){
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
} 

//draw the board
function draw() {
    ctx.drawImage(ground,0,0);

    for (let i = 0; i < snake.length; i++){
        ctx.fillStyle = (i == 0) ? "green" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.drawImage(apple, food.x, food.y);

    //find old head of snake position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //whichever dir player presses move to that spot
    if (d=="LEFT") snakeX -= box;
    if (d=="UP") snakeY -= box;
    if (d=="RIGHT") snakeX += box;
    if (d=="DOWN") snakeY += box;

    //if snake eats food
    if(snakeX == food.x && snakeY == food.y) {
        //increment score
        score++;
        //new food placement
        food = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
        }
        eat.play();
    } else {
        //remove the tail
        snake.pop();
    }

    //add the new head
    let newHead = {
        x : snakeX,
        y : snakeY
    }

    //game over 
    if (snakeX < box || snakeX > 17 * box || snakeY < 3 * box || snakeY > 17 * box || collision(newHead,snake)){
        clearInterval(game);
        dead.play();
    }

    snake.unshift(newHead);


    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score, 2*box, 1.6*box);
}

//refresh drawing every 100 milliseconds with updates
let game = setInterval(draw, 100);

