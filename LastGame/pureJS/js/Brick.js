import {CONSTANT} from "../data/CONSTANT.js";
import {Dot} from "./Dot.js";

export class Brick extends Phaser.GameObjects.Graphics {

    constructor(scene, options, board, shapeIndex) {
        super(scene, options);
        this.board = board;
        this.dotArray = [];
        this.rotationIndex = 0;
        this.playedSound = false;
        this.setCoordinate();
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

        // color here

        this.draw();
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

    setCoordinate() {
        this.row = 0;
        this.column = CONSTANT.gameBoard.OFFSET_MIDDLE;
    }

    showData() {
        console.log("row: " + this.row + " col: " + this.column);
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

    /**
     * Rotation
     * ---------------------
     */

    canRotate(tmpRotateID) {
        if (tmpRotateID === -1)
            tmpRotateID = 3;
        else if (tmpRotateID === 4)
            tmpRotateID = 0;

        let tmpGrid = this.shape.grids[tmpRotateID];
        for (let row = 0; row < tmpGrid.length; row++) {
            for (let column = 0; column < tmpGrid[0].length; column++) {
                if (tmpGrid[row][column] === "x") {
                    let y = this.row + row;
                    let x = this.column + column;

                    if (x < 0 || x > CONSTANT.gameBoard.NUM_COLS - 1) {
                        console.log("Cannot rotate > invalid x: " + x);
                        //console.table(tmpGrid);
                        return false;
                    }


                    if (y > CONSTANT.gameBoard.NUM_ROWS - 1) {
                        console.log("Cannot rotate > invalid y: " + y);
                        //console.table(tmpGrid);
                        return false;
                    }

                    if (!this.board.isEmpty(y, x)) {
                        console.log("Cannot rotate > occupied x: " + x + " y: " + y);
                        //console.table(tmpGrid);
                        return false;
                    }
                }
            }
        }

        return true;
    }

    changeUp() {
        if (this.canRotate(this.rotationIndex - 1)) {
            this.scene.sound.play("sound-move");
            this.rotationIndex--;
            if (this.rotationIndex === -1)
                this.rotationIndex = 3;

            this.draw();
        }
    }

    changeDown() {
        if (this.canRotate(this.rotationIndex + 1)) {
            this.scene.sound.play("sound-move");
            this.rotationIndex++;
            if (this.rotationIndex === 4)
                this.rotationIndex = 0;

            this.draw();
        }
    }

    /**
     * Left
     * ---------------------
     */
    canMoveLeft() {
        let flag = true;
        for (let i = 0; i < this.dotArray.length; i++) {
            if (!this.dotArray[i].canMoveLeft()) {
                flag = false;
                break;
            }
        }
        return flag;
    }

    moveLeft() {
        if (this.canMoveLeft()) {
            this.scene.sound.play("sound-move");
            for (let i = 0; i < this.dotArray.length; i++) {
                this.dotArray[i].moveLeft();
            }
            this.column--;
        }
    }

    /**
     * Right
     * ---------------------
     */
    canMoveRight() {
        let flag = true;
        for (let i = 0; i < this.dotArray.length; i++) {
            if (!this.dotArray[i].canMoveRight()) {
                flag = false;
                break;
            }
        }
        return flag;
    }

    moveRight() {
        if (this.canMoveRight()) {
            this.scene.sound.play("sound-move");
            for (let i = 0; i < this.dotArray.length; i++) {
                this.dotArray[i].moveRight();
            }
            this.column++;
        }
    }

    /**
     * Fall
     * ---------------------
     */
    canFall() {
        let flag = true;
        for (let i = 0; i < this.dotArray.length; i++) {
            if (!this.dotArray[i].canFall()) {
                flag = false;
                break;
            }
        }
        return flag;
    }

    fall() {
        if (this.canFall()) {
            for (let i = 0; i < this.dotArray.length; i++) {
                this.dotArray[i].fall();
            }
            this.row++;
            if (this.scene.keyDown.isDown) {
                this.scene.sound.play('sound-swap');
                if (this.scene.item.alpha !== 1)
                    this.scene.gameData.sPoint++;
            }
            return true;
        }
        return false;
    }

    goDown() {
        let cnt = 0;
        while (this.canFall()) {
            this.fall();
            cnt++;
        }
        this.scene.gameData.sPoint += CONSTANT.gameBoard.SCORE_PER_GO_DOWN * cnt;
    }
}