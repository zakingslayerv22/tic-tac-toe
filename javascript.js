//this function represents the state of the board
//each square would hold a cell() (defined later)

function createGameBoard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    //create 2D array that would represent the board's state

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(createCell());
        }
    }

    const resetBoard = () => {
        board.forEach((row) => row.forEach((cell) => cell.resetCell()));
    }

    const getBoard = () => board;


    const placeMarker = (row, column, player) => {
        if (board[row][column].getCellValue() === "") {
            board[row][column].placePlayerMarker(player);
        } else {
            //wrong move, a marker is already here
            return;
        }
    }

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getCellValue()));
        console.log(boardWithCellValues)
    }

    const returnBoard = () => board.map((row) => row.map((cell) => cell.getCellValue()));


    return { getBoard, placeMarker, printBoard, returnBoard, resetBoard}

}

function createCell() {
    //default cell value
    let cellValue = "";

    const resetCell = () => cellValue = "";

    //player would be able to change the value of the cell
    const placePlayerMarker = (player) => {
        cellValue = player;
    }

    //get the value of the cell
    const getCellValue = () => cellValue;

    return { placePlayerMarker, getCellValue, resetCell };
}


function controlGame(
    playerOneName = "Player One",
    playerTwoName = "Player Two",
) {

    const gameBoard = createGameBoard();

    const players = 
    [
        {
            name: playerOneName,
            marker: "X"
        },

        {
            name: playerTwoName,
            marker: "O"
        }

    ];

    let activePlayer = players[0];

    //reset active player
    const resetActivePlayer = () => {
        activePlayer = players[0];
    };

    //toggle active player
    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    const getActivePlayer = () => activePlayer;
    

    const printNewRound = () => {
        gameBoard.printBoard();
        console.log(`Its ${getActivePlayer().name}'s turn to play!`)
    }

    let playersMoves = 0
   
    const resetGame = () => {
        gameBoard.resetBoard();
        resetActivePlayer();
        playersMoves = 0;
    }

    const getThreeValues = (start, offset) => {
        let result = ""

        for (let i = start; i < start + offset * 3; i += offset) {
            result += gameBoard.returnBoard()[Math.floor(i / 3)][i % 3];
        }
        return result;
    }

    const checkWinnerOrTie = () => {
        const winningCombos = [];

        //rows
        winningCombos.push(getThreeValues(0, 1));//1,2,3
        winningCombos.push(getThreeValues(3, 1));//3,4,5
        winningCombos.push(getThreeValues(6, 1));//6,7,8

        //columns
        winningCombos.push(getThreeValues(0, 3));//0,3,6
        winningCombos.push(getThreeValues(1, 3));//1,4,7
        winningCombos.push(getThreeValues(2, 3));//2,5,8

        //diagonals

        winningCombos.push(getThreeValues(0, 4));//0,4,8
        winningCombos.push(getThreeValues(2, 2));//2,4,5

        

        const playerOneWins = winningCombos.includes("XXX");
        const playerTwoWins = winningCombos.includes("OOO");
        const tie = (playersMoves === 9);
        


        if (playerOneWins) {
            console.log(`${players[0].name} wins!`);
            return { result: "win", winner: players[0].name };
        } else if (playerTwoWins){
            console.log(`${players[1].name} wins!`)
            return { result: "win", winner: players[1].name };
        } else if (tie) {
            console.log ("Its a tie!")
            return { result: "tie" }
        }

        return null;
    } 


    const playMove = (row, column) => {
        //Place a marker for the current player
        console.log(`Placing ${getActivePlayer().name}'s marker on row ${row}, column ${column}...`);

        gameBoard.placeMarker(row, column, getActivePlayer().marker);
        //increment after each move
        playersMoves++
        //handle winner logic here.
        const gameResult = checkWinnerOrTie();
        //then switch player and return updated state of board
        if (gameResult) {
            return gameResult;
        } else {
            switchPlayerTurn();
            printNewRound();
        }
        
        return null;

    }

    printNewRound();

    return { players, playMove, getActivePlayer, resetGame, getBoard: gameBoard.getBoard }
}



