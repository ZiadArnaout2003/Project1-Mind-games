// -------------------------- Variables --------------------------

let button = document.getElementById("myButton");
let Myform = document.getElementById("user-input-id");
let X_path = 'X.png';
let O_path = 'O.png';
let Player1, Player2, match = false, draw = false;
let timerValue = 30;
let ArrayOfBoxes = Array.from(document.querySelectorAll('.box'));
let TwoDim_ArrayOfBoxes = [], row, column;

// Create a 2D array for the boxes
for (let i = 0; i < ArrayOfBoxes.length; i += 4) {
    TwoDim_ArrayOfBoxes.push(ArrayOfBoxes.slice(i, i + 4));
}

// -------------------------- Events --------------------------

document.getElementById('time').addEventListener('change', function () {
    timerValue = parseInt(this.value);
});

Myform.addEventListener('submit', UserInputHandling); // User input

document.querySelectorAll('.box').forEach((box) => { // Box click
    box.dataset.isclicked = 'false';
    box.dataset.symbol = ''; // undecided if it will be an X or an O
    box.addEventListener("click", handleClick);
});

// -------------------------- Functions --------------------------

function UserInputHandling(event) {
    event.preventDefault();
    let Player1Name = document.getElementById('Player1Name').value;
    let Player2Name = document.getElementById('Player2Name').value;
    let setting_window = document.querySelector(".settings-window");
    document.querySelector(".game-body").removeChild(setting_window);
    
    Player1 = new Player(Player1Name, true); // Player objects
    Player2 = new Player(Player2Name, false);
    
    // Add names to the display
    document.querySelector('#name1 span').innerHTML = Player1.getName();
    document.querySelector('#name2 span').innerHTML = Player2.getName();
    
    // Start the timer
    let timerElement = document.getElementById("countdown").querySelector('span');
    let countdown = timerValue;
    timerElement.innerHTML = `${countdown} sec`;
    
    let timerInterval = setInterval(function () {
        countdown--;
        timerElement.innerHTML = `${countdown} sec`;
        
        if (countdown <= 0) {
            clearInterval(timerInterval); // Stop the countdown
            draw = true;
            GameOver(); // Call GameOver function when the timer reaches 0
        }
    }, 1000); // Run the interval every second
}

function handleClick(event) {
    let box = event.currentTarget;
    const isClicked = box.dataset.isclicked === 'true';
    
    if (!isClicked) {
        box.dataset.isclicked = 'true';
        addSymbol(box);
        Turnswitch();
        checkForWin(box);
        checkForDraw();
    }
}

// Function to add the symbol to the clicked box
function addSymbol(box) {
    let imgSrc = (Player1.getTurn()) ? X_path : O_path;
    let img = document.createElement('img');
    img.src = imgSrc;
    img.alt = 'No image found';
    box.dataset.symbol = imgSrc;
    box.appendChild(img);
}

// Function to switch turns between players
function Turnswitch() {
    if (Player1.getTurn()) {
        Player1.setTurn(false);
        Player2.setTurn(true);
        document.querySelector('#name2').classList.add('TurnEffect');
        document.querySelector('#name1').classList.remove('TurnEffect');
    } else {
        Player2.setTurn(false);
        Player1.setTurn(true);
        document.querySelector('#name1').classList.add('TurnEffect');
        document.querySelector('#name2').classList.remove('TurnEffect');
    }
}

// Function to check if a player has won
function checkForWin(box) {
    row = Math.floor(ArrayOfBoxes.indexOf(box) / 4);
    column = ArrayOfBoxes.indexOf(box) % 4;

    checkRows(box);
    checkColumns(box);
    
    if (column == row) { // Check diagonals only when necessary
        checkRightDiagonal(box);
    }
    checkLeftDiagonal(box);
}

// Check if a player won on a row
function checkRows(box) {
    for (let i = 0; i < 4; i++) {
        if (TwoDim_ArrayOfBoxes[row][i].dataset.symbol !== box.dataset.symbol) {
            match = false;
            return;
        } else {
            match = true;
        }
    }
    if (match) GameOver();
}

// Check if a player won on a column
function checkColumns(box) {
    for (let i = 0; i < 4; i++) {
        if (TwoDim_ArrayOfBoxes[i][column].dataset.symbol !== box.dataset.symbol) {
            match = false;
            return;
        } else {
            match = true;
        }
    }
    if (match) GameOver();
}

// Check the right diagonal for a win
function checkRightDiagonal(box) {
    for (let i = 0; i < 4; i++) {
        if (TwoDim_ArrayOfBoxes[i][i].dataset.symbol !== box.dataset.symbol) {
            match = false;
            return;
        } else {
            match = true;
        }
    }
    if (match) GameOver();
}

// Check the left diagonal for a win
function checkLeftDiagonal(box) {
    for (let i = 0; i < 4; i++) {
        if (TwoDim_ArrayOfBoxes[3 - i][i].dataset.symbol !== box.dataset.symbol) {
            match = false;
            return;
        } else {
            match = true;
        }
    }
    if (match) GameOver();
}

// Check if the game is a draw
function checkForDraw() {
    if (ArrayOfBoxes.every((box) => box.dataset.isclicked === 'true')) {
        draw = true;
        GameOver();
    }
}

// Handle the end of the game
function GameOver() {
    let GameBody = document.querySelector('.game-body');
    let GameOver_div = document.createElement('div');
    GameBody.appendChild(GameOver_div);
    GameOver_div.classList.add('Game-over');
    
    let GameOver = document.querySelector('.Game-over');
    if (draw) {
        GameOver.innerHTML = `<h1>Draw</h1><h2>Nobody won the game!</h2>`;
    } else {
        let winner = Player1.getTurn() ? Player1.getName() : Player2.getName();
        GameOver.innerHTML = `<h1>Game Over</h1><h2>${winner} won the game!</h2>`;
        document.querySelector('.grid').classList.add('not-clickable');
    }

    let restart = document.createElement('button');
    GameOver_div.appendChild(restart);
    restart.innerHTML = 'Restart';
    restart.addEventListener('click', () => {
        window.location.reload();
    });
    restart.classList.add('Restart-btn');
}

// -------------------------- Player Class --------------------------

class Player {
    constructor(name, turn) {
        this.name = name;
        this.turn = turn;
    }

    getName() { return this.name; }
    getTurn() { return this.turn; }
    setTurn(turn) { this.turn = turn; }
}
