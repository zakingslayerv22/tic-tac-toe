//this function represents the state of the board
//each square would hold a cell() (defined later)

const createGameBoard = (function() {
    const rows = 3;
    const columns = 3;
    const board = [];

    //create 2D array that would represent the board's state

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(0);
        }
    }


    const getBoard = () => board;

    return { getBoard }

})();




console.log(createGameBoard.getBoard());