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

    const addMarker = (row, column) => {
        if (board[row][column].getCellValue() === 0) {
            //do something here
            console.log("Sub Zero!")
            //board[row][column] = "x";
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

    //get the value of the cell
    const getCellValue = () => cellValue;

    return { getCellValue }
}

const gameBoard = createGameBoard()
gameBoard.printBoard()

gameBoard.addMarker(0, 1);
// gameBoard.addMarker(2, 1);
// gameBoard.addMarker(2, 1);