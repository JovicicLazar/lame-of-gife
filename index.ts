const BOARD_ROWS  = 32;
const BOARD_COLS  = BOARD_ROWS; 
const canvasID    = "app";
const app         = document.getElementById(canvasID) as HTMLCanvasElement;

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

app.addEventListener("click", (e) => {
    console.log(`client: ${[e.clientX, e.clientY]}`)
})
contx.fillStyle = "#202020";
contx.fillRect(0, 0, app.width, app.height);

contx.fillStyle = "red"
for (let i = 0 ; i < BOARD_ROWS; ++i) {
    const x = i*CELL_WIDTH;
    const y = i*CELL_HEIGHT;
    contx.fillRect(x, y, CELL_WIDTH, CELL_HEIGHT);
}