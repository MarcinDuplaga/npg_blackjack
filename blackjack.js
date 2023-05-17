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

function stay() {
    dealerSum = reduceAce(dealerSum, dealerAceCount);
    yourSum = reduceAce(yourSum, yourAceCount);


    canHit = false;
    document.getElementById("hidden").src = "./cards/" + hidden + ".png";


    let message = "";
    if (yourSum > 21) {
        message = `You lose, ${user.username}!`;
        finished('lost');
    }
    else if (dealerSum > 21) {
        message = `You win, ${user.username}!`;
        finished('won');
    }
    else if (yourSum == dealerSum) {
        message = "Tie!";
        finished("tie")
    }
    else if (yourSum > dealerSum) {
        message = `You win, ${user.username}!`;
        finished('won');
    }
    else if (yourSum < dealerSum) {
        message = `You lose, ${user.username}!`;
        finished('lost');
    }

   
}

