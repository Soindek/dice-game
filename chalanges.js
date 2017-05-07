"use strict";

var scores, roundScore, activePlayer, gamePlaying;



function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
        
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
        
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
        
    document.querySelector('.dice-1').style.display = 'none';
    document.querySelector('.dice-2').style.display = 'none';
    document.querySelector('.btn-roll').style.display = 'block';
}



function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;

    document.querySelector('.dice-1').style.display = 'none';
    document.querySelector('.dice-2').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Beus';
    document.getElementById('name-1').textContent = 'Laci';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');    
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
        
    gamePlaying = true;
    
}


init();


document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        
        //1. We want a random number
        var diceOne = Math.floor(Math.random() * 6) + 1;
        var diceTwo = Math.floor(Math.random() * 6) + 1;

        //2. Display the result
        var diceOneDOM = document.querySelector('.dice-1');
        diceOneDOM.style.display = 'block';
        diceOneDOM.src = 'dice-' + diceOne + '.png';
        
        var diceTwoDOM = document.querySelector('.dice-2');
        diceTwoDOM.style.display = 'block';
        diceTwoDOM.src = 'dice-' + diceTwo + '.png';
        
        console.log(diceOne);
        console.log(diceTwo);

        if (diceOne + diceTwo === 12) {
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = '0';
            
            document.querySelector('.btn-roll').style.display = 'none';
            setTimeout(nextPlayer, 1000);
            
        } else if (diceOne !== 1 && diceTwo !== 1) {
            //Add score
            roundScore += diceOne + diceTwo;

            document.querySelector('#current-' + activePlayer).textContent = roundScore;

        } else {
            //Next player
            document.querySelector('.btn-roll').style.display = 'none';
            setTimeout(nextPlayer, 1000);
        }
        
    }
    
});



document.querySelector('.btn-hold').addEventListener('click', function() {
    
    
    if (gamePlaying) {
        //1. Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;
        
        //2. Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        
        var input = document.querySelector('.input-field').value;
        var winningScores;
    
        if (input) {
            winningScores = input;
        } else {
            winningScores = 100;
        }

        //3. Check if the Player won the game
        if (scores[activePlayer] >= winningScores) {

            document.querySelector('#name-' + activePlayer).textContent = 'Nyertél!';
            document.querySelector('.dice-1').style.display = 'none';
            document.querySelector('.dice-2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;

        } else {
        //4. Next player
            nextPlayer();    
        } 
    }

});



document.querySelector('.btn-new').addEventListener('click', init);














