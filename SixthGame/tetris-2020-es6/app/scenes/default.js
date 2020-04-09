import {Board} from "../classes/Board";
import {Brick} from "../classes/Brick";
import {GridBoard} from "../classes/GridBoard";
import {CONSTANT} from "../data/CONSTANT";
import {NextBrick} from "../classes/NextBrick";

export default class DefaultScene extends Phaser.Scene {

    constructor() {
        super('default');
    }

    init(data) {
        console.debug('init', this.scene.key, data, this);
        this.events.on('shutdown', this.shutdown, this);
    }

    create() {
        const picBg = this.add.image(500, 300, 'bg2');

        this.fallTimer = this.time.addEvent({
            delay: 1000,
            callback: this.fall,
            callbackScope: this,
            loop: true
        });
        this.board = new Board(this, {});
        this.gridBoard = new GridBoard(this, {});
        this.add.existing(this.board);
        this.add.existing(this.gridBoard);

        this.brickQueue = [];
        this.brickQueueObj = [];
        this.addBrickIDsToQueue();
        this.brick = new Brick(this, {}, this.board, this.getBrickIDFromQueue());

        this.bgMusic = this.sound.add('sound-bgMusic');
        this.bgMusic.play({
            volume: 0.5,
            loop: true
        })

        this.gameData = {
            sPoint: 0,
            score: 0,
            level: 1,
            destroyed: 0,
            player: "",
            time: null,
            nexShapeIndices: [],
            nextSpecialIndices: []
        };

        let styleConfig = {
            font: "20px 'Verdana'", fill: "#ff0000", align: "center"
        };
        this.data_score = this.add.text(640, 320, "0", styleConfig);
        this.data_sPoint = this.add.text(240, 320, "0", styleConfig);
        this.data_time = this.add.text(640, 400, "0", styleConfig);
        this.data_level = this.add.text(240, 400, "0", styleConfig);
        this.data_player = this.add.text(640, 480, "0", styleConfig);
        this.data_destroyed = this.add.text(240, 480, "0", styleConfig);


        this.keyLeft = this.input.keyboard.addKey('LEFT');
        this.keyLeft.on('down', () => this.brick.moveLeft());

        this.keyRight = this.input.keyboard.addKey('RIGHT');
        this.keyRight.on('down', () => this.brick.moveRight());

        this.keyA = this.input.keyboard.addKey('A');
        this.keyA.on('down', () => this.brick.changeUp());

        this.keyUP = this.input.keyboard.addKey('UP');
        this.keyUP.on('down', () => this.brick.changeUp());

        this.keyD = this.input.keyboard.addKey('D');
        this.keyD.on('down', () => this.brick.changeDown());

        this.keySPACE = this.input.keyboard.addKey('SPACE');
        this.keySPACE.on('down', () => {
            this.sound.play('sound-drop');
            this.brick.goDown();
        });

        this.keyDown = this.input.keyboard.addKey('DOWN');

        this.input.keyboard.once('keydown_Q', this.quit, this);
    }

    addNextBricksToQueue() {
        for (let i = 0; i < this.brickQueue; i++) {
            let row = 3;
            if (i === 1)
                row = 10;
        }
    }

    addBrickIDsToQueue() {
        let cnt = 2 - this.brickQueue.length;
        for (let i = 0; i < cnt; i++) {
            let tmpShapeIndex = Math.floor(Math.random() * CONSTANT.gameBoard.BRICK_SHAPES.length);
            this.brickQueue.push(tmpShapeIndex);
            this.brickQueueObj.push(new NextBrick(this, {}, this.board, tmpShapeIndex));
        }
        this.brickQueueObj[0].setCoordinate(2);
        this.brickQueueObj[1].setCoordinate(6);
    }

    getBrickIDFromQueue() {
        let tmp = this.brickQueue.shift();
        let tmpObj = this.brickQueueObj.shift();
        tmpObj.clearSet();
        tmpObj.destroy();
        this.addBrickIDsToQueue();
        return tmp;
    }

    updateData() {
        if(!this.brick.canFall() && !this.brick.playedSound) {
            this.sound.play('sound-click');
            this.brick.playedSound = true;
        }
        this.data_score.text = this.gameData.score;
        this.data_sPoint.text = this.gameData.sPoint;
        this.data_time.text = "00:00:00";
        this.data_level.text = this.gameData.level;
        this.data_player.text = "Trung Tran";
        this.data_destroyed.text = this.gameData.destroyed;
    }

    update() {
        if (this.keyDown.isDown) {
            this.brick.fall();
        }
        this.updateData();
    }

    getRandWithProb(setWithProb) {
        let sum = 0;
        for (let i = 0; i < setWithProb.length; i++) {
            sum += setWithProb[i];
        }

        let pick = Math.random() * sum;
        for (let i = 0; i < setWithProb.length; i++) {
            pick -= setWithProb[i];
            if (pick <= 0) {
                return i;
            }
        }
    }

    // extend:

    quit() {
        // this.removeBrick();
        // this.fallTimer.destroy();
        this.scene.start('menu');
    }

    removeBrick() {
        this.brick.clearSet();
        this.brick = null;
    }

    createBrick() {
        this.brick = new Brick(this, {}, this.board, this.getBrickIDFromQueue());
    }

    fall() {
        if (!this.brick.fall()) {
            this.board.fix(this.brick);
            this.brick.clearSet();
            this.brick.destroy();
            let completedRowsCnt = this.board.checkToClear();
            if(completedRowsCnt !== 0) {
                this.sound.play('sound-done');
            }
            this.updateScore(completedRowsCnt);
            this.board.draw();
            this.createBrick();
        }
    }

    updateScore(completedRowsCnt) {
        switch (completedRowsCnt) {
            case 1:
                this.gameData.score += Math.floor(1 * completedRowsCnt * CONSTANT.gameBoard.SCORE_PER_ROW);
                break;
            case 2:
                this.gameData.score += Math.floor(2 * completedRowsCnt * CONSTANT.gameBoard.SCORE_PER_ROW);
                break;
            case 3:
                this.gameData.score += Math.floor(3 * completedRowsCnt * CONSTANT.gameBoard.SCORE_PER_ROW);
                break;
            case 4:
                this.gameData.score += Math.floor(4 * completedRowsCnt * CONSTANT.gameBoard.SCORE_PER_ROW);
                break;
        }
        this.gameData.destroyed += completedRowsCnt;
    }

    shutdown() {
        this.registry.set('score', this.score);
    }

}
