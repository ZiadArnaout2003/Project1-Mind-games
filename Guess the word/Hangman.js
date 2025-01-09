// Global Variables
let hangmanGame = {
    letterMap: {},
    dashArray: [],
    currentImage: 0,
    hangmanPicturesArray: [
        'Hangman-images/2.png', 'Hangman-images/3.png', 'Hangman-images/4.png', 
        'Hangman-images/5.png', 'Hangman-images/6.png', 'Hangman-images/7.png'
    ],
    hangmanPicture: document.getElementById('HangmanPicture'),
  
    // Function to create a map of letter positions in the word
    createLetterMap(word) {
        return word.split('').reduce((map, letter, index) => {
            if (!map[letter]) map[letter] = [];
            map[letter].push(index);
            return map;
        }, {});
    },
  
    // Function to initialize the dash array
    initializeDashes(word) {
        return Array(word.length).fill("_");
    },

    // Function to update dashes and hangman image
    updateDashes(guessedLetter) {
        if (this.letterMap[guessedLetter]) {
            this.letterMap[guessedLetter].forEach(index => this.dashArray[index] = guessedLetter);
        } else {
            this.hangmanPicture.src = this.hangmanPicturesArray[this.currentImage++];
            if (this.currentImage === 6) this.gameOver();
        }
    },

    // Function to update the HTML with the current state
    updateHTML() {
        const wordContainer = document.getElementById("Dashes-container");
        wordContainer.textContent = this.dashArray.join(" ");
    },

    // Game over function
    gameOver() {
        let gameOverDiv = document.createElement('div');
        gameOverDiv.textContent = 'Game Over';
        gameOverDiv.classList.add('GameOver');
        document.body.appendChild(gameOverDiv);
    },

    // Function to initialize the game with a random word
    gameInitialization(word) {
        this.letterMap = this.createLetterMap(word);
        this.dashArray = this.initializeDashes(word);
        this.updateHTML();
    }
};

// List of words
const words = [
    "apple", "beach", "crowd", "dance", "eagle", "fable", "grape", "horse", "image", "jolly",
    "karma", "lemon", "magic", "novel", "oasis", "peace", "quest", "raven", "sugar", "tiger",
    "union", "valor", "witty", "zebra", "brave",
    "bright", "camera", "danger", "energy", "frozen", "galaxy", "hidden", "island", "jewel", "kitten",
    "leader", "magnet", "nature", "object", "palace", "random", "rocket", "stream", "tunnel", "vessel",
    "wealth", "yellow", "zenith", "garden", "sister",
    "admiral", "balloon", "captain", "diamond", "elastic", "freedom", "glacier", "harvest", "inspire", "journey",
    "kingdom", "library", "musical", "novelty", "optical", "pioneer", "quality", "rescue", "sunrise", "tribute",
    "upwards", "vintage", "warrior", "zealous", "progress"
];

// Initialize the game with a random word
hangmanGame.gameInitialization(words[Math.floor(Math.random() * words.length)]);

// Dynamically create letter buttons
const lettersContainer = document.getElementById("letters-container");


// Event listeners for letter guesses
Array.from(document.getElementsByClassName('letter')).forEach(letterElement => {
    letterElement.addEventListener('click', event => {
        let guessedLetter = event.target.textContent;
        hangmanGame.updateDashes(guessedLetter);
        hangmanGame.updateHTML();
        event.target.classList.add('not-clickable');
    });
});

// Comment Section Submission
let comment_section = document.getElementById("comment-section");
let submit_button = document.getElementById("submit-button");

submit_button.addEventListener('click', (event) => {
    event.preventDefault();
    let confirmation_message = document.querySelector('.confirmation-message');
    if (comment_section.value === "") {
        alert('Please enter a comment');
        return;
    }

    confirmation_message.classList.add('show');

    setTimeout(() => {
        confirmation_message.classList.remove('show');
    }, 1500);

    comment_section.value = ""; // Clear the input field
});
