const BOARD_ROWS                        = 32;
const BOARD_COLS                        = BOARD_ROWS; 
const canvasID                          = "app";
const nextID                            = "next";
const app                               = document.getElementById(canvasID) as HTMLCanvasElement;
type State                              = number;
type Board                              = State[][];
const stateColors                       = ["#202020", "#FF5050", "blue", "white"];
const board: Board                      = [];

function createBoard(): Board {
    const board: Board = [];
    for (let r = 0; r < BOARD_ROWS; ++r) {
        board.push(new Array<State>(BOARD_COLS).fill(0));
    }
    return board;
}


if (app === null) {
    throw new Error(`Could not find canvas ${canvasID}`);
}

app.width         = 800;
app.height        = 800;
const contx       = app.getContext("2d");
const CELL_WIDTH  = app.width / BOARD_COLS;
const CELL_HEIGHT = app.height / BOARD_ROWS
const next        = document.getElementById(nextID) as HTMLButtonElement;

if (contx === null) {
    throw new Error(`Could not initialize 2d context`);
}

if (next == null) {
    throw new Error(`Could not get the button &{nextID}`);
}
let currentBoard: Board = createBoard();
let nextBoard: Board = createBoard();

function countNbrs(board: Board, nbrs: number[], r0: number, c0: number) {
    nbrs.fill(0);
    for (let dr = -1; dr <= 1; ++dr) {
        for (let dc = -1; dc <= 1; ++dc) {
            if (dr != 0 || dc != 0) {
                const r = r0 + dr;
                const c = c0 + dc;

                if (0 <= r && r < BOARD_ROWS) {
                    if (0 <= c && c < BOARD_COLS) {
                        nbrs[board[r][c]]++;
                    }
                }
            }
        }
    }
}

const GoL = [
    [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ],
    [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ], 
];

function computeNextBoardGoL(states: number, current: Board, next: Board) {
    const DEAD  = 0;
    const ALIVE = 1;
    const nbrs  = new Array(states).fill(0);
    for (let r = 0 ; r < BOARD_ROWS; ++r) {
        for (let c = 0; c < BOARD_COLS; ++c) {
            countNbrs(current, nbrs, r, c);
            next[r][c] = GoL[current[r][c]][nbrs[DEAD]][nbrs[ALIVE]];
        }
    }
}

function render(contx: CanvasRenderingContext2D, board: Board) {
    contx.fillStyle = "#202020";
    contx.fillRect(0, 0, app.width, app.height);
    contx.fillStyle = "#FF5050";
    for (let r = 0 ; r < BOARD_ROWS; ++r) {
        for (let c = 0; c < BOARD_COLS; ++c) {
            const x = c*CELL_WIDTH;
            const y = r*CELL_HEIGHT;
            contx.fillStyle = stateColors[board[r][c]];
            contx.fillRect(x, y, CELL_WIDTH, CELL_HEIGHT);
        } 
    }
}

app.addEventListener("click", (e) => {
    const state            = document.getElementsByName("state");
    const col              = Math.floor(e.offsetX / CELL_WIDTH);
    const row              = Math.floor(e.offsetY / CELL_HEIGHT);

    for (let i = 0; i < state.length; ++i) {
        if ((state[i] as HTMLInputElement).checked) {
            currentBoard[row][col] = i;
            render(contx, currentBoard);
        }
    }

    return;
})

next.addEventListener("click", (e) => {
    computeNextBoardGoL(2, currentBoard, nextBoard);
    [currentBoard, nextBoard] = [nextBoard, currentBoard]; 
    render(contx, currentBoard);
});

render(contx, currentBoard);
