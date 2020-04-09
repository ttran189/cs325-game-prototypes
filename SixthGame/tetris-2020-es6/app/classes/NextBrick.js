import {CONSTANT} from "../data/CONSTANT";
import {Dot} from "./Dot";

export class NextBrick extends Phaser.GameObjects.Graphics {

    constructor(scene, options, board, shapeIndex) {
        super(scene, options);
        this.board = board;
        this.dotArray = [];
        this.rotationIndex = 0;
        this.row = 0;
        this.column = 0;
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

        this.shapeIndex = shapeIndex;
        this.shape = CONSTANT.gameBoard.BRICK_SHAPES[this.shapeIndex];
    }

    getColor() {
        switch (this.shapeIndex) {
            case 0:
                return 0xCF3616;
            case 1:
                return 0xBDC007;
            case 2:
                return 0x169907;
            case 3:
                return 0x07996F;
            case 4:
                return 0x076F99;
            case 5:
                return 0x410799;
            case 6:
                return 0x99078A;
        }
    }

    setCoordinate(row) {
        this.row = row;
        this.column = CONSTANT.gameBoard.OFFSET_NEXT_COL;
        this.draw();
    }

    clearSet() {
        while (this.dotArray.length !== 0) {
            let d = this.dotArray.pop();
            d.clear();
        }
    }

    draw() {
        this.clearSet();
        this.grid = this.shape.grids[this.rotationIndex];
        for (let row = 0; row < this.grid.length; row++) {
            for (let column = 0; column < this.grid[0].length; column++) {
                if (this.grid[row][column] === "x") {
                    let x = this.row + row;
                    let y = this.column + column;
                    this.dotArray.push(new Dot(this.scene, {}, x, y, this.board, this.getColor()));
                }
            }
        }
    }

    /**
     * #####################################
     * Action
     * #####################################
     */

}