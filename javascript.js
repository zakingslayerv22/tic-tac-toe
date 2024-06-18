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


    const getBoard = () => board;

    const placeMarker = (row, column, player) => {
        if (board[row][column].getCellValue() === 0) {
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


    return { getBoard, placeMarker, printBoard, returnBoard }

}

function createCell() {
    //default cell value
    let cellValue = 0;

    //player would be able to change the value of the cell
    const placePlayerMarker = (player) => {
        cellValue = player;
    }

    //get the value of the cell
    const getCellValue = () => cellValue;

    return { placePlayerMarker, getCellValue };
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
            marker: "x"
        },

        {
            name: playerTwoName,
            marker: "o"
        }

    ];

    let activePlayer = players[0];

    //toggle active player
    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        gameBoard.printBoard();
        console.log(`Its ${getActivePlayer().name}'s turn to play!`)
    }

    const getThreeValues = (start, offset) => {
        let result = ""

        for (let i = start; i < start + offset * 3; i += offset) {
            result += gameBoard.returnBoard()[Math.floor(i / 3)][i % 3];
        }
        return result;
    }

   
   
    let playersMoves = 0

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

        

        const playerOneWins = winningCombos.includes("xxx");
        const playerTwoWins = winningCombos.includes("ooo");
        const tie = (playersMoves === 9)
        
        
        if (playerOneWins) {
            console.log(`${players[0].name} wins!`);
        } else if (playerTwoWins){
            console.log(`${players[1].name} wins!`)
        } else if (tie) {
            console.log ("Its a tie!")
        }
 
        return playerOneWins || playerTwoWins || tie;
    } 
    



    const playMove = (row, column) => {
        //Place a marker for the current player
        console.log(`Placing ${getActivePlayer().name}'s marker on row ${row}, column ${column}...`);

        gameBoard.placeMarker(row, column, getActivePlayer().marker);
        //increment after each move
        playersMoves++
        //handle winner logic here.
         const gameOver = checkWinnerOrTie();
        //then switch player and return updated state of board
        switchPlayerTurn();
        printNewRound();
    }

    printNewRound();

    return { playMove, getActivePlayer, getBoard: gameBoard.getBoard }
}

function screenController() {
    const game = controlGame();
    const playerTurnDiv = document.querySelector(".display-turn");
    const boardDiv = document.querySelector(".board");


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

    }

function handleBoardClicks (event) {
    const selectedRow = event.target.dataset.row;
    const selectedColumn = event.target.dataset.column;

    //make sure the click happens on the  
    if (!selectedRow && !selectedColumn) return;



}

    //render the display when game starts
    updateDisplay();

}

screenController();

const game = controlGame();

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


