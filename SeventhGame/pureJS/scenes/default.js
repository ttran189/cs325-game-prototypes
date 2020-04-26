import {Board} from "../js/Board.js";
import {Brick} from "../js/Brick.js";
import {GridBoard} from "../js/GridBoard.js";
import {CONSTANT} from "../data/CONSTANT.js";
import {NextBrick} from "../js/NextBrick.js";
import {SpecialItem} from "../js/SpecialItem.js";

export default class DefaultScene extends Phaser.Scene {

    constructor() {
        super('default');
    }

    init(data) {
        console.debug('init', this.scene.key, data, this);
        //this.events.on('shutdown', this.shutdown, this);
    }

    reset() {
        console.log("Game is reset");
        this.resetGameData();
        this.board.reset();
        this.item.destroy();
        this.createSpecialItem();
        this.brick.clearSet();
        this.brick.destroy();
        this.createBrick();
        this.gameData.ptime = Math.floor(this.time.now / 1000);
    }

    resetGameData() {
        this.gameData = {
            sPoint: 0,
            sdPoint: 0,
            score: 0,
            level: 1,
            destroyed: 0,
            player: "",
            ptime: 0,
            time: 0,
            nexShapeIndices: [],
            nextSpecialIndices: []
        };
    }

    create() {
        //const earthBg = this.add.image(500, 1100, 'earth');
        this.uni = new Phaser.Physics.Arcade.Sprite(this, 500, 300, 'uni');
        this.earth = new Phaser.Physics.Arcade.Sprite(this, 500, 1100, 'earth');
        this.add.existing(this.uni);
        this.add.existing(this.earth);
        const picBg = this.add.image(500, 300, 'bg2');
        this.reloadBtn = this.add.sprite(950, 50, 'reloadBtn').setInteractive();
        this.reloadBtn.on('pointerup', () => this.reset());

        this.currentSpeed = 1000;
        this.fallTimer = this.time.addEvent({
            delay: this.currentSpeed,
            callback: this.fall,
            callbackScope: this,
            loop: true
        });
        this.board = new Board(this, {});
        this.board.depth = 5;
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

        this.resetGameData();

        let styleConfig = {
            font: "20px 'Verdana'", fill: "#ff0000", align: "center"
        };
        this.data_score = this.add.text(640, 320, "0", styleConfig);
        this.data_sPoint = this.add.text(240, 320, "0", styleConfig);
        this.data_time = this.add.text(640, 400, "0", styleConfig);
        this.data_level = this.add.text(240, 400, "0", styleConfig);
        this.data_player = this.add.text(640, 480, "0", styleConfig);
        this.data_destroyed = this.add.text(240, 480, "0", styleConfig);
        this.levelOn = [false, false, false, false, false, false, false];

        styleConfig = {
            font: "17px 'Verdana'", fill: "#ffa500", align: "center"
        };
        this.itemLabel = this.add.text(255, 240, "0 s-points", styleConfig);
        this.createSpecialItem();

        this.gameOverPromt = this.add.text(350, 230, 'Game Over!', {stroke: '#b82800', strokeThickness: 15, color: 'white', fontSize: '50px '});
        this.click2Restart = this.add.text(400, 290, '-[Restart]-', {color: 'orange', fontSize: '30px '});
        this.gameOverPromt.setVisible(false);
        this.click2Restart.setVisible(false);

        let namePromt = this.add.text(400, 520, 'Please enter your name', {color: 'white', fontSize: '20px '});
        let nameForm = this.add.dom(500, 570).createFromCache('nameForm');
        nameForm.addListener('click');
        nameForm.on('click', function (event) {
            if (event.target.name === 'playButton') {
                let inputText = this.getChildByName('nameField');
                if (inputText.value !== '') {
                    this.removeListener('click');
                    this.setVisible(false);
                    this.scene.gameData.player = inputText.value;
                    this.scene.data_player.text = inputText.value;
                    namePromt.setVisible(false);
                    this.scene.resumeGameForName();
                }
            }
        });

        this.pauseGameForName();
    }

    pauseGameForName() {
        this.scene.pause();
    }

    resumeGameForName() {
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

        this.keyX = this.input.keyboard.addKey('X');
        this.keyX.on('down', () => this.useSpecialItem());

        this.keySPACE = this.input.keyboard.addKey('SPACE');
        this.keySPACE.on('down', () => {
            this.sound.play('sound-drop');
            this.brick.goDown();
        });

        this.keyDown = this.input.keyboard.addKey('DOWN');
        this.input.keyboard.once('keydown_Q', this.quit, this);
        this.scene.resume();
    }

    useSpecialItem() {
        if (this.item.alpha === 1) {
            this.item.activate();
            this.item.destroy();
            this.createSpecialItem();
        }
    }

    getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    createSpecialItem() {
        let pick = this.getRandomIntInclusive(1, 9);
        let pic_name = "si-" + pick;
        this.item = new SpecialItem(this, pic_name, pick);
        this.item.scaleX = 0.9;
        this.item.scaleY = 1.3;
        this.add.existing(this.item);
        this.itemLabel.text = this.item.sdpoint + " s-points";
    }

    resetSpecialItem(obj) {
        if (obj === this.item) {
            this.sound.play('sound-siUse');
            if (this.gameData.sdPoint <= this.item.sdpoint) {
                this.gameData.sdPoint = 0;
            } else {
                this.gameData.sdPoint -= this.item.sdpoint;
            }
            this.item.destroy();
            this.createSpecialItem();
        }
    }

