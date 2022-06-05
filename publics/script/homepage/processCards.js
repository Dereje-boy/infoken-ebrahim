const image = document.querySelector("#card-image");
const title = document.querySelector("#card-title");
const desc = document.querySelector("#card-desc");
const cite = document.querySelector("#card-cite");


btnNext.addEventListener('click',()=>{
    currentCard ++;
    changeCards();
})
btnPrevious.addEventListener('click',()=>{
    currentCard --;
    if (currentCard<0) currentCard = 0;
    changeCards();
})

let currentCard = 0;
changeCards();



function changeCards() {
    let random = currentCard % cardContents.length;
    image.src = cardContents[random].image;
    title.innerText = cardContents[random].title;
    desc.innerText = cardContents[random].desc;
    cite.innerText = cardContents[random].cite;
}