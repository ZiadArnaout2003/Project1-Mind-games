//Event: Cards clicked
// a)correct match 
// b)Wrong match (cards returning to their initial state)
// Event : Time out 
//Game Over

// ---------------------------Players objects-------------------------
class Player
{   constructor(Name,Score,Turn)
    {   this.name=Name;
        this.score=Score;
        this.turn=Turn;}
    getScore(){return this.score;}
    setScore(Score){this.score=Score;}
    getName() { return this.name; }
    getTurn(){return this.turn;}
    setTurn(TrueorFalse){this.turn=TrueorFalse;}
}

// --------------------------------DataSet & variables------------------------------------------
let Player1,Player2;
let FlippedCards = [];
let orderArray;
let MatchedPairs=0;
let isComparing = true; // Flag to manage comparison state
const Level1= [
    'CardsGameImages/Level1/pic (1).jpg', 'CardsGameImages/Level1/pic (2).jpg', 'CardsGameImages/Level1/pic (3).jpg',
    'CardsGameImages/Level1/pic (4).jpg', 'CardsGameImages/Level1/pic (5).jpg', 'CardsGameImages/Level1/pic (6).jpg',
    'CardsGameImages/Level1/pic (7).jpg', 'CardsGameImages/Level1/pic (8).jpg', 'CardsGameImages/Level1/pic (1).jpg', 
    'CardsGameImages/Level1/pic (2).jpg', 'CardsGameImages/Level1/pic (3).jpg','CardsGameImages/Level1/pic (4).jpg', 
    'CardsGameImages/Level1/pic (5).jpg', 'CardsGameImages/Level1/pic (6).jpg',
    'CardsGameImages/Level1/pic (7).jpg', 'CardsGameImages/Level1/pic (8).jpg'
];
const Level2=['CardsGameImages/Level2/pic (9).jpg',
    'CardsGameImages/Level2/pic (10).jpg', 'CardsGameImages/Level2/pic (11).jpg', 'CardsGameImages/Level2/pic (12).jpg',
    'CardsGameImages/Level2/pic (13).jpg', 'CardsGameImages/Level2/pic (14).jpg', 'CardsGameImages/Level2/pic (15).jpg',
    'CardsGameImages/Level2/pic (16).jpg','CardsGameImages/Level2/pic (9).jpg',
    'CardsGameImages/Level2/pic (10).jpg', 'CardsGameImages/Level2/pic (11).jpg', 'CardsGameImages/Level2/pic (12).jpg',
    'CardsGameImages/Level2/pic (13).jpg', 'CardsGameImages/Level2/pic (14).jpg', 'CardsGameImages/Level2/pic (15).jpg',
    'CardsGameImages/Level2/pic (16).jpg'
]
const Level3=['CardsGameImages/Level3/pic (17).jpg',
    'CardsGameImages/Level3/pic (18).jpg', 'CardsGameImages/Level3/pic (19).jpg', 'CardsGameImages/Level3/pic (20).jpg',
    'CardsGameImages/Level3/pic (21).jpg', 'CardsGameImages/Level3/pic (22).jpg', 'CardsGameImages/Level3/pic (23).jpg',
    'CardsGameImages/Level3/pic (24).jpg','CardsGameImages/Level3/pic (17).jpg',
    'CardsGameImages/Level3/pic (18).jpg', 'CardsGameImages/Level3/pic (19).jpg', 'CardsGameImages/Level3/pic (20).jpg',
    'CardsGameImages/Level3/pic (21).jpg', 'CardsGameImages/Level3/pic (22).jpg', 'CardsGameImages/Level3/pic (23).jpg',
    'CardsGameImages/Level3/pic (24).jpg'
]

//-------------------------Events---------------------------------------
//Settings event
document.getElementById('myForm').addEventListener('submit',StartTheGame);
//Click event
document.querySelectorAll('.box').forEach((box) => {
    // Initialize the flag in the dataset of each box
    box.dataset.clicked = 'false';
    // Attach a single event listener
    box.addEventListener('click', handleClick);
});

//Comment section
document.getElementById("CommentForm").addEventListener('submit',(event)=>
    {event.preventDefault(); //Prevents the submission of the form and the reload of the page
     const comment_text =document.getElementById("evaluation").value;
     let comment=document.createElement('p');//Create an element
     comment.textContent=comment_text;//Add text to the element
     document.getElementById("Comment-Section").appendChild(comment);//Add the element to the form
     document.getElementById("evaluation").value='';
        })

