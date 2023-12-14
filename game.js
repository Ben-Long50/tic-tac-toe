const game = (function() {
    const gameBoard = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];

    const player1Token = 'X';
    const player2Token = 'O';

    function player1Move(boardRow, boardColumn) {
        if(gameBoard[boardRow][boardColumn] === ''){
            gameBoard[boardRow][boardColumn] = player1Token;
            domEvents.updateGameBoard();
            gameEndCheck(domEvents.getPlayer1Value(), domEvents.getPlayer2Value());
            gameFlow.advanceTurn();
        }
    }

    function player2Move(boardRow, boardColumn) {
        if(gameBoard[boardRow][boardColumn] === ''){
            gameBoard[boardRow][boardColumn] = player2Token;
            domEvents.updateGameBoard();
            gameEndCheck(domEvents.getPlayer1Value(), domEvents.getPlayer2Value());
            gameFlow.advanceTurn();
        }
    }

    function gameEndCheck(player1Name, player2Name) {
        console.log(player1Name);
        console.log(player2Name);
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
                endMessage =  `${player1Name} Wins!`;
            }
            else if(combination === 'OOO'){
                endMessage =  `${player2Name} Wins!`;
            }
        });

        const gameBoardFlat = gameBoard.flat();
        if(!endMessage && !gameBoardFlat.includes('')){
            endMessage = 'It\'s a Tie!';
        }

        if(endMessage) {
            domEvents.showGameEndDialog(endMessage);
            domEvents.updateGameBoard();
            gameFlow.turn = 1;
        }

        console.log(endMessage);
    }

    function resetGameBoard() {
        for(let i = 0; i < gameBoard.length; i++){
            for(let j = 0; j < gameBoard[i].length; j++){
                gameBoard[i][j] = '';
            }
        }
    }

    return {
        gameBoard: gameBoard,
        player1Token: player1Token,
        player2Token: player2Token,
        player1Move: player1Move,
        player2Move: player2Move,
        resetGameBoard: resetGameBoard
    };
    
})();