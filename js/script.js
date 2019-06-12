


// make war...don't f it up. make it look good too because steve said
// the js side of things is very easy.

// Variables

var roundCounter = 0;
const ROUNDS = 26;
var deckId;
var cardNumValue = {
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    JACK : 11,
    QUEEN : 12,
    KING : 13,
    ACE : 14
};
// var cardImgArray = ['2_of_diamonds.png', '2_of_hearts.png', '2_of_spades.png', '3_of_clubs.png', '3_of_diamonds.png', '3_of_hearts.png', '3_of_spades.png', '4_of_clubs.png', '4_of_diamonds.png', '4_of_hearts.png', '4_of_spades.png', '5_of_clubs.png', '5_of_diamonds.png', '5_of_hearts.png', '5_of_spades.png', '6_of_clubs.png', '6_of_diamonds.png', '6_of_hearts.png', '6_of_spades.png', '7_of_clubs.png', '7_of_diamonds.png', '7_of_hearts.png', '7_of_spades.png', '8_of_clubs.png', '8_of_diamonds.png', '8_of_hearts.png', '8_of_spades.png', '9_of_clubs.png', '9_of_diamonds.png', '9_of_hearts.png', '9_of_spades.png', '10_of_clubs.png', '10_of_diamonds.png', '10_of_hearts.png', '10_of_spades.png', 'ace_of_clubs.png', 'ace_of_diamonds.png', 'ace_of_hearts.png', 'ace_of_spades.png', 'ace_of_spades2.png', 'jack_of_clubs.png', 'jack_of_clubs2.png', 'jack_of_diamonds.png', 'jack_of_diamonds2.png', 'jack_of_hearts.png', 'jack_of_hearts2.png', 'jack_of_spades.png', 'jack_of_spades2.png', 'king_of_clubs.png', 'king_of_clubs2.png', 'king_of_diamonds.png', 'king_of_diamonds2.png', 'king_of_hearts.png', 'king_of_hearts2.png', 'king_of_spades.png', 'king_of_spades2.png', 'queen_of_clubs.png', 'queen_of_clubs2.png', 'queen_of_diamonds.png', 'queen_of_diamonds2.png', 'queen_of_hearts.png', 'queen_of_hearts2.png', 'queen_of_spades.png', 'queen_of_spades2.png'];



// DOM Hooks

var playerAWinStat = document.getElementById('playerascore');
var playerBWinStat = document.getElementById('playerbscore');
var tiesStat = document.getElementById('ties');
var cardA = document.getElementById('acardimg');
var cardB = document.getElementById('bcardimg');
var drawButton = document.getElementById('draw');
var resetButton = document.getElementById('reset');
var shuffleButton = document.getElementById('shuffle');
var cardAValue;
var cardBValue;
var modal = document.getElementById('modal');
var closebtn = document.getElementsByClassName('closebtn')[0];
var modalContent = document.getElementById('modalcontent');




// event listeners

document.addEventListener("DOMContentLoaded", function() {
    drawButton = document.getElementById('draw');
    resetButton = document.getElementById('reset');
    shuffleButton = document.getElementById('shuffle');
    initGame();
    
});

// gameOver();

drawButton.addEventListener('click', function(e) {
    var url = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`;
    fetch(url)
    .then(function(data) {
        return data.json();
    })

    .then (function(json) {
        
        if (parseInt(playerAWinStat.textContent) + parseInt(playerBWinStat.textContent) + parseInt(tiesStat.textContent) == 4 && parseInt(playerAWinStat.textContent) > parseInt(playerBWinStat.textContent)) {
            gameOverPAW();
        } else if(parseInt(playerAWinStat.textContent) + parseInt(playerBWinStat.textContent) + parseInt(tiesStat.textContent) == 4 && parseInt(playerBWinStat.textContent) > parseInt(playerAWinStat.textContent)) {
            gameOverPBW();
        } else if(parseInt(playerAWinStat.textContent) + parseInt(playerBWinStat.textContent) + parseInt(tiesStat.textContent) == 4 && parseInt(playerAWinStat.textContent) == parseInt(playerBWinStat.textContent)) {
            gameOverTie();
        } else {
            // this is effing everything up...why is it getting hung up
            cardA.src = json.cards[0].images.png;
            cardB.src = json.cards[1].images.png;
            cardAValue = json.cards[0].value;
            cardBValue = json.cards[1].value;
            playerWin();
        }
    });
});



resetButton.addEventListener('click', function() {
    playerAWinStat.textContent = 0;
    playerBWinStat.textContent = 0;
    tiesStat.textContent = 0;
    document.getElementById.textContent = 0;
    fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
        .then(function(data) {
            return data.json();
        })
        .then(function(json) {
            deckId = json.deck_id;
            cardA.src = "https://opengameart.org/sites/default/files/card%20back%20red.png";
            cardB.src = "https://opengameart.org/sites/default/files/card%20back%20red.png";
        });
    // why tf is this not making the image go back to it's original state...?
})


// game logic functions

function playerWin() {
    cardAValue = parseInt(cardNumValue[cardAValue]);
    cardBValue = parseInt(cardNumValue[cardBValue]);
    if (cardAValue > cardBValue) {
        playerAWinStat.textContent++;
    } else if (cardBValue > cardAValue) {
        playerBWinStat.textContent++;
    } else { 
        tiesStat.textContent++;
    }
};

function gameOverPAW() { 
    //display overlay or modal
    modal.style.display = 'block';
    closebtn.onclick = function() {
        modal.style.display = 'none';
    } 
    //player a wins
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    modalContent.innerHTML = 'Player A Wins! Shuffle to play again!';
}

function gameOverPBW() {
    modal.style.display = 'block';
    closebtn.onclick = function() {
        modal.style.display = 'none';
    } 
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    modalContent.innerHTML = 'Player B Wins! Shuffle to play again!';

}
function gameOverTie() {
    modal.style.display = 'block';
    closebtn.onclick = function() {
        modal.style.display = 'none';
    } 
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    modalContent.innerHTML = 'Tie! Shuffle to play again!';

}


function initGame() {
    fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
        .then(function(data) {
            return data.json();
        })
        .then(function(json) {
            deckId = json.deck_id;
            cardA.src = "https://opengameart.org/sites/default/files/card%20back%20red.png";
            cardB.src = "https://opengameart.org/sites/default/files/card%20back%20red.png";
        });
}




// parse int is going to be needed for comparing values of cards.



