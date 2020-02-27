import Balloon from "./Balloon.js";

class GameScene extends Phaser.Scene {

    constructor(config) {
        super({key: 'GameScene'});
        this.game = config.game;
    };

    init() {

    };

    preload() {
        this.load.image('background1', 'assets/img/bg.png');
        this.load.image('a', 'assets/img/balloons/a.png');
        this.load.image('b', 'assets/img/balloons/b.png');
        this.load.image('c', 'assets/img/balloons/c.png');
        this.load.image('d', 'assets/img/balloons/d.png');
        this.load.image('e', 'assets/img/balloons/e.png');
        this.load.image('f', 'assets/img/balloons/f.png');
        this.load.image('g', 'assets/img/balloons/g.png');
        this.load.image('h', 'assets/img/balloons/h.png');
        this.load.image('i', 'assets/img/balloons/i.png');
        this.load.image('j', 'assets/img/balloons/j.png');
        this.load.image('k', 'assets/img/balloons/k.png');
        this.load.image('l', 'assets/img/balloons/l.png');
        this.load.image('m', 'assets/img/balloons/m.png');
        this.load.image('n', 'assets/img/balloons/n.png');
        this.load.image('o', 'assets/img/balloons/o.png');
        this.load.image('p', 'assets/img/balloons/p.png');
        this.load.image('q', 'assets/img/balloons/q.png');
        this.load.image('r', 'assets/img/balloons/r.png');
        this.load.image('s', 'assets/img/balloons/s.png');
        this.load.image('t', 'assets/img/balloons/t.png');
        this.load.image('u', 'assets/img/balloons/u.png');
        this.load.image('v', 'assets/img/balloons/v.png');
        this.load.image('w', 'assets/img/balloons/w.png');
        this.load.image('x', 'assets/img/balloons/x.png');
        this.load.image('y', 'assets/img/balloons/y.png');
        this.load.image('z', 'assets/img/balloons/z.png');

        this.load.text('1b', 'assets/dict/1b.txt');
        this.load.text('2b', 'assets/dict/2b.txt');
        this.load.text('3b', 'assets/dict/3b.txt');
        this.load.text('4b', 'assets/dict/4b.txt');
        this.load.text('5b', 'assets/dict/5b.txt');
        this.load.text('6b', 'assets/dict/6b.txt');
        this.load.text('7b', 'assets/dict/7b.txt');
        this.load.text('8b', 'assets/dict/8b.txt');
        this.load.text('9b', 'assets/dict/9b.txt');
        this.load.text('10b', 'assets/dict/10b.txt');
        this.load.text('11b', 'assets/dict/11b.txt');
        this.load.text('12b', 'assets/dict/12b.txt');
        this.load.text('13b', 'assets/dict/13b.txt');
        this.load.text('14b', 'assets/dict/14b.txt');
        this.load.text('15b', 'assets/dict/15b.txt');
        this.load.text('16b', 'assets/dict/16b.txt');
        this.load.text('17b', 'assets/dict/17b.txt');
        this.load.text('18b', 'assets/dict/18b.txt');
        this.load.text('19b', 'assets/dict/19b.txt');
        this.load.text('20b', 'assets/dict/20b.txt');
    };

    create() {
        this.bg1 = this.add.tileSprite(0, 35, 1200, 600, 'background1');
        this.bg1.setOrigin(0, 0);

        this.title = this.add.text(30, 10, 'Playing State');

        this.dictArray = [];
        this.loadDict();

        let timer1 = this.time.addEvent({
            delay: 4000,
            callback: this.addAWord,
            callbackScope: this,
            loop: true
        });

        let timer2 = this.time.addEvent({
            delay: 2000,
            callback: this.changeToggle,
            callbackScope: this,
            loop: true
        });

        let timer3 = this.time.addEvent({
            delay: 6000,
            callback: this.outOfTime,
            callbackScope: this,
            loop: true
        });

        this.toggle = -0.1;

        this.groupWords = this.add.group();
        this.balloons = this.add.group();
        this.wordArray = [];
    };

    outOfTime() {
        console.log("done");
    }

    update() {
        this.bg1.tilePositionX -= 0.3;

        this.balloons.getChildren().forEach((balloon) => {
            balloon.angle -= this.toggle;
        });
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    changeToggle() {
        this.toggle *= -1;
    }

    loadDict() {
        let cache = this.cache.text;
        let cnt = 0;
        for (let i = 1; i <= 20; i++) {
            let dict = cache.get(i + "b");
            this.dictArray[cnt++] = dict.split('\n');
        }
    }

    pickAWord(wordLength) {
        if (wordLength < 1 || wordLength > 20) {
            console.log("Invalid length");
            return null;
        } else {
            wordLength--;
            let wordToPick = this.dictArray[wordLength];
            let random = this.getRandomInt(0, wordToPick.length);
            let pickedWord = this.dictArray[wordLength][random];
            return pickedWord;
        }
    }

    addAWord() {
        let wordLength = 4;
        let word = this.pickAWord(wordLength);
        let x = this.getRandomInt(0, 800);
        let y = 700;
        let cnt = 0;
        let letterArray = word.split('');
        for (let i = 0; i < wordLength; i++) {
            let balloon = this.physics.add.sprite(x, y, letterArray[i]);
            balloon.displayWidth = 70;
            balloon.displayHeight = 150;
            balloon.checkWorldBounds = true;
            balloon.outOfBoundsKill = true;
            balloon.body.velocity.y = -50;
            balloon.angle = this.getRandomInt(-10, -5);
            x += 80;
            this.balloons.add(balloon);
            cnt++;
        }
        //this.groupWords.push(oneWord);
        this.wordArray.push(word);
    }

    end() {

    }

}

export default GameScene;