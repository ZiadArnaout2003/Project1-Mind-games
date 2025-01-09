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
const words = [
    // 5-letter words
    "apple", "beach", "crowd", "dance", "eagle", "fable", "grape", "horse", "image", "jolly",
    "karma", "lemon", "magic", "novel", "oasis", "peace", "quest", "raven", "sugar", "tiger",
    "union", "valor", "witty", "zebra", "brave",
  
    // 6-letter words
    "bright", "camera", "danger", "energy", "frozen", "galaxy", "hidden", "island", "jewel", "kitten",
    "leader", "magnet", "nature", "object", "palace", "random", "rocket", "stream", "tunnel", "vessel",
    "wealth", "yellow", "zenith", "garden", "sister",
  
    // 7-letter words
    "admiral", "balloon", "captain", "diamond", "elastic", "freedom", "glacier", "harvest", "inspire", "journey",
    "kingdom", "library", "musical", "novelty", "optical", "pioneer", "quality", "rescue", "sunrise", "tribute",
    "upwards", "vintage", "warrior", "zealous", "progress",
  
    // 8-letter words
    "airplane", "building", "chemical", "dominion", "elephant", "favorite", "gigantic", "hospital", "illusion", "junction",
    "lifestyle", "magician", "narrator", "operator", "passport", "quandary", "reliable", "sapphire", "teammate", "umbrella",
    "vocation", "workshop", "zealotry", "backpack", "landmark",
  
    // 9-letter words
    "adventure", "beautiful", "childhood", "dedicated", "education", "fireplace", "generator", "honeymoon", "injection", "landscape",
    "nightmare", "overthrow", "paradise", "radiation", "satellite", "threshold", "undertake", "vibration", "wonderful", "zealously",
  
    // 10-letter words
    "appearance", "breakfast", "caterpillar", "destination", "entertain", "foundation", "greenhouse", "hypnotized", "invitation", "landlocked",
    "motivating", "negotiable", "organizing", "particular", "questioned", "revolution", "subtraction", "toleration", "unfaithful", "ventilator",
  
    // 11-letter words
    "anniversary", "breathtaking", "confidential", "destruction", "entertainment", "fascination", "grandfather", "heartwarming", "investigate", "landscaping",
    "masterpiece", "nourishment", "organization", "participated", "qualification", "reproduction", "significant", "transported", "unbreakable", "victorious",
  
    // 12-letter words
    "accomplished", "appreciation", "breakthrough", "collaboration", "determination", "environmental", "grandchildren", "incorporation", "justification", "knowledgeable",
    "manifestation", "notification", "overshadowing", "preoccupation", "quantification", "reconfiguration", "sophisticated", "transportation", "understanding", "verification",
  ];

GameInitialisation(words[Math.floor(Math.random() * words.length)]);
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

