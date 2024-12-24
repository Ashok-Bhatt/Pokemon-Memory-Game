
let cards = [
    {
        name: "pikachu",
        image: "images/pikachu.png"
    },
    {
        name: "pikachu",
        image: "images/pikachu.png"
    },
    {
        name: "bulbasaur",
        image: "images/bulbasaur.png"
    },
    {
        name: "bulbasaur",
        image: "images/bulbasaur.png"
    },
    {
        name: "charizard",
        image: "images/charizard.png"
    },
    {
        name: "charizard",
        image: "images/charizard.png"
    },
    {
        name: "lucario",
        image: "images/lucario.png"
    },
    {
        name: "lucario",
        image: "images/lucario.png"
    },
    {
        name: "luxray",
        image: "images/luxray.png"
    },
    {
        name: "luxray",
        image: "images/luxray.png"
    },
    {
        name: "piplup",
        image: "images/piplup.png"
    },
    {
        name: "piplup",
        image: "images/piplup.png"
    },
    {
        name: "sceptile",
        image: "images/sceptile.png"
    },
    {
        name: "sceptile",
        image: "images/sceptile.png"
    },
    {
        name: "snorlax",
        image: "images/snorlax.png"
    },
    {
        name: "snorlax",
        image: "images/snorlax.png"
    },
    
];

cards.sort( ()=> 0.5 - Math.random());

const scoreDisplay = document.querySelector("#score");
const turnsDisplay = document.querySelector("#turns");
const memoryBoard = document.querySelector(".grid");

let current_cards = [];
let current_cards_index = [];
let searched_cards = [];
let turns, score;

function reFlipCards(first, second){
    document.getElementById(first).src = "images/pokedex.png";
    document.getElementById(second).src = "images/pokedex.png";
}

function flipCard(){

    let index = this.getAttribute("id");    // id no of an image

    if (current_cards.length == 0 || this.id != current_cards[0].id){
        current_cards.push(this);           // this : clicked image
        current_cards_index.push(index);
        document.getElementById(index).src = cards[index-1].image;
        turns = turnsDisplay.innerHTML;
        turnsDisplay.innerHTML = String(parseInt(turns) + 1);
    }

    if (current_cards.length == 2){

        let firstCardIndex = current_cards_index[0];
        let secondCardIndex = current_cards_index[1];
        
        if (current_cards[0].src == current_cards[1].src){
            searched_cards.push(firstCardIndex);
            searched_cards.push(secondCardIndex);
            document.getElementById(firstCardIndex).removeEventListener("click", flipCard);
            document.getElementById(secondCardIndex).removeEventListener("click", flipCard);
            document.getElementById(firstCardIndex).src = "images/done.png";
            document.getElementById(secondCardIndex).src = "images/done.png";  
            score = scoreDisplay.innerHTML;
            scoreDisplay.innerHTML = String(parseInt(score) + 1);
        }
        else {
            setTimeout(reFlipCards, 250, firstCardIndex, secondCardIndex);
        }

        current_cards = [];
        current_cards_index = [];
    }

    if (searched_cards.length == cards.length){
        setTimeout(()=>{
            alert("Game Completed!");
            searched_cards = [];
            for (let i=1; i<=16; i++){
                let card = document.getElementById(i);
                card.src = "images/pokedex.png";
                card.addEventListener("click", flipCard);
            }
            scoreDisplay.innerHTML = "0";
            turnsDisplay.innerHTML = "0";
        }, 100)
    }
}

for (let i=1; i<=cards.length; i++){
        
    let card = document.createElement("img");
    card.setAttribute("id", i);
    card.setAttribute("src", "images/pokedex.png");

    card.addEventListener("click", flipCard);
    memoryBoard.appendChild(card);

}