function screenController(playerOneName, playerTwoName) {
    const game = controlGame(playerOneName, playerTwoName);

    //for the modal
    const infoDialog = document.querySelector("#winner-info-dialog");
    const displayInfo = document.querySelector(".display-info");

    //playerOne
    const displayPlayerOne = document.querySelector(".display-player-one");
    const namePlayerOne = document.createTextNode(`${game.players[0].name} `);
    const scorePlayerOne = document.querySelector(".score-player-one");

    displayPlayerOne.insertBefore(namePlayerOne, scorePlayerOne);

    //playerTwo
    const displayPlayerTwo = document.querySelector(".display-player-two");
    const namePlayerTwo = document.createTextNode(`${game.players[1].name} `);
    const scorePlayerTwo = document.querySelector(".score-player-two");

    displayPlayerTwo.appendChild(namePlayerTwo);



    const gameContainer = document.createElement("div");
    gameContainer.classList.add("game-container");

    const boardHeader = document.createElement("div");
    boardHeader.classList.add("board-header-div");

    const gameTitle = document.createElement("h1");
    gameTitle.classList.add("board-h1");
    gameTitle.textContent = "tic-tac-toe";

    const boardContainer = document.createElement("div");
    boardContainer.classList.add("board-container");

    const newGameButton = document.createElement("button");
    newGameButton.classList.add("new-game-button");
    newGameButton.textContent = "New Game";

    const playerTurnDiv = document.createElement("h2");
    playerTurnDiv.classList.add("display-turn-h2");

    const boardDiv = document.createElement("div");
    boardDiv.classList.add("board");

    const scoresDiv = document.createElement("div");
    scoresDiv.classList.add("scores-div")

    //for player one

    const playerOneScoreDiv = document.createElement("div");
    playerOneScoreDiv.classList.add("player-one-container");

    const playerOneMarker = document.createElement("div");
    playerOneMarker.classList.add("player-one-marker");
    playerOneMarker.textContent = "X"

    const playerOneMoniker = document.createElement("div");
    playerOneMoniker.classList.add("player-one-name");
    playerOneMoniker.textContent = `${game.players[0].name}`

    const playerOneScore = document.createElement("div");
    playerOneScore.classList.add("player-one-score");

    //for player two

    const playerTwoScoreDiv = document.createElement("div");
    playerTwoScoreDiv.classList.add("player-two-container");

    const playerTwoMarker = document.createElement("div");
    playerTwoMarker.classList.add("player-two-marker");
    playerTwoMarker.textContent = "O"

    const playerTwoMoniker = document.createElement("div");
    playerTwoMoniker.classList.add("player-two-name");
    playerTwoMoniker.textContent = `${game.players[1].name}`

    const playerTwoScore = document.createElement("div");
    playerTwoScore.classList.add("player-two-score");

    document.body.appendChild(gameContainer);
    gameContainer.appendChild(boardHeader);
    boardHeader.appendChild(gameTitle);
    boardHeader.appendChild(newGameButton);
    gameContainer.appendChild(boardContainer);
    boardContainer.appendChild(playerTurnDiv);
    boardContainer.appendChild(boardDiv);
    gameContainer.appendChild(scoresDiv);
    scoresDiv.append(playerOneScoreDiv, playerTwoScoreDiv);
    playerOneScoreDiv.append(playerOneMarker, playerOneMoniker, playerOneScore);
    playerTwoScoreDiv.append(playerTwoMarker, playerTwoMoniker, playerTwoScore);
 
   

    // gameContainer.replaceChildren();

    // const boardDiv = document.querySelector(".board");

    let playerOneStreak = 0;
    let playerTwoStreak = 0;


    const nextRoundButton = document.querySelector(".next-round-button");
    nextRoundButton.disabled = true;

    const resetRoundButton = document.querySelector(".new-round-button");
    resetRoundButton.disabled = true;

    const updateDisplay = () => {
        //clear the board
        boardDiv.textContent = "";

        //get the newest version of board and
        //which player's turn it is to play

        const board = game.getBoard();
        const activePlayer = game.getActivePlayer();

        //Display player's turn

        playerTurnDiv.textContent = `${activePlayer.name}'s turn to play...`

        //render board squares

        board.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                //Create buttons
                const cellButton = document.createElement("button");
                cellButton.classList.add("cell");

                //give it a data attribute which is its index
                cellButton.dataset.row = rowIndex;
                cellButton.dataset.column = colIndex;
                cellButton.textContent = cell.getCellValue();
                boardDiv.appendChild(cellButton);


            })
        })

        playerOneScore.textContent = `${playerOneStreak}`;
        playerTwoScore.textContent = `${playerTwoStreak}`; 

    }

