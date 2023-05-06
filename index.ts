const BOARD_ROWS                        = 32;
const BOARD_COLS                        = BOARD_ROWS; 
const canvasID                          = "app";
const app                               = document.getElementById(canvasID) as HTMLCanvasElement;
type State                              = 'alive' | 'dead';
const board: Array<Array<State>>        = [];

for (let r = 0; r < BOARD_ROWS; ++r) {
    board.push(new Array(BOARD_COLS).fill('dead'));
}

console.log(board);
if (app === null) {
    throw new Error(`Could not find canvas ${canvasID}`);
}

app.width         = 800;
app.height        = 800;
const contx       = app.getContext("2d");
const CELL_WIDTH  = app.width / BOARD_COLS;
const CELL_HEIGHT = app.height / BOARD_ROWS

if (contx === null) {
    throw new Error(`Could not initialize 2d context`);
}

function render() {
    if (contx !== null) { 
        contx.fillStyle = "#202020";
        contx.fillRect(0, 0, app.width, app.height);
        contx.fillStyle = "red"
        for (let r = 0 ; r < BOARD_ROWS; ++r) {
            for (let c = 0; c < BOARD_COLS; ++c) {
                if (board[r][c] === 'alive') {
                    const x = c*CELL_WIDTH;
                    const y = r*CELL_HEIGHT;
                    contx.fillRect(x, y, CELL_WIDTH, CELL_HEIGHT);
                }
            } 
        }
    }
}

app.addEventListener("click", (e) => {
    const col     = Math.floor(e.offsetX / CELL_WIDTH);
    const row     = Math.floor(e.offsetY / CELL_HEIGHT);
    board[row][col] = 'alive';
    render();
    
})

render();