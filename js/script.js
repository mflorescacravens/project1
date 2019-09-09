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
    initGame();
});

drawButton.addEventListener('click', function(e) {
    var url = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`;
    fetch(url)
    .then(function(data) {
        return data.json();
    })

    .then (function(json) {
        
        if (parseInt(playerAWinStat.textContent) + parseInt(playerBWinStat.textContent) + parseInt(tiesStat.textContent) == 26 && parseInt(playerAWinStat.textContent) > parseInt(playerBWinStat.textContent)) {
            gameOverPAW();
            document.getElementById('a').textContent++;
            drawButton.disabled = true;
        } else if(parseInt(playerAWinStat.textContent) + parseInt(playerBWinStat.textContent) + parseInt(tiesStat.textContent) == 26 && parseInt(playerBWinStat.textContent) > parseInt(playerAWinStat.textContent)) {
            gameOverPBW();
            document.getElementById('b').textContent++;
            drawButton.disabled = true;
        } else if(parseInt(playerAWinStat.textContent) + parseInt(playerBWinStat.textContent) + parseInt(tiesStat.textContent) == 26 && parseInt(playerAWinStat.textContent) == parseInt(playerBWinStat.textContent)) {
            gameOverTie();
            drawButton.disabled = true;
        } else {
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
    drawButton.disabled = false;
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