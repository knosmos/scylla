let c = 11;
let cw = window.innerWidth/c;

let rightPressed, leftPressed, downPressed, upPressed;
let mx = 0;
let my = 0;

let gameOver = false;

class Boat {
    constructor() {
        this.elem = document.getElementById("boat");
        this.elem.style.width = `${cw*0.75}px`;
        this.x = 100;
        this.y = window.innerHeight/2;
        this.speed = 4;
    }
    move() {
        // Keyboard Control
        if (rightPressed) {
            this.x += this.speed;
            this.elem.style.transform = "translate(-50%, -50%) scaleX(1)";
        }
        if (leftPressed) {
            this.x -= this.speed;
            this.elem.style.transform = "translate(-50%, -50%) scaleX(-1)";
        }
        if (upPressed) {
            this.y -= this.speed;
        }
        if (downPressed) {
            this.y += this.speed;
        }


        // Mouse Control
        /*
        // Find the direction vector, then normalize
        let dx = mx-this.x;
        let dy = my-this.y;
        let vecLength = Math.sqrt(dx*dx + dy*dy + 0.01);
        let vec = [dx/vecLength, dy/vecLength];
        // console.log(mx, my, dx, dy, this.x, this.y, vecLength, vec);

        if (vecLength > 3) {
            this.x += vec[0]*this.speed;
            this.y += vec[1]*this.speed;
        }
        */

        this.x = Math.max(0, Math.min(window.innerWidth, this.x));
        this.y = Math.max(0, Math.min(window.innerHeight, this.y));

        this.elem.style.left = `${this.x}px`;
        this.elem.style.top = `${this.y}px`;

        if (!gameOver) {
            requestAnimationFrame(this.move.bind(this));
        }
        
    }
}

function keyDownHandler(event) {
    if(event.keyCode == 39) {
        rightPressed = true;
    }
    else if(event.keyCode == 37) {
        leftPressed = true;
    }
    if(event.keyCode == 40) {
    	downPressed = true;
    }
    else if(event.keyCode == 38) {
    	upPressed = true;
    }
    else if(event.keyCode == 65) {
        leftPressed = true;
    }
    else if(event.keyCode == 87) {
        upPressed = true;
    }
    else if(event.keyCode == 83) {
        downPressed = true;
    }
    else if(event.keyCode == 68) {
        rightPressed = true;
    }
}

function keyUpHandler(event) {
    if(event.keyCode == 39) {
        rightPressed = false;
    }
    else if(event.keyCode == 37) {
        leftPressed = false;
    }
    if(event.keyCode == 40) {
    	downPressed = false;
    }
    else if(event.keyCode == 38) {
    	upPressed = false;
    }
    else if(event.keyCode == 65) {
        leftPressed = false;
    }
    else if(event.keyCode == 87) {
        upPressed = false;
    }
    else if(event.keyCode == 83) {
        downPressed = false;
    }
    else if(event.keyCode == 68) {
        rightPressed = false;
    }
}

onmousemove = function(e){
    mx = e.clientX;
    my = e.clientY;
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

let boat = new Boat();
boat.move();

let playing = false;
onkeydown = function(e){
    if (!playing) {
        let music = new Audio("assets/music.mp3");
        music.loop = true;
        music.play();
        playing = true;        
    }
}