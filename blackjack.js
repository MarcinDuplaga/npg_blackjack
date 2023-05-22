
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

function sendEmail() {
    if(recentResults.length<5) return
    const lastFive = recentResults.slice(-5);


    let isTrue = lastFive.every(elem => elem.result === 'Victory!')
    var params = {
        username: user.username,
        email: user.email
    }
    const serviceID = "service_jcox09c"
    const templateID = 'template_j3pry8m'


    if(user.sendMessage && isTrue){
        console.log('yes')
        emailjs.send(serviceID, templateID, params)
            .then(message => alert("Check your inbox, there is a surprise!"))
            .catch(err => console.log(err))
    }
}
