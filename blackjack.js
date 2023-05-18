//Początkowe zmienne
var dealerSum = 0;
var yourSum = 0;


var dealerAceCount = 0;
var yourAceCount = 0;


var hidden = [];
var deck = [];
=======
function buildDeck() {
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let types = ["C", "D", "H", "S"];

    for (let i = 0; i < types.length; i++) {
        for (let j = 0; j < values.length; j++) {
            deck.push(values[j] + "-" + types[i]);
        }
    }
}

function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length);
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
}


function hit() {
    if (!canHit) {
        return;
    }


    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./cards/" + card + ".png";
    yourSum += getValue(card);
    yourAceCount += checkAce(card);
    document.getElementById("your-cards").append(cardImg);
    setTimeout(() => cardImg.classList.add('animate'),10)
    document.getElementById("your-sum").innerText = reduceAce(yourSum, yourAceCount);
    
     if (reduceAce(yourSum, yourAceCount) > 21) {
        canHit = false;
        document.getElementById("results").innerText = `You lose, ${user.username}!`;
        document.getElementById('dropdown').style.zIndex = '10';
        document.getElementById('dropdown').style.opacity = '1';
        document.getElementById('results').style.transform = 'translateY(0)';
        finished('lost');
    }

}
