//Gloabal Variables
let letterMap;
let dashArray;
let currentImage=0;
let HangmanPicturesArray=['Hangman-images/2.png','Hangman-images/3.png','Hangman-images/4.png',
'Hangman-images/5.png','Hangman-images/6.png','Hangman-images/7.png'
]
let HangmanPicture= document.getElementById('HangmanPicture');
function GameOver(){
    let Gameoverdiv=document.createElement('div');
    Gameoverdiv.textContent='Game Over';
    Gameoverdiv.classList.add('GameOver');
    document.body.appendChild(Gameoverdiv);
    const Letters = document.querySelectorAll('.letter'); // Select all elements with class 'letter'
    Letters.forEach(el => {
        el.classList.add('not-clickable'); // Adds 'newClass' to each element
    });
}
// Function to create a map of letter positions in the word
function createLetterMap(word) {
    const letterMap = {};
    for (let i = 0; i < word.length; i++) {
        const letter = word[i];
        if (letterMap[letter]) {
            letterMap[letter].push(i);  // Append to existing array if letter is already found
        } else {
            letterMap[letter] = [i];    // Create new array with the index
        }
    }
    return letterMap;
}

// Function to initialize the dash array and display it
function initializeDashes(word) {
    return Array(word.length).fill("_");  // Create an array of dashes
}

// Function to update the dashes when a correct guess is made
function updateDashes(dashArray, letterMap, guessedLetter) {
    if (letterMap[guessedLetter]) {
        letterMap[guessedLetter].forEach(index => {
            if(index==0)
                dashArray[index] = guessedLetter.toUpperCase();//If it is the first letter
            else
                dashArray[index] = guessedLetter;  // Replace the dash with the correct letter
        });
    }
    else
        if(currentImage<=5)
        HangmanPicture.src=HangmanPicturesArray[currentImage++];//show next image
        if(currentImage==6)
         GameOver();
    return dashArray;
}

// Function to update the HTML
function updateHTML(dashArray) {
    const wordContainer = document.getElementById("Dashes-container");
    wordContainer.textContent = dashArray.join(" ");  // Display dashes/letters separated by spaces
                                                     // But dashArray didn't change
}
function GameInitialisation(word){
    letterMap = createLetterMap(word);
    dashArray = initializeDashes(word);
    updateHTML(dashArray);
}
async function getWordInRange(minLength, maxLength) {
    while (true) {
        const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength; // Random length in range
        const response = await fetch(`https://random-word-api.herokuapp.com/word?number=1&length=${length}`);
        const words = await response.json();
        if (words && words.length > 0) {
            return words[0]; // Return the first word
        }
    }
}

GameInitialisation(getWordInRange(5,12));
// Event of clicking on a letter
// Convert HTMLCollection to an array using Array.from or spread operator
Array.from(document.getElementsByClassName('letter')).forEach(letterElement => {
    letterElement.addEventListener('click', (event) => {
        let guessedLetter = event.target.textContent; // Get the clicked letter
        dashArray = updateDashes(dashArray, letterMap, guessedLetter);
        // Update the HTML with the correct guess
        updateHTML(dashArray);
    });

});

let comment_section = document.getElementById("comment-section");
let comment=comment_section.value;
let submit_button=document.getElementById("submit-button");
submit_button.addEventListener('click', (event) => {
    event.preventDefault();
    confirmation_message=document.querySelector('.confirmation-message');
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

