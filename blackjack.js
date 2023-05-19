
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
    
    document.getElementById("dealer-sum").innerText = dealerSum;
    document.getElementById("your-sum").innerText = yourSum;
    document.getElementById("results").innerText = message;


    setTimeout(() => {
        document.getElementById('dropdown').style.zIndex = '10';
        document.getElementById('dropdown').style.opacity = '1';
        document.getElementById('results').style.transform = 'translateY(0)';
    },800)
   
}

=======
function startGame() {
    hidden = deck.pop();
    dealerSum += getValue(hidden);
    dealerAceCount += checkAce(hidden);
    while (dealerSum < 17) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        dealerSum += getValue(card);
        dealerAceCount += checkAce(card);
        document.getElementById("dealer-cards").append(cardImg);
        setTimeout(() => cardImg.classList.add('animate'),10);
    }


    for (let i = 0; i < 2; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        yourSum += getValue(card);
        yourAceCount += checkAce(card);
        document.getElementById("your-cards").append(cardImg);
        setTimeout(() => cardImg.classList.add('animate'),10);
    }
}
function getValue(card) {
    let data = card.split("-");
    let value = data[0];


    if (isNaN(value)) {
        if (value == "A") {
            return 11;
        }
        return 10;
    }
    return parseInt(value);
}

function checkAce(card) {
    if (card[0] == "A") {
        return 1;
    }
    return 0;
}

function reduceAce(playerSum, playerAceCount) {
    while (playerSum > 21 && playerAceCount > 0) {
        playerSum -= 10;
        playerAceCount -= 1;
    }
    return playerSum;
}


=======



