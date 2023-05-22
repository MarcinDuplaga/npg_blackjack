
//Początkowe zmienne
var dealerSum = 0;
var yourSum = 0;

var dealerAceCount = 0;
var yourAceCount = 0;

var hidden = [];
var deck = [];
var recentResults = window.localStorage.getItem('recentResults') ?  JSON.parse(window.localStorage.getItem('recentResults')) : [];

var canHit = true;
var user = window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')) : {username:'', email:'', sendMessage:false};




function resize(){
    var dealerChildren = document.getElementById('dealer-cards').children;
    var playerChildren = document.getElementById('your-cards').children;
    if(window.innerWidth <= 810){
        document.getElementById('recent-results').style.width = '100vw';
        document.getElementById('profile').style.width = '100vw';
    }
    else{
        document.getElementById('recent-results').style.width = 'auto';
        document.getElementById('profile').style.width = 'auto';
    }
}

window.onresize = resize
window.onload = function(){


    buildDeck()
    shuffleDeck()
    startGame()
    sendEmail()
    resize()
    createResultsTable()
    document.getElementById('name').innerHTML = user.username
   
    document.getElementById("your-sum").innerText = reduceAce(yourSum, yourAceCount);


}


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




function changeProfile(){
    let nameInput = document.getElementById('username').value;
    let emailInput = document.getElementById('email').value;
    let checkboxInput = document.getElementById('agreement').checked;


    if(nameInput.length > 0) user.username = nameInput
    if(emailInput.length > 0) user.email = emailInput
    user.sendMessage = checkboxInput


    window.localStorage.setItem('user', JSON.stringify(user))
    document.getElementById('name').innerHTML = user.username
}

function toggleProfile(){
    document.getElementById('profile').classList.toggle('visible')
    document.getElementById('toggler-profile').classList.toggle('visible')
    if(window.innerWidth<=810){
        document.getElementById('recent-results').classList.remove('visible')
        document.getElementById('toggler').classList.remove('visible')
    }
}



