const game = (function() {
    const gameBoard = [
        [' ', ' ', ' '],
        [' ', ' ', ' '],
        [' ', ' ', ' ']
    ];

    const player1Token = 'X';
    const player2Token = 'O';

    function player1Move(boardRow, boardColumn) {
        if(gameBoard[boardRow][boardColumn] === ' '){
            gameBoard[boardRow][boardColumn] = player1Token;
            domEvents.updateGameBoard();
            gameEndCheck();
            gameFlow.advanceTurn();
        }
    }

    function player2Move(boardRow, boardColumn) {
        if(gameBoard[boardRow][boardColumn] === ' '){
            gameBoard[boardRow][boardColumn] = player2Token;
            domEvents.updateGameBoard();
            gameEndCheck();
            gameFlow.advanceTurn();
        }
    }

    function gameEndCheck() {

        const winPatterns = [
            gameBoard[0][0] + gameBoard[0][1] + gameBoard[0][2],
            gameBoard[1][0] + gameBoard[1][1] + gameBoard[1][2],
            gameBoard[2][0] + gameBoard[2][1] + gameBoard[2][2],
            gameBoard[0][0] + gameBoard[1][0] + gameBoard[2][0],
            gameBoard[0][1] + gameBoard[1][1] + gameBoard[2][1],
            gameBoard[0][2] + gameBoard[1][2] + gameBoard[2][2],
            gameBoard[0][0] + gameBoard[1][1] + gameBoard[2][2],
            gameBoard[0][2] + gameBoard[1][1] + gameBoard[2][0]
        ]

        let endMessage = null;
        winPatterns.forEach(combination => {
            if(combination === 'XXX'){
                endMessage =  'Player 1 Wins!'
                resetGameBoard();
                domEvents.updateGameBoard();
            }
            else if(combination === 'OOO'){
                endMessage =  'Player 2 Wins!'
                resetGameBoard();
                domEvents.updateGameBoard();
            }
        });
        console.log(endMessage);
    }

    function resetGameBoard() {
        for(let i = 0; i < gameBoard.length; i++){
            for(let j = 0; j < gameBoard[i].length; j++){
                gameBoard[i][j] = ' ';
            }
        }
    }

    return {
        gameBoard: gameBoard,
        player1Move: player1Move,
        player2Move: player2Move,
    };
    
})();

const gameFlow = (function() {
    let turn = 1;
    function advanceTurn() {
        turn++;
    }

    function determineTurn(row, index) {
        if(turn % 2 != 0){
            game.player1Move(row, index);
        }
        else if(turn % 2 === 0){
            game.player2Move(row, index);
        }
    }

    return {
        turn: turn,
        advanceTurn: advanceTurn,
        determineTurn: determineTurn
    }
})();

const domEvents = (function() {

    //cache DOM
    const gameBoard = document.querySelector('#game-board');
    const gameSpaces = gameBoard.querySelectorAll('.game-space');

    //Event Listeners
    gameSpaces.forEach(gameSpace => {
        gameSpace.addEventListener('click', () => {
            const gameSpaceArray = Array.from(gameSpace.parentNode.children);
            const index = gameSpaceArray.indexOf(gameSpace);
            const count = 3;
            const rowIndex = Math.floor(index / count);
            const colIndex = index % count;
            gameFlow.determineTurn(rowIndex, colIndex)
        })
    })

    function updateGameBoard() {
        const gameBoardFlat = game.gameBoard.flat();
        let index = 0;
        gameSpaces.forEach(gameSpace => {
            gameSpace.textContent = gameBoardFlat[index];
            index++;
        })
    }

    return {
        updateGameBoard: updateGameBoard
    }

})();