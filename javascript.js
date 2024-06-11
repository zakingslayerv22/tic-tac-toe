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


    return { getBoard, placeMarker, printBoard }

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
            marker: 1
        },

        {
            name: playerTwoName,
            marker: 2
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

    const playRound = (row, column) => {
        //Place a marker for the current player
        console.log(`Placing ${getActivePlayer().name}'s marker on row ${row}, column ${column}...`);

        gameBoard.placeMarker(row, column, getActivePlayer().marker);

        //handle winner logic here.

        //then switch player and return updated state of board
        switchPlayerTurn();
        printNewRound();

    }

    printNewRound();

    return { playRound, getActivePlayer }
}

const game = controlGame();

game.playRound(2, 2);
game.playRound(0, 0);