function handleBoardClicks (event) {
    const selectedRow = event.target.dataset.row;
    const selectedColumn = event.target.dataset.column;

    //make sure the click happens on the  
    if (!selectedRow && !selectedColumn) return;

    //play the move if the cell is not taken
    if (event.target.textContent === "") {
        const gameResult = game.playMove(selectedRow, selectedColumn);
        updateDisplay()

        //style cell by player marker
        const allCells = document.querySelectorAll(".cell");

        allCells.forEach(cell => {
            if (cell.textContent === "X") {
                cell.classList.add("x-cell");
            } else if (cell.textContent === "O") {
                cell.classList.add("o-cell");
            }
        })

        if (gameResult) {
            updateDisplay()
            nextRoundButton.disabled = false;
            infoDialog.showModal();

            if (gameResult.result === "win") {
                playerTurnDiv.textContent = `${gameResult.winner} wins!`;
                displayInfo.textContent = `${gameResult.winner} takes this round!`;
                    if (gameResult.winner === game.players[0].name) {
                        playerOneStreak++;
                        playerTwoStreak = 0;
                        if (playerOneStreak === 3) {
                            displayInfo.textContent = `Game over! ${game.players[0].name} wins!🏆 Try again?`;
                         }
                    } else if (gameResult.winner === game.players[1].name) {
                        playerTwoStreak++;
                        playerOneStreak = 0;
                        if (playerTwoStreak === 3) {
                            displayInfo.textContent = `Flawless victory! ${game.players[1].name} wins!🏆 Try again?`;
                         }
                    } 

                
                } 
            
            if (gameResult.result === "tie") {
                playerTurnDiv.textContent = "It's a tie!"
                displayInfo.textContent = "It's a tie!";
                playerOneStreak = 0;
                playerOneStreak = 0;              
            }
    
            if ((playerOneStreak === 3) || (playerTwoStreak === 3)) {
                nextRoundButton.disabled = true;
                resetRoundButton.disabled = false;
            }
        }
    }

    //for the board
    playerOneScore.textContent = `${playerOneStreak}`;
    playerTwoScore.textContent = `${playerTwoStreak}`; 

    //for the dialog
    scorePlayerOne.textContent = `${playerOneStreak}`;
    scorePlayerTwo.textContent = `${playerTwoStreak} `;
}

boardDiv.addEventListener("click", handleBoardClicks)

nextRoundButton.addEventListener("click", () => {
    game.resetGame();
    updateDisplay();
    nextRoundButton.disabled = true;
    infoDialog.close()
})

resetRoundButton.addEventListener("click", () => {
    game.resetGame();
    updateDisplay();
    playerOneStreak = 0;
    playerTwoStreak = 0;
    playerOneScore.textContent = `${playerOneStreak}`;
    playerTwoScore.textContent = `${playerTwoStreak}`;
    nextRoundButton.disabled = true;
    resetRoundButton.disabled = true;
    infoDialog.close()
});


const allNewGameButtons = document.querySelectorAll(".new-game-button");

