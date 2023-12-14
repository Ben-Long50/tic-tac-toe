const domEvents = (function() {

    //cache DOM
    const gameBoard = document.querySelector('#game-board');
    const gameSpaces = gameBoard.querySelectorAll('.game-space');
    const playerForm = document.querySelector('dialog#player-input-dialog');
    const submitButton = playerForm.querySelector('button');
    const player1 = document.querySelector('#player-1');
    const player2 = document.querySelector('#player-2');
    const turnCounter = document.querySelector('#turn-counter');
    const gameEndDialog = document.querySelector('dialog#game-end-dialog');
    const endMessage = document.querySelector('#end-message');
    const closeButton = document.querySelector('#close-button');
    const resetPlayersButton = document.querySelector('#reset-players-button');
    const resetGameButton = document.querySelector('#reset-game-button');
    const player1Input = document.querySelector('#player-1-name');
    const player2Input = document.querySelector('#player-2-name');
    let player1Value = '';
    let player2Value = '';
    
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

    submitButton.addEventListener('click', () => {
        updatePlayerNames();
        updateTurn(gameFlow.turn);
    })

    resetPlayersButton.addEventListener('click', showPlayerForm)

    resetGameButton.addEventListener('click', () => {
        game.resetGameBoard();
        updateGameBoard();
        gameFlow.resetTurn();
        updateTurn(gameFlow.turn);
    })

    closeButton.addEventListener('click', () => {
        game.resetGameBoard();
        player1Input.value = '';
        player2Input.value = '';
        gameEndDialog.close(); 
    })

    //DOM Functions
    function getPlayer1Value() {
        return player1Value;
    }

    function getPlayer2Value() {
        return player2Value;
    }

    function updatePlayerNames() {
        player1Value = player1Input.value;
        player2Value = player2Input.value;
        player1.textContent = player1Value + `: ${game.player1Token}`;
        player2.textContent = player2Value + `: ${game.player2Token}`;
    }

    function updateGameBoard() {
        const gameBoardFlat = game.gameBoard.flat();
        let index = 0;
        gameSpaces.forEach(gameSpace => {
            gameSpace.textContent = gameBoardFlat[index];
            index++;
        })
    }

    function updateTurn(num) {
        turnCounter.textContent = `Turn: ${num}`;
    }

    function showPlayerForm() {
        playerForm.showModal();
    }

    function showGameEndDialog(message) {
        endMessage.textContent = message;
        gameEndDialog.showModal();
    }

    return {
        updateGameBoard: updateGameBoard,
        updateTurn: updateTurn,
        showPlayerForm: showPlayerForm,
        showGameEndDialog: showGameEndDialog,
        getPlayer1Value: getPlayer1Value,
        getPlayer2Value: getPlayer2Value
    }
})();

domEvents.showPlayerForm();