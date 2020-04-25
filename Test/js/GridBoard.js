import {CONSTANT} from "../data/CONSTANT.js";

export class GridBoard extends Phaser.GameObjects.Graphics {

    constructor(scene, options) {
        super(scene, options);
        this.setDefaultStyles({
            lineStyle: {
                width: 1,
                color: 0xffffff,
                alpha: 0.2
            },
            fillStyle: {
                color: 0x6C6C6C,
                alpha: 1
            }
        });
        this.boardData = CONSTANT.gameBoard.BOARD_DATA;
        this.draw();
    }

    toPositionX(column) {
        return (column + CONSTANT.gameBoard.OFFSET_COL) * CONSTANT.gameBoard.CELL_SIZE;
    }

    toPositionY(row) {
        return (row + CONSTANT.gameBoard.OFFSET_ROW) * CONSTANT.gameBoard.CELL_SIZE;
    }

    draw() {
        this.clear();
        for (let row = 0; row < this.boardData.length; row++) {
            for (let column = 0; column < this.boardData[0].length; column++) {
                let x = this.toPositionX(column);
                let y = this.toPositionY(row);
                let rect = new Phaser.Geom.Rectangle(x, y, CONSTANT.gameBoard.CELL_SIZE, CONSTANT.gameBoard.CELL_SIZE);
                this.depth = 10;
                if(x < 20) {
                    this.fillStyle(0x6C6C6C);
                    this.fillRectShape(rect);
                    console.log(x);
                } else {
                    this.strokeRectShape(rect);
                }
            }
        }
    }
}