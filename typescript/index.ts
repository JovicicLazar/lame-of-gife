// functions
function createBoard(): Board {
    const board: Board = [];
    for (let r = 0; r < BOARD_ROWS; ++r) {
        board.push(new Array<Cell>(BOARD_COLS).fill(0));
    }
    return board;
}

function computeNextBoard(automaton: Automaton, current: Board, next: Board) {
    const DEAD  = 0;
    const ALIVE = 1;
    const nbrs  = new Array(automaton.length).fill(0);
    for (let r = 0 ; r < BOARD_ROWS; ++r) {
        for (let c = 0; c < BOARD_COLS; ++c) {
            countNbrs(current, nbrs, r, c);
            const state = automaton[current[r][c]];
            next[r][c] = state.transitions[nbrs.join("")];
            if (next[r][c] === undefined) next[r][c] = state["default"];
        }
    }
}

function mod(a: number, b: number): number {
    return (a%b + b)%b
}

function countNbrs(board: Board, nbrs: number[], r0: number, c0: number) {
    nbrs.fill(0);
    for (let dr = -1; dr <= 1; ++dr) {
        for (let dc = -1; dc <= 1; ++dc) {
            if (dr != 0 || dc != 0) {
                const r = mod(r0 + dr, BOARD_ROWS);
                const c = mod(c0 + dc, BOARD_COLS);
                nbrs[board[r][c]]++;
            }
        }
    }
}

function render(automaton: Automaton, contx: CanvasRenderingContext2D, board: Board) {
    const CELL_WIDTH = contx.canvas.width/BOARD_COLS;
    const CELL_HEIGHT = contx.canvas.height/BOARD_ROWS;
    for (let r = 0 ; r < BOARD_ROWS; ++r) {
        for (let c = 0; c < BOARD_COLS; ++c) {
            const x = c*CELL_WIDTH;
            const y = r*CELL_HEIGHT;
            contx.fillStyle = automaton[board[r][c]].color;
            contx.fillRect(x, y, CELL_WIDTH, CELL_HEIGHT);
        } 
    }
}

// app data
const BOARD_ROWS                        = 32;
const BOARD_COLS                        = BOARD_ROWS; 
type Cell                               = number;
type Board                              = Cell[][];

// cellular automatas
interface State {
    "color": string;
    "default": number;
    "transitions": {
        [key: string]: number;
    }
}

type Automaton = State[];

// seeds automaton 
// 2 states
const Seeds: Automaton = [
    {
        "transitions": {
            "62": 1,
        },
        "default": 0,
        "color": "#202020",
    },
    {
        "transitions": {},
        "default": 0,
        "color": "#FF5050",
    },
];

// game of life automaton
// 2 states
const GoL: Automaton = [
    {
        "transitions": {
            "53": 1,
        },
        "default": 0,
        "color": "#202020",
    },
    {
        "transitions": {
            "62": 1,
            "53": 1,
        },
        "default": 0,
        "color": "#FF5050",
    },
];