// -------------------------INITIALIZATION--------------------------
function StartTheGame(event) {
    event.preventDefault();
    const Player1Name = document.getElementById('Player1-Name').value;
    const Player2Name = document.getElementById('Player2-Name').value;
    const level=document.getElementById('level').value;
    // intialise using the appropriate data set
    switch(level)
    {
        case "easy":InitialiseDataSet(Level1);break;
        case "medium":InitialiseDataSet(Level2);break;
        case "hard":InitialiseDataSet(Level3);break;
    }

    // Correct way to remove the SettingsDiv
    const settingsDiv = document.querySelector('.SettingsDiv');
    if (settingsDiv) {
        document.querySelector('.Game-comment-section').removeChild(settingsDiv); // or use parent.removeChild(settingsDiv);
    }
    Player1=new Player(Player1Name,0,true);
    Player2=new Player(Player2Name,0,false);
    Player1.setTurn(true);
    Player2.setTurn(false);
    const gameSection = document.querySelector('.description');
    
    // Clear any previous player elements
    gameSection.innerHTML = `
        <h2>Cards matching game</h2>
        <p>Enjoy this 2 players game with different themes</p>
        <p>Let's see who has a better short-term memory!</p>
        <div class='names display'><ul>
        <li><span id="player1-name">${Player1.name}: <span id="player1-score">${Player1.score}</span> points</span> </li>
        <li><span id="player2-name">${Player2.name}:<span id="player2-score">${Player2.score}</span> points</span></li></ul>
        </div>`;
        HighlightCurrentPlayerName('player1-name');
        isComparing=false;
   
}
function InitialiseDataSet(LEVEL) {
    console.log('LEVEL array:', LEVEL);
    let Boxes = document.querySelectorAll('.box'); // Ensure this selects all .box elements
    for (let i = 0; i < Boxes.length; i++) {
        if(i<LEVEL.length)
            Boxes[i].dataset.img = LEVEL[i]; // Set data-img attribute
    }
    orderArray=Array.from(Array(Boxes.length).keys());
    orderArray=ShuffleIndexes(orderArray);
    //Assigning order to each card
    Boxes.forEach((box,index)=>{
        // box.style.order=orderArray[index];  
        box.style.order=orderArray[index];
    }
    
    )

}
function ShuffleIndexes(array)
{  
    let temp;
    let current=0;
    let random;
      while(current<array.length) //Loop until we have the index                                 //of the array having the order
   { random=Math.floor(Math.random()*array.length);
    temp=array[current];
    array[current]=array[random];
    array[random]=temp;
    current++;}
    return array;
}

// -------------------------FUNCTIONS-----------------------------------
function CheckFlippedCards() {
    if (FlippedCards.length === 2)  // Ensure there are exactly two cards flipped
    {
    isComparing=true;

    const firstCard = FlippedCards[0]; // Capture the cards at the moment
    const secondCard = FlippedCards[1];

    if (firstCard.dataset.img !== secondCard.dataset.img) { // Non-Matching case
        setTimeout(() => {
            swap();
            reverseThecard(firstCard);
            reverseThecard(secondCard);
            FlippedCards = []; // Empty out the array after flipping back
            isComparing=false;
        }, 1000); // Delay before flipping back (1 second)
    } else {
        // If they match, just clear the array immediately
        FlippedCards = [];
        Addpoints();MatchedPairs++;
        CheckIfGameOver();//Maybe this last flip was the last one
        isComparing=false;//Now the user can click in
    }
    }
    else
        return;
}
function handleClick(event) {
    if (isComparing) 
        return;
    const box = event.currentTarget; // Get the clicked element
    const isClicked = box.dataset.clicked === 'true';

    if (!isClicked) {
        // Perform the action for the first click
        switchBoxtoimg(box);
        box.dataset.clicked = 'true'; // Update the flag
    }
   
}
function switchBoxtoimg(box) 
     {  
        FlippedCards.push(box);
        
        const imgSrc =box.getAttribute('data-img');

        const img =document.createElement('img');
        img.src = imgSrc; // Use the image URL from data-img
        img.alt = 'Clicked Image';

        // Replace the div content with the image
        box.innerHTML = '';
        box.appendChild(img);  

        // Optionally add some animation
        img.style.display = 'block';
        img.style.opacity = 0;
        img.style.width='100%';
        img.style.height='100%';
        img.style.objectFit='cover';
        img.style.transition = 'opacity 0.5s ease-in-out';
       
        setTimeout(() => {
            img.style.opacity = 1;
        }, 10)
        TwoCardsTrigger();
    }
function reverseThecard(box)
{   
    box.dataset.clicked='false';
    let image=box.querySelector('img');
    if (image) {
        box.removeChild(image);
    }
}
function TwoCardsTrigger()
{
    if(FlippedCards.length==2)
    CheckFlippedCards();
    
}
function Addpoints()
{       if(Player1.getTurn())
       { Player1.setScore(Player1.getScore()+1);
        document.getElementById('player1-score').textContent=Player1.getScore();}
        else
       { Player2.setScore(Player2.getScore()+1);
        document.getElementById('player2-score').textContent=Player2.getScore();}
        swap();
}

function CheckIfGameOver() {
    (MatchedPairs==8)? DisplayMessage():null;
   
}
function DisplayMessage()
{   document.querySelectorAll('.box').forEach((box) => {
    reverseThecard(box);
})
    const message=document.createElement('p');
    message.innerHTML=`GAME OVER !<br> ${winner()} <br><a href="game1.html">Replay<i class="fa-solid fa-arrow-rotate-left"></i></a>`;
    message.style.zIndex=1;
    document.querySelector('.grid').appendChild(message);
    message.style.fontSize='80px';
    message.style.fontWeight='800px';
    message.style.color='rgb(229, 200, 162)';
    message.style.position='absolute';
    message.style.top='50%';
    message.style.left='50%';
    message.style.transform='translate(-50%,-50%)';
    message.style.margin=0;
    message.style.webkitTextStroke='1px #000';
}

function winner()
{   if(Player1.getScore()==Player2.getScore())return "Draw"
    return(Player1.getScore()>Player2.getScore())?Player1.getName()+" won":Player2.getName()+" won";   
}
function swap()
{   if(Player1.getTurn())
    {Player2.setTurn(true);
     Player1.setTurn(false);
     removeHighlight('player1-name');
     HighlightCurrentPlayerName('player2-name');
    }
    else
   {
    Player1.setTurn(true);Player2.setTurn(false);
    removeHighlight('player2-name');
    HighlightCurrentPlayerName('player1-name')
   }
  
}
function HighlightCurrentPlayerName(Elementid)
{
    const Name=document.getElementById(Elementid);
    Name.classList.add('Highlight');
    
}
function removeHighlight(Elementid)
{
    document.getElementById(Elementid).classList.remove('Highlight');
}
// -------------------------MAIN--------------------------

InitialiseDataSet();


