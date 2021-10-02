let scrollSpeed = 2;
let score = 0;

class obj{
    constructor(img, x, y){
        this.elem = document.createElement("img");
        this.elem.className = "obj";
        this.elem.src = img;
        this.elem.style.width = `${cw*0.75}px`;
        this.x = x;
        this.y = y;
        
        document.getElementById("obstacles").appendChild(this.elem);
    }

    boatOverlap(){
        let rect2 = this.elem.getBoundingClientRect();
        return !(boat.x < rect2.left || 
            boat.x > rect2.right || 
            boat.y < rect2.top || 
            boat.y > rect2.bottom);        
    }
    move(){
        this.x -= scrollSpeed;
        this.elem.style.left = `${this.x}px`;
        this.elem.style.top = `${this.y}px`;

        if (this.boatOverlap()) {
            gameOver = true;
            let sound = new Audio("assets/crash.mp3");
            sound.play();
            let id = window.setTimeout(function() {}, 0);
            while (id--) {
                window.clearTimeout(id);
            }
        }

        if (this.x > -20 && !gameOver) {
            requestAnimationFrame(this.move.bind(this));
        }
        else if (!gameOver){
            this.elem.style.display = "none";
        }
    }
}

class coin extends obj{
    constructor(x, y){
        super("assets/coin.png", x, y);
        this.elem.style.width = `${cw*0.5}px`
        this.collected = false;
    }
    boatOverlap(){
        let rect1 = boat.elem.getBoundingClientRect();
        let rect2 = this.elem.getBoundingClientRect();
        return !(rect1.right < rect2.left || 
            rect1.left > rect2.right || 
            rect1.bottom < rect2.top || 
            rect1.top > rect2.bottom);        
    }
    move(){
        this.x -= scrollSpeed;
        this.elem.style.left = `${this.x}px`;
        this.elem.style.top = `${this.y}px`;

        if (this.boatOverlap() && !this.collected) {
            setTimeout(function(){
                this.elem.style.display = "none";
            }.bind(this), 1000);
            this.elem.style.transform = "translate(-50%, -50%) scale(5)";
            this.elem.style.opacity = "0";
            score += 1;
            document.getElementById("score").innerHTML = score;
            scrollSpeed += 0.05;
            this.collected = true;
            let sound = new Audio("assets/coin.wav");
            sound.play();
        }

        if (this.x > -20 && !gameOver) {
            requestAnimationFrame(this.move.bind(this));
        }
        else if (!gameOver){
            this.elem.style.display = "none";
        }
    }
}

class scylla extends obj {
    constructor(x, y){
        super("assets/scylla.gif", x, y);
        this.elem.style.width = `${cw*0.75}px`;
        this.direction = 2;
    }
    move(){
        this.x -= scrollSpeed;
        this.y += this.direction;
        if (this.y > window.innerHeight-100 || this.y < 100) {
            this.direction *= -1;
        }
        this.elem.style.left = `${this.x}px`;
        this.elem.style.top = `${this.y}px`;

        if (this.boatOverlap()) {
            gameOver = true;
            let sound = new Audio("assets/crash.mp3");
            sound.play();
            let id = window.setTimeout(function() {}, 0);
            while (id--) {
                window.clearTimeout(id);
            }
        }

        if (this.x > -20 && !gameOver) {
            requestAnimationFrame(this.move.bind(this));
        }
        else if (!gameOver){
            this.elem.style.display = "none";
        }
    }
}

function makeCliff() {
    let r = new obj("assets/cliff.png", window.innerWidth, Math.random()*window.innerHeight);
    r.move();    
}

function makeCoin() {
    let sy = Math.random()*window.innerHeight;
    for (let i=0; i<3; i++) {
        let newcoin = new coin(window.innerWidth, sy+i*cw);
        newcoin.move();
    }
}

let columnsSpawned = 0;
function obstacleSpawner() {
    if (!gameOver) {
        if (columnsSpawned % 2 == 0) {
            makeCliff();
        }
        else {
            makeCoin();
            if (Math.random() > 0.5) {
                let s = new scylla(window.innerWidth, 100+Math.random()*(window.innerHeight-200));
                s.move();
            }
        }
        columnsSpawned += 1;
        setTimeout(obstacleSpawner, (2/scrollSpeed)*700);
    }
    //else {
    //    clearInterval(obsInterval);
    //}
}
// let obsInterval = setInterval(obstacleSpawner, 700);
obstacleSpawner();

function reset() {
    gameOver = false;
    score = 0;
    scrollSpeed = 2;
    // reinitialize boat
    boat = new Boat();
    boat.move();
    // delete all obstacles
    document.getElementById("obstacles").innerHTML = "";
    // enable spawner
    //clearInterval(obsInterval);
    //obsInterval = setInterval(obstacleSpawner, 700);
    document.getElementById("score").innerHTML = "0";
    setTimeout(obstacleSpawner, 700);
}
onmousedown = reset;