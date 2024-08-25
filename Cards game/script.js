//Event: Cards clicked
//Event : Wrong match (cards returning to their initial state)
//Event: correct match 
// Event : time out
//Event : Game Over

let Level1 = [
    'CardsGameImages/pic (1).jpg', 'CardsGameImages/pic (2).jpg', 'CardsGameImages/pic (3).jpg',
    'CardsGameImages/pic (4).jpg', 'CardsGameImages/pic (5).jpg', 'CardsGameImages/pic (6).jpg',
    'CardsGameImages/pic (7).jpg', 'CardsGameImages/pic (8).jpg', 'CardsGameImages/pic (1).jpg', 
    'CardsGameImages/pic (2).jpg', 'CardsGameImages/pic (3).jpg','CardsGameImages/pic (4).jpg', 
    'CardsGameImages/pic (5).jpg', 'CardsGameImages/pic (6).jpg',
    'CardsGameImages/pic (7).jpg', 'CardsGameImages/pic (8).jpg'
];
let Level2=['CardsGameImages/pic (9).jpg',
    'CardsGameImages/pic (10).jpg', 'CardsGameImages/pic (11).jpg', 'CardsGameImages/pic (12).jpg',
    'CardsGameImages/pic (13).jpg', 'CardsGameImages/pic (14).jpg', 'CardsGameImages/pic (15).jpg',
    'CardsGameImages/pic (16).jpg','CardsGameImages/pic (9).jpg',
    'CardsGameImages/pic (10).jpg', 'CardsGameImages/pic (11).jpg', 'CardsGameImages/pic (12).jpg',
    'CardsGameImages/pic (13).jpg', 'CardsGameImages/pic (14).jpg', 'CardsGameImages/pic (15).jpg',
    'CardsGameImages/pic (16).jpg'
]
// -------------------------INITIALIZATION--------------------------
function InitialiseDataSet() {
    let Boxes = document.querySelectorAll('.box'); // Ensure this selects all .box elements
    for (let i = 0; i < Boxes.length; i++) {
        if(i<Level1.length)
            Boxes[i].dataset.img = Level1[i]; // Set data-img attribute
    }
}
// -------------------------TURN THE CARDS--------------------------
let FlippedCards = [];
function CheckFlippedCards()
{
    if(FlippedCards[0].dataset.img!==FlippedCards[1].dataset.img)//Non Matching case
    {setTimeout(() => {
        reverseThecard(FlippedCards[0]);
        reverseThecard(FlippedCards[1]);
        FlippedCards = []; // Empty out the array after flipping back
    }, 1000);} // Delay before flipping back (1 second)
 else {
    // If they match, just clear the array
    FlippedCards = [];
}
}
InitialiseDataSet();
document.querySelectorAll('.box').forEach((box) => {
    // Initialize the flag in the dataset of each box
    box.dataset.clicked = 'false';

    // Attach a single event listener
    box.addEventListener('click', handleClick);
});
// -------------------------FUNCTIONS-----------------------------------
function handleClick(event) {
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
        if(FlippedCards.length<2)
        { FlippedCards.push(box);

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
        }, 10)}
        if(FlippedCards.length==2)
        {
            CheckFlippedCards(FlippedCards);
        }
     }
function reverseThecard(box)
{   box.dataset.clicked = 'false';
    let image=box.querySelector('img');
    if (image) {
        box.removeChild(image);
    }
    //Animation : smooth come back of the box
    box.style.opacity = 0;
    box.style.transition = 'opacity 0.5s ease-in-out';
    setTimeout(()=>
    {
      box.style.opacity=1
    },10
)
}
