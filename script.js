
let clicksStack=[];
document.querySelectorAll('.box').forEach((box) => {
    box.addEventListener('click', switchBoxtoimg)
})

function switchBoxtoimg() 
     {
        const imgSrc =this.getAttribute('data-img');

        const img =document.createElement('img');
        img.src = imgSrc; // Use the image URL from data-img
        img.alt = 'Clicked Image';

        // Replace the div content with the image
        this.innerHTML = '';
        this.appendChild(img);  

        // Optionally add some animation
        img.style.display = 'block';
        img.style.opacity = 0;
        img.style.width='100%';
        img.style.height='auto';
        img.style.transition = 'opacity 0.5s ease-in-out';
        
        setTimeout(() => {
            img.style.opacity = 1;
        }, 10)

     }
function reverseThecard()
{   
    
}