    startFastDrop(speed) {
        this.time.removeAllEvents();
        this.time.addEvent({
            delay: this.currentSpeed * 0.2,
            callback: this.fall,
            callbackScope: this,
            loop: true
        });
        this.time.delayedCall(speed * 1000, this.stopFastDrop, [], this);
    }

    stopFastDrop() {
        this.time.removeAllEvents();
        this.time.addEvent({
            delay: this.currentSpeed,
            callback: this.fall,
            callbackScope: this,
            loop: true
        });
        this.item.destroy();
        this.createSpecialItem();
    }

    increaseSpeed() {
        this.currentSpeed -= 100;
        this.time.removeAllEvents();
        console.log("Speed increased: " + this.currentSpeed);
        this.time.addEvent({
            delay: this.currentSpeed,
            callback: this.fall,
            callbackScope: this,
            loop: true
        });
    }

    startReverse(duration) {
        this.keyLeft.destroy();
        this.keyRight.destroy();
        this.keyLeft = this.input.keyboard.addKey('LEFT');
        this.keyLeft.on('down', () => this.brick.moveRight());
        this.keyRight = this.input.keyboard.addKey('RIGHT');
        this.keyRight.on('down', () => this.brick.moveLeft());
        this.time.delayedCall(duration * 1000, this.stopReverse, [], this);
    }

    stopReverse() {
        this.keyLeft.destroy();
        this.keyRight.destroy();
        this.keyLeft = this.input.keyboard.addKey('LEFT');
        this.keyLeft.on('down', () => this.brick.moveLeft());
        this.keyRight = this.input.keyboard.addKey('RIGHT');
        this.keyRight.on('down', () => this.brick.moveRight());
        this.item.destroy();
        this.createSpecialItem();
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
        if (!this.brick.canFall() && !this.brick.playedSound) {
            this.sound.play('sound-click');
            this.brick.playedSound = true;
        }
        this.updateLevel();
        this.data_score.text = this.gameData.score;
        this.data_sPoint.text = this.gameData.sdPoint;
        let currentTime = Math.floor(this.time.now / 1000) - this.gameData.ptime;
        this.data_time.text = currentTime + "s";
        this.data_level.text = this.gameData.level;
        this.data_destroyed.text = this.gameData.destroyed;
    }

    updateLevel() {
        if (this.gameData.score >= 1000 && this.gameData.score < 2000 && this.levelOn[0] === false) {
            this.gameData.level = 2;
            this.levelOn[0] = true;
            this.increaseSpeed();
        } else if (this.gameData.score >= 2000 && this.gameData.score < 4000 && this.levelOn[1] === false) {
            this.gameData.level = 3;
            this.levelOn[1] = true;
            this.increaseSpeed();
        } else if (this.gameData.score >= 4000 && this.gameData.score < 6000 && this.levelOn[2] === false) {
            this.gameData.level = 4;
            this.levelOn[2] = true;
            this.increaseSpeed();
        } else if (this.gameData.score >= 6000 && this.gameData.score < 8000 && this.levelOn[3] === false) {
            this.gameData.level = 5;
            this.levelOn[3] = true;
            this.increaseSpeed();
        } else if (this.gameData.score >= 8000 && this.gameData.score < 10000 && this.levelOn[4] === false) {
            this.gameData.level = 6;
            this.levelOn[4] = true;
            this.increaseSpeed();
        } else if (this.gameData.score >= 10000 && this.gameData.score < 12000 && this.levelOn[5] === false) {
            this.gameData.level = 7;
            this.levelOn[5] = true;
            this.increaseSpeed();
        }
    }

    update() {
        this.uni.rotation -= 0.0005;
        this.earth.rotation += 0.0005;
        if (this.keyDown.isDown) {
            this.brick.fall();
        }
        this.updateData();
        if(this.board.isFull()) {
            this.board.reset();
            this.brick.clearSet();
            this.time.delayedCall(5000, this.startOver, [], this);
            this.gameOverPromt.setDepth(10);
            this.click2Restart.setDepth(10);
            this.gameOverPromt.setVisible(true);
            this.click2Restart.setVisible(true);
        }
    }

    startOver() {
        this.gameOverPromt.setVisible(false);
        this.click2Restart.setVisible(false);
        this.reset();
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

        // this.scene.add('menu', MenuScene, false);
        // this.scene.start('menu');
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
            if (this.gameData.sPoint >= CONSTANT.gameBoard.S_POINT_CONSTRAINT && this.item.alpha !== 1) {
                this.gameData.sdPoint += Math.floor(this.gameData.sPoint / CONSTANT.gameBoard.S_POINT_CONSTRAINT);
                this.gameData.sPoint = Math.floor(this.gameData.sPoint % CONSTANT.gameBoard.S_POINT_CONSTRAINT);
                if (this.gameData.sdPoint >= this.item.sdpoint) {
                    this.gameData.sdPoint = Math.floor(this.gameData.sdPoint % this.item.sdpoint);
                    this.item.alpha = 1;
                    this.sound.play('sound-siReady');
                    this.time.delayedCall(15000, this.resetSpecialItem, [this.item], this);
                }
            }

            this.board.fix(this.brick);
            this.brick.clearSet();
            this.brick.destroy();
            let completedRowsCnt = this.board.checkToClear();
            if (completedRowsCnt !== 0) {
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
