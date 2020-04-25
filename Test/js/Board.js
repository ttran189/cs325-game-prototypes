import {CONSTANT} from "../data/CONSTANT.js";

export class Board extends Phaser.GameObjects.Graphics {

    constructor(scene, options) {
        super(scene, options);
        this.setDefaultStyles({
            lineStyle: {
                width: 1,
                color: 0xffffff,
                alpha: 0.3
            },
            fillStyle: {
                color: 0xcccccc,
                alpha: 1
            }
        });
        this.boardData = CONSTANT.gameBoard.BOARD_DATA;
        this.draw();
    }

    fix(brick) {
        for (let i = 0; i < brick.dotArray.length; i++) {
            let dot = brick.dotArray[i];
            let y = dot.column;
            let x = dot.row;
            this.mark(x, y, dot.color);
        }
        //this.showData();
    }

    reset() {
        this.boardData = CONSTANT.gameBoard.BOARD_DATA;
    }

    mark(x, y, color) {
        this.boardData[x][y] = color;
    }

    showData() {
        console.table(this.boardData);
    }

    toPositionX(column) {
        return (column + CONSTANT.gameBoard.OFFSET_COL) * CONSTANT.gameBoard.CELL_SIZE;
    }

    toPositionY(row) {
        return (row + CONSTANT.gameBoard.OFFSET_ROW) * CONSTANT.gameBoard.CELL_SIZE;
    }

    isEmpty(x, y) {
        return this.boardData[x][y] === null;
    }

    checkToClear(gameData) {
        let completedRows = [];
        for (let i = CONSTANT.gameBoard.NUM_ROWS - 1; i >= 6; i--) {
            let counter = 0;
            for (let j = 0; j < CONSTANT.gameBoard.NUM_COLS; j++) {
                if (this.boardData[i][j] !== null)
                    counter++;
            }
            if (counter === CONSTANT.gameBoard.NUM_COLS) {
                completedRows.push(i);
            }
        }
        let finishedCnt = completedRows.length;
        while (completedRows.length !== 0) {
            let row = completedRows.pop();
            for (let j = 0; j < CONSTANT.gameBoard.NUM_COLS; j++) {
                this.boardData[row][j] = null;
            }
            this.bringDown(row);
        }
        return finishedCnt;
    }

    bringDown(fromRow) {
        for (let i = fromRow; i >= 6; i--) {
            for (let j = 0; j < CONSTANT.gameBoard.NUM_COLS; j++) {
                this.boardData[i][j] = this.boardData[i - 1][j];
            }
        }
    }

    draw() {
        this.clear();
        for (let row = 0; row < this.boardData.length; row++) {
            for (let column = 0; column < this.boardData[0].length; column++) {
                let x = this.toPositionX(column);
                let y = this.toPositionY(row);
                let rect = new Phaser.Geom.Rectangle(x, y, CONSTANT.gameBoard.CELL_SIZE, CONSTANT.gameBoard.CELL_SIZE);
                if (this.boardData[row][column] === null) {
                    //this.strokeRectShape(rect);
                } else {
                    //this.lineStyle(1, 0x000000, 0);
                    this.fillStyle(this.boardData[row][column]);
                    this.fillRectShape(rect);
                }
            }
        }
    }
}