allNewGameButtons.forEach(button => button.addEventListener("click", () => {
    gameContainer.remove()
    newGame();
    if (infoDialog.hasAttribute("open")) {
        infoDialog.close();
    }
}));





    //render the display when game starts
    updateDisplay();

}

function newGame() {
    // gameContainer.classList.remove("container");
    // gameContainer.classList.add("game-container-hidden");

    const startPageContainer = document.createElement("div");
    startPageContainer.classList.add("start-page-div");

    const gameTitle = document.createElement("h1");
    gameTitle.classList.add("form-h1");
    gameTitle.textContent = "tic-tac-toe";

    const formDiv = document.createElement("div");
    formDiv.classList.add("form-div");

    const formHint = document.createElement("span");
    formHint.classList.add("form-hint")
    formHint.textContent = "* Player names must be less than 11 chars."
    

    const form = document.createElement("form");
    form.classList.add("form");

    //player one
    const playerOneDiv = document.createElement("div");
    playerOneDiv.classList.add("player-one");

    const playerOneLabel = document.createElement("label");
    playerOneLabel.setAttribute("for", "player-one-name");
    playerOneLabel.textContent = "X"

    const playerOneName = document.createElement("input");
    playerOneName.setAttribute("type", "text");
    playerOneName.setAttribute("id", "player-one-name");
    playerOneName.setAttribute("placeholder", "Enter name");

    //player two
    const playerTwoDiv = document.createElement("div");
    playerTwoDiv.classList.add("player-two");

    const playerTwoLabel = document.createElement("label");
    playerTwoLabel.setAttribute("for", "player-two-name");
    playerTwoLabel.textContent = "O"

    const playerTwoName = document.createElement("input");
    playerTwoName.setAttribute("type", "text");
    playerTwoName.setAttribute("id", "player-two-name");
    playerTwoName.setAttribute("placeholder", "Enter name");

    const startGameButton = document.createElement("button");
    startGameButton.classList.add("start-button");
    startGameButton.setAttribute("type", "button");
    startGameButton.textContent = "Start Game";
    
    document.body.appendChild(startPageContainer);
    startPageContainer.appendChild(gameTitle);
    startPageContainer.appendChild(formDiv);
    startPageContainer.appendChild(formHint);
    formDiv.appendChild(form);

    //append player one
    form.appendChild(playerOneDiv);
    playerOneDiv.appendChild(playerOneLabel);
    playerOneDiv.appendChild(playerOneName);

    //append player two
    form.appendChild(playerTwoDiv);
    playerTwoDiv.appendChild(playerTwoLabel);
    playerTwoDiv.appendChild(playerTwoName);

    //append button 
    formDiv.appendChild(startGameButton);

    const formTextInputs = document.querySelectorAll("[type=text]");

    const checkInputFields = () => {
        const nameInputArray = Array.from(formTextInputs);

        //check if input field is empty
        const anyEmpty = nameInputArray.some(input => !input.value.trim());

       //check if input length is greater than 10
       const anyTooLong = nameInputArray.some(input => input.value.length > 10);
     
        //disable or enable button based on the check
        startGameButton.disabled = anyEmpty || anyTooLong;
    }
   
    formTextInputs.forEach((input) => {
        input.addEventListener("input", checkInputFields)
    });

    checkInputFields();

    startGameButton.addEventListener("click", () => {
        startPageContainer.remove()
        screenController(playerOneName.value, playerTwoName.value);
        
    });
 
}

newGame()

const game = controlGame("storm", "count");

//winning
game.playMove(0, 0);
game.playMove(0, 1);
game.playMove(1, 0);
game.playMove(1, 2);
game.playMove(2, 0);
// game.playMove(1, 1);


//draw
// game.playMove(0, 0);
// game.playMove(0, 1);
// game.playMove(1, 0);
// game.playMove(1, 2);
// game.playMove(0, 2);
// game.playMove(1, 1);
// game.playMove(2, 1);
// game.playMove(2, 0);
// game.playMove(2, 2);


