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
            gameEndCheck();
            console.log(game.gameBoard);
        }
    }

    function player2Move(boardRow, boardColumn) {
        if(gameBoard[boardRow][boardColumn] === ' '){
            gameBoard[boardRow][boardColumn] = player2Token;
            gameEndCheck();
            console.log(game.gameBoard);
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
            }
            else if(combination === 'OOO'){
                endMessage =  'Player 2 Wins!'
                resetGameBoard();
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
        gameBoard:gameBoard,
        player1Move:player1Move,
        player2Move:player2Move,
    };
    
})();

console.log(game.gameBoard);