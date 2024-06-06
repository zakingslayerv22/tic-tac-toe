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

    const addMarker = (row, column, player) => {
        if (board[row][column].getCellValue() === 0) {
            //do something here
            console.log("Sub Zero!")
            board[row][column].addPlayerMarker(player);
        } else {
            return;
        }
    }

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getCellValue()));
        console.log(boardWithCellValues)
    }

    return { getBoard, addMarker, printBoard }

}

function createCell() {
    //default cell value
    let cellValue = 0;

    //player would be able to change the value of the cell
    const addPlayerMarker = (player) => {
        cellValue = player;
    }

    //get the value of the cell
    const getCellValue = () => cellValue;

    return { addPlayerMarker, getCellValue };
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

}

const gameBoard = createGameBoard()
gameBoard.printBoard()

gameBoard.addMarker(0, 1);
// gameBoard.addMarker(2, 1);
// gameBoard.addMarker(2, 1);