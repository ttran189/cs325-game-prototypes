import {CONSTANT} from "../data/CONSTANT.js";

export class Dot extends Phaser.GameObjects.Graphics {

    constructor(scene, options, row, column, board, color) {
        super(scene, options);
        this.board = board;
        this.color = color;
        this.setCoordinate(row, column);
        this.draw();
    }

    setCoordinate(row, column) {
        this.row = row;
        this.column = column;
        this.draw();
    }

    showData() {
        console.log("row: " + this.row + " col: " + this.column);
    }

    toPositionX(column) {
        return (column + CONSTANT.gameBoard.OFFSET_COL) * CONSTANT.gameBoard.CELL_SIZE;
    }

    toPositionY(row) {
        return (row + CONSTANT.gameBoard.OFFSET_ROW) * CONSTANT.gameBoard.CELL_SIZE;
    }

    draw() {
        this.clear();
        let x = this.toPositionX(this.column);
        let y = this.toPositionY(this.row);
        let rect = new Phaser.Geom.Rectangle(x, y, CONSTANT.gameBoard.CELL_SIZE, CONSTANT.gameBoard.CELL_SIZE);
        this.fillStyle(this.color);
        this.fillRectShape(rect);
        this.scene.add.existing(this);
    }

    /**
     * #####################################
     * Action
     * #####################################
     */

    /**
     * Left
     * ---------------------
     */
    didHitLeft() {
        return this.column === 0;
    }

    canMoveLeft() {
        if (this.didHitLeft())
            return false;

        return this.board.isEmpty(this.row, this.column - 1);
    }

    moveLeft() {
        this.column--;
        this.draw();
    }

    /**
     * Right
     * ---------------------
     */
    didHitRight() {
        return this.column === CONSTANT.gameBoard.NUM_COLS - 1;
    }

    canMoveRight() {
        if (this.didHitRight())
            return false;

        return this.board.isEmpty(this.row, this.column + 1);
    }

    moveRight() {
        this.column++;
        this.draw();
    }

    /**
     * Fall
     * ---------------------
     */
    didHitBottom() {
        return this.row === CONSTANT.gameBoard.NUM_ROWS - 1;
    }

    canFall() {
        if (this.didHitBottom())
            return false;

        return this.board.isEmpty(this.row + 1, this.column);
    }

    fall() {
        this.row++;
        this.draw();
    }
}