// wireworld automaton
//4 states
const Wireworld: Automaton = [
    // 0 - dead
    {
        "transitions": {
        },
        "default": 0,
        "color": "black",
    },
    // 1 - conductor
    {
        "transitions": {
            "0080": 2,
            "0017": 2,
            "0116": 2,
            "0215": 2,
            "0314": 2,
            "0413": 2,
            "0512": 2,
            "0611": 2,
            "0710": 2,
            "1016": 2,
            "1115": 2,
            "1214": 2,
            "1313": 2,
            "1412": 2,
            "1511": 2,
            "1610": 2,
            "2015": 2,
            "2114": 2,
            "2213": 2,
            "2312": 2,
            "2411": 2,
            "2510": 2,
            "3014": 2,
            "3113": 2,
            "3212": 2,
            "3311": 2,
            "3410": 2,
            "4013": 2,
            "4112": 2,
            "4211": 2,
            "4310": 2,
            "5012": 2,
            "5111": 2,
            "5210": 2,
            "6011": 2,
            "6110": 2,
            "7010": 2,
            "0026": 2,
            "0125": 2,
            "0224": 2,
            "0323": 2,
            "0422": 2,
            "0521": 2,
            "0620": 2,
            "1025": 2,
            "1124": 2,
            "1223": 2,
            "1322": 2,
            "1421": 2,
            "1520": 2,
            "2024": 2,
            "2123": 2,
            "2222": 2,
            "2321": 2,
            "2420": 2,
            "3023": 2,
            "3122": 2,
            "3221": 2,
            "3320": 2,
            "4022": 2,
            "4121": 2,
            "4220": 2,
            "5021": 2,
            "5120": 2,
            "6020": 2,
            "0035": 2,
            "0134": 2,
            "0233": 2,
            "0332": 2,
            "0431": 2,
            "0530": 2,
            "1034": 2,
            "1133": 2,
            "1232": 2,
            "1331": 2,
            "1430": 2,
            "2033": 2,
            "2132": 2,
            "2231": 2,
            "2330": 2,
            "3032": 2,
            "3131": 2,
            "3230": 2,
            "4031": 2,
            "4130": 2,
            "5030": 2,
            "0044": 2,
            "0143": 2,
            "0242": 2,
            "0341": 2,
            "0440": 2,
            "1043": 2,
            "1142": 2,
            "1241": 2,
            "1340": 2,
            "2042": 2,
            "2141": 2,
            "2240": 2,
            "3041": 2,
            "3140": 2,
            "4040": 2,
            "0053": 2,
            "0152": 2,
            "0251": 2,
            "0350": 2,
            "1052": 2,
            "1151": 2,
            "1250": 2,
            "2051": 2,
            "2150": 2,
            "3050": 2,
            "0062": 2,
            "0161": 2,
            "0260": 2,
            "1061": 2,
            "1160": 2,
            "2060": 2,
            "0071": 2,
            "0170": 2,
            "1070": 2,

        },
        "default": 1,
        "color": "red",
    },
    // 2 - electron head
    {
        "transitions": {},
        "default": 3,
        "color": "green",
    },
    // 3 - electron tail
    {
        "transitions": {},
        "default": 1,
        "color": "blue",
    }
];

// brians brain automaton
// 3 states
const BriansBrain: Automaton = [
    // 0 - dead
    {
        "transitions": {
            "026": 1,
            "125": 1,
            "224": 1,
            "323": 1,
            "422": 1,
            "521": 1,
            "620": 1,
        },
        "default": 0,
        "color": "#202020",
    },
    // 1 - alive
    {
        "transitions": {},
        "default": 2,
        "color": "#FF5050",
    },
    // 2 - dying
    {
        "transitions": {},
        "default": 0,
        "color": "#50FF50",
    }
];

const currentAutomaton = Seeds;

window.onload = () => {
    const canvasId = "app";
    const app = document.getElementById(canvasId) as HTMLCanvasElement;
    if (app === null) {
        throw new Error(`Could not find canvas ${canvasId}`);
    }

    app.width = 800;
    app.height = 800;
    const contx = app.getContext("2d");
    if (contx === null) {
        throw new Error(`Could not initialize 2d context`);
    }

    const nextId = "next";
    const next = document.getElementById(nextId) as HTMLButtonElement;
    if (next == null) {
        throw new Error(`Could not find button ${nextId}`);
    }

    let currentAutomaton = Wireworld;
    let currentBoard: Board = createBoard();
    let nextBoard: Board = createBoard();

    app.addEventListener("click", (e) => {
        const CELL_WIDTH = app.width/BOARD_COLS;
        const CELL_HEIGHT = app.height/BOARD_ROWS;

        const col = Math.floor(e.offsetX/CELL_WIDTH);
        const row = Math.floor(e.offsetY/CELL_HEIGHT);

        const state = document.getElementsByName("state");

        for (let i = 0; i < state.length; ++i) {
            if ((state[i] as HTMLInputElement).checked) {
                currentBoard[row][col] = i;
                render(currentAutomaton, contx, currentBoard);

                return;
            }
        }
    });

    next.addEventListener("click", () => {
        computeNextBoard(currentAutomaton, currentBoard, nextBoard);
        [currentBoard, nextBoard] = [nextBoard, currentBoard];
        render(currentAutomaton, contx, currentBoard);
    });

    render(currentAutomaton, contx, currentBoard);
};


