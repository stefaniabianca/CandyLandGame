// Game elements
const playingArea = document.querySelector(".playingArea");
const basket = document.querySelector(".basket");
const candies = document.querySelector(".candies");
const startButton = document.querySelector(".startButton");


// Get playing area size
const containerWidth = playingArea.offsetWidth;
const containerHeight = playingArea.offsetHeight;

// --- Function to start the game ----
function startGame() {
    startButton.style.display = "none";
    generateCandy();
    timerElement.style.display = "block";

    //Format time when seconds < 10
    function formatTimer(time) {
        return time < 10 ? `0${time}` : time;
    }

    // Create function for coutdown timer
    function updateTimer() {
        remainingTime--;
        timerElement.innerHTML = `${formatTimer(remainingTime)}`;


        if (remainingTime === 0) {
            clearInterval(timer);
            timerElement.innerHTML = "00";
            gameOver();
        }
    }
    // Update timer
    updateTimer();
    const timer = setInterval(updateTimer, 1000);
    

}

// Event listener for the "Start" button
startButton.addEventListener("click", () => {
    startGame();
});

// Score element
let score = 0;
const updatedScore = document.querySelector(".score");
updatedScore.innerHTML = `Score: ${score}`;

// Timer element
let remainingTime = 60;

const timerElement = document.createElement("p");
timerElement.setAttribute("class", "timer");
timerElement.innerHTML = `${remainingTime}`;
playingArea.appendChild(timerElement);



// All Candies
const candyImages = [
    "./images/candy01.png",
    "./images/candy02.png",
    "./images/candy03.png",
    "./images/candy04.png",
    "./images/candy05.png",
    "./images/candy06.png",
    "./images/candy07.png",
    "./images/candy08.png",
    "./images/candy09.png",
    "./images/candy10.png",
    "./images/candy11.png",
    "./images/candy12.png",
]

const totalImages = candyImages.length;

// Basket Position
let basketPosX = parseInt(window.getComputedStyle(basket).getPropertyValue("left"));
let basketBottom = parseInt(window.getComputedStyle(basket).getPropertyValue("bottom"));

//Move Basket Right
function moveBasketRight() {
    const basketWidth = basket.offsetWidth;
    if(basketPosX + basketWidth + 50 < containerWidth) {
        basketPosX +=50;
        basket.style.left = basketPosX + "px";
    }
}

// Move Basket Left
function moveBasketLeft() {
    if(basketPosX >= 30) {
        basketPosX -=50;
        basket.style.left = basketPosX + "px";
    }
}

// --- Add event listener for key down ---
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
        moveBasketLeft();
    } else if (e.key === "ArrowRight") {
        moveBasketRight();
    }
})


// --- Generate Candy Fundtion ---
function generateCandy() {

    // Set starting position for candy
    let candyPosY = containerHeight - 30;
    let candyPosX = Math.floor(Math.random() * containerWidth - 70);

    // Select random candy each time it is generated
    const randomIndex = Math.floor(Math.random() * totalImages);
    const randomImg = candyImages[randomIndex];

    // Display element 
    const candy = document.createElement("img");
    candy.setAttribute("class", "candy");
    candy.src = randomImg;
    candies.appendChild(candy);
    playingArea.appendChild(candies); 

    // Fall Down Candy
    function fallDown() {
        //Game rules
        if (candyPosY < basketBottom + 100 && candyPosY > basketBottom && candyPosX > basketPosX - 100 && candyPosX < basketPosX + 160) {
            candy.style.display = "none";
            clearInterval(fallInterval);

            score++;
            updatedScore.innerHTML = `Score: ${score}`;

        }
        else if (candyPosY < basketBottom + 10) {
            candy.style.display = "none";
        }

        candyPosY -= 10;
        candy.style.bottom = candyPosY + "px";
        candy.style.left = candyPosX + "px";

    }

    // Random speed for candies
    let randomSpeed = Math.floor(Math.random() * 11) + 15;
    let fallInterval = setInterval(fallDown, randomSpeed);

    //Candy timeout
    setTimeout(generateCandy, 500);

}


// --- Game Over function ---
function gameOver() {
    // Hide game elements
    basket.style.display = "none";
    candies.style.display = "none";
    const scoreCards = document.querySelector(".scoreCards");
    scoreCards.style.display = "none";

    // Create game over box
    const gameOverBox = document.createElement("div");
    gameOverBox.setAttribute("class", "gameOverBox");

    // Display Game Over message
    const gameOverMessage = document.createElement("p");
    gameOverMessage.setAttribute("class", "gameOverMessage");
    gameOverMessage.innerHTML = `Game Over. <br> You've got ${score} candies. <br> Don't eat them too fast :)`;
    gameOverBox.appendChild(gameOverMessage);

    // Restart button
    const restartButton = document.createElement("img");
    restartButton.setAttribute("class", "restartButton");
    restartButton.src = "./images/PlayAgain.png"
    restartButton.innerText = "Restart Game";
   
    gameOverBox.appendChild(restartButton);

    playingArea.appendChild(gameOverBox);

    // Reset Game
    function resetGame() {
        window.location.reload(true);
    }

    restartButton.addEventListener("click", () => {
        resetGame(); 
        
    });
}

