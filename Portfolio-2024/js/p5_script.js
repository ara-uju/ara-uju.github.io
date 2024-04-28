
let rows;
let columns;
let matrix = [];

let canvasW;
let canvasH;

let size = 90;

let posX, posY;

function setup() {
    canvasW = window.innerWidth;
    canvasH = window.innerHeight;

    rows = Math.round(canvasW / size);
    columns = Math.round(canvasH / size);
    console.log("ROWS AND COLUMNS: " + rows + "  " + columns);

    var canvas = createCanvas(canvasW, canvasH);
    canvas.parent("canvas-container");

    canvas.mouseMoved(cellChecker);

    canvas.mousePressed(cellChecker);

    for (let i = 0; i < rows; i++) {
        matrix[i] = [];
        for (let j = 0; j < columns; j++) {
            console.log(i * size + "  " + j * size);
            matrix[i][j] = new Cell(i * canvasW / rows, j * canvasH / columns);
        }
    }
    rectMode(CORNER);
    noStroke();
}

function draw() {
    background(20);
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            matrix[i][j].drawCell();
        }
    }

}

function cellChecker() {
    posX = Math.trunc(mouseX * rows / canvasW);
    posY = Math.trunc(mouseY * columns / canvasH);

    //matrix[posX][posY].setActive();
    circleNeighbor(posX, posY, 2);
}

let colorMap = ["#1e1aef", "#1a5eef", "#1ad3ef", "#1aef23", "#a9ef1a", "#efc11a", "#ef5f1a", "#ef1a88"];
class Cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = canvasW / rows;
        this.height = canvasH / columns;
        this.color = color(0, 0);

        this.drawCell();
    }

    drawCell() {
        fill(this.color);
        rect(this.x, this.y, this.width, this.height);
        this.hovered = true;
    }

    setActive() {
        let colorIndex = 1;
        this.color = colorMap[colorIndex];
        let interval = setInterval(()=>{
            this.color = colorMap[colorIndex];
            colorIndex++;
            if(colorIndex >= colorMap.length) {
                clearInterval(interval);
                this.color = color(0, 0);
            }
        }, 150);
    }
}

function circleNeighbor(row, col, limit) {
    let level = limit;
    if (level === 0) {
        return;
    }

    matrix[row][col].setActive();

    const directions = [[-1, 0], [0, -1], [1, 0], [0, 1], [-1, 1], [-1, -1], [1, -1], [1, 1]];

    for (let [dx, dy] of directions) {
        let newRow = row + dx;
        let newCol = col + dy;

        if (newRow >= 0 && newRow < matrix.length && newCol >= 0 && newCol < matrix[0].length) {
            setTimeout(() => {
                matrix[row][col].setActive();
                matrix[newRow][newCol].setActive();
            }, 50);

            //circleNeighbor(newRow, newCol, level);
        }
    }
}