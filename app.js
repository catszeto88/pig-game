/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND/CURRENT score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, dice, goalScore;


init();
//optional
//document.querySelector('.btn-roll').addEventListener();

function init() {
    scores = [0,0];
    roundScore = 0;

    //0 is player 1, 1 is player 2
    activePlayer = 0;
    
    document.querySelector('#current-0').textContent = '0';
    document.querySelector('#score-0').textContent = '0';
    document.querySelector('#current-1').textContent = '0';
    document.querySelector('#score-1').textContent = '0';

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.btn-submit').style.visibility = "visible";
    document.getElementById('goal-score-text').readOnly = false;
    document.getElementById('goal-score-label').textContent = "Enter goal score:";
    document.getElementById('goal-score').classList.add("active-label");
    document.getElementById('goal-score-text').value = "";
    document.querySelector('.btn-roll').setAttribute("disabled","disabled");
    document.querySelector('.btn-hold').setAttribute("disabled","disabled");
}

function submit() {
    goalScore = document.getElementById('goal-score-text').value;
    
    if (isNaN(goalScore) || goalScore < 1 || goalScore > 999) {
        document.getElementById('goal-score-warning').textContent = "Please enter a value between 1-999";
    } else {
        document.getElementById('goal-score-warning').textContent = "";
        document.getElementById('goal-score-text').readOnly = true;
        document.getElementById('goal-score').classList.remove("active-label");
        document.querySelector('.btn-submit').style.visibility = "hidden";
        document.getElementById('goal-score-label').textContent = "Goal Score:";
        
        document.querySelector('.btn-roll').removeAttribute("disabled");
        document.querySelector('.btn-hold').removeAttribute("disabled");
    }
}

function diceRoll() {
    
    dice = Math.floor(Math.random() * 6) + 1;
    
    document.querySelector('.dice').style.display = 'block';
    document.querySelector('.dice').src = 'dice-' + dice + '.png';

    //updates the round score with the dice result if dice roll is not 1
    if (dice !== 1) {
        roundScore += dice;
        document.querySelector('#current-'+ activePlayer.toString()).textContent = roundScore.toString();
    } else {
        //player loses all the round score points, and it's the next player's turn. Switch players without updating global score
        switchPlayer();
    }
}

function hold() {
    scores[activePlayer] = scores[activePlayer] + roundScore;
    document.querySelector('#score-' + activePlayer.toString()).textContent = scores[activePlayer];
    console.log("Added to global score");
    
    if (scores[activePlayer] >= goalScore) {
        console.log("Game over");
        
        document.querySelector('.player-' + activePlayer.toString() + '-panel').classList.add('winner');
        
        document.querySelector('.btn-roll').setAttribute("disabled","disabled");
        document.querySelector('.btn-hold').setAttribute("disabled","disabled");
       
    }
    else {
        switchPlayer();
    }

}

function newGame() {
    init();
    
    //shouldn't have issues even if winner class is not there
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    
    document.querySelector('.btn-roll').removeAttribute("disabled");
    document.querySelector('.btn-hold').removeAttribute("disabled");
    
}

function switchPlayer() {
    roundScore = 0;
    
    document.querySelector('#current-'+ activePlayer.toString()).textContent = roundScore.toString();
    document.querySelector('.player-' + activePlayer.toString() + '-panel').classList.toggle('active');
    
    activePlayer === 0? activePlayer = 1 : activePlayer = 0;
    
    document.querySelector('.player-' + activePlayer.toString() + '-panel').classList.toggle('active');
}




//document.querySelector('#current-' + activePlayer).innerHTML = '<em>'dice'</em>'; //innerHTML needs to be a string