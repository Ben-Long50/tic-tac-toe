const gameFlow = (function() {
    let turn = 1;
    function advanceTurn() {
        turn++;
        console.log(turn);
        domEvents.updateTurn(turn);
    }

    function determineTurn(row, index) {
        if(turn % 2 != 0){
            game.player1Move(row, index);
        }
        else if(turn % 2 === 0){
            game.player2Move(row, index);
        }
    }

    function resetTurn() {
        turn = 1;
    }

    return {
        turn: turn,
        advanceTurn: advanceTurn,
        determineTurn: determineTurn,
        resetTurn: resetTurn
    }
})();