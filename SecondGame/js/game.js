let health;
let immortal;
let inverse;
let vaccineCount;
let passenger;
let virusCount;
let superVirusCount;
let goldenVaccineCount;
let gasTankCount;
let started = false;

var mainState = {
    preload: function () {
        game.load.image('bg', 'assets/bg-2.jpg');
        game.load.image('dimBg', 'assets/dimBg.png');
        game.load.image('poster', 'assets/poster.png');
        game.load.image('knife', 'assets/virus.png');
        game.load.image('heart', 'assets/heart.png');
        game.load.image('vaccine', 'assets/vaccine.png');
        game.load.image('goldVaccine', 'assets/goldenVaccine.png');
        game.load.image('superVirus', 'assets/superVirus.png');
        game.load.image('batman', 'assets/airplane.png');
        game.load.image('sickAirplane', 'assets/sickAirplane.png');
        game.load.image('immortalAirplane', 'assets/immortalAirplane.png');
        game.load.image('gas', 'assets/gas.png');
        game.load.audio('beat', 'assets/looped-beat.ogg');
        game.load.audio('cough', 'assets/cough.wav');
        game.load.audio('cured', 'assets/cured.wav');
        game.load.audio('filled', 'assets/gasFilled.wav');
        game.load.audio('immortal', 'assets/immortal.wav');
        game.load.audio('sick', 'assets/sick.wav');
        game.load.audio('begin', 'assets/beginMusic.wav');
    },

    create: function () {
        this.music = game.add.audio('beat', 1, true);

        game.stage.backgroundColor = '#4198b1';

        this.bg = game.add.tileSprite(0, 0, 1200, 600, 'bg');

        game.physics.startSystem(Phaser.Physics.ARCADE);

        this.batman = game.add.sprite(100, 250, 'batman');
        game.physics.arcade.enable(this.batman);
        this.batman.body.setSize(120, 35, 30, 30);
        this.batman.body.gravity.y = 100;

        this.knifes = game.add.group();
        this.healthIndicator = game.add.group();

        this.coughSound = game.add.audio('cough');
        this.curedSound = game.add.audio('cured');
        this.filledSound = game.add.audio('filled');
        this.immortalSound = game.add.audio('immortal');
        this.sickSound = game.add.audio('sick');
        this.beginSound = game.add.audio('begin', 1, true);

        this.vaccines = game.add.group();
        this.gases = game.add.group();
        this.goldVaccines = game.add.group();
        this.superViruses = game.add.group();

        this.timer = game.time.events.loop(1000, this.addMultipleknifes, this);
        this.timer2 = game.time.events.loop(500, this.bump, this);
        this.timer3 = game.time.events.loop(5000, this.addVaccine, this);
        this.timer4 = game.time.events.loop(10000, this.addGas, this);
        this.timer5 = game.time.events.loop(5000, this.addSuperVirus, this);
        this.timer6 = game.time.events.loop(15000, this.addGoldVaccine, this);

        this.score = 0;
        this.labelScore = game.add.text(20, 10, "You saved 0 people on this flight",
            {font: "30px Arial", fill: "#ffffff"});

        health = 3;
        immortal = false;
        vaccineCount = 0;
        passenger = 575;
        inverse = false;

        virusCount = 0;
        superVirusCount = 0;
        goldenVaccineCount = 0;
        gasTankCount = 0;

        this.addHealth();

        this.beginSound.play();
        if(started === false) {
            this.poster = game.add.sprite(0, 0, 'poster');
             this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
            this.spaceKey.onDown.add(function() {
                this.poster.visible = false;
                started = true;
                this.beginSound.stop();
                this.music.play();
            }, this);
        }
    },

    update: function () {
        if(started === true) {
            if(this.batman.x <= -100 || this.batman.x >= 1300 || this.batman.y < -100 || this.batman.y >= 700) {
                this.batman.x = 200;
                this.batman.y = 250;
            }

            this.bg.tilePosition.x += -1;
            this.knifes.forEach(function (itemK) {
                let speed = Math.floor(Math.random() * 5) + 1;
                itemK.angle -= speed;
            });

            this.superViruses.forEach(function (itemK) {
                let speed = Math.floor(Math.random() * 5) + 1;
                itemK.angle -= speed;
            });

            let movingSpeed = 12;
            if (inverse === false) {
                if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                    this.batman.x -= movingSpeed;
                } else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                    this.batman.x += movingSpeed
                }
                if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
                    this.batman.y -= movingSpeed;
                } else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
                    this.batman.y += movingSpeed;
                }
            } else {
                if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                    this.batman.x += movingSpeed;
                } else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                    this.batman.x -= movingSpeed
                }
                if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
                    this.batman.y += movingSpeed;
                } else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
                    this.batman.y -= movingSpeed;
                }
            }

            game.physics.arcade.overlap(
                this.batman, this.knifes, this.hit, null, this);

            game.physics.arcade.overlap(
                this.batman, this.vaccines, this.vaccineHit, null, this);

            game.physics.arcade.overlap(
                this.batman, this.gases, this.gasHit, null, this);

            game.physics.arcade.overlap(
                this.batman, this.goldVaccines, this.goldVaccineHit, null, this);

            game.physics.arcade.overlap(
                this.batman, this.superViruses, this.superVirusHit, null, this);
        }
    },

    render: function () {
        // game.debug.body(this.batman);
        // this.vaccines.forEach(function (item) {
        //         game.debug.body(item);
        //     }
        // );
    },

    bump: function () {
        this.batman.body.velocity.y = -30;
    },

    hit: function (batman, item) {
        //this.camera.flash(0xFFFFFF, 50);
        item.kill();
        item.destroy();
        this.knifes.remove(item);
        virusCount++;
        if (immortal === false) {
            health--;
            this.coughSound.play();
            console.log("played");
            if (health === 2) {
                this.healthIndicator.children[0].visible = false;
            } else if (health === 1) {
                this.healthIndicator.children[1].visible = false;
            } else if (health === 0) {
                this.healthIndicator.children[2].visible = false;
            } else if (health < 0) {
                this.report();
            }
        }
    },

    updateScore: function () {
        vaccineCount += 1;
        this.labelScore.text = "You saved " + vaccineCount + " people / 500 on this flight";
    },

    updateHealth: function () {
        if (health === 0) {
            this.healthIndicator.children[2].visible = true;
            health++;
        } else if (health === 1) {
            this.healthIndicator.children[1].visible = true;
            health++;
        } else if (health === 2) {
            this.healthIndicator.children[0].visible = true;
            health++;
        } else if (health >= 3) {
            // nothing.
        }
    },

    vaccineHit: function (batman, vac) {
        this.curedSound.play();
        this.updateScore();
        vac.kill();
        vac.destroy();
        this.vaccines.remove(vac);
    },

    gasHit: function (batman, gas) {
        this.filledSound.play();
        gas.kill();
        gas.destroy();
        this.gases.remove(gas);
        this.updateHealth();
        gasTankCount++;
    },

    goldVaccineHit: function (batman, goldVaccine) {
        immortal = true;
        this.music.stop();
        this.immortalSound.play();
        goldVaccine.kill();
        goldVaccine.destroy();
        this.goldVaccines.remove(goldVaccine);
        this.updateHealth();
        this.batman.loadTexture('immortalAirplane');
        game.time.events.add(5000, function () {
            if (inverse === true) {
                inverse = false;
            }
            immortal = false;
            this.batman.loadTexture('batman');
            this.music.play();
        }, this);
        goldenVaccineCount++;
    },

    superVirusHit: function (batman, superVirus) {
        superVirus.kill();
        superVirus.destroy();
        this.superViruses.remove(superVirus);
        superVirusCount++;
        if (immortal === false) {
            this.music.stop();
            this.sickSound.play();
            if (immortal === false) {
                inverse = true;
                this.batman.loadTexture('sickAirplane');
                game.time.events.add(3000, function () {
                    inverse = false;
                    this.batman.loadTexture('batman');
                    this.music.play();
                }, this);

                health--;
                this.coughSound.play();
                if (health === 2) {
                    this.healthIndicator.children[0].visible = false;
                } else if (health === 1) {
                    this.healthIndicator.children[1].visible = false;
                } else if (health === 0) {
                    this.healthIndicator.children[2].visible = false;
                } else if (health < 0) {
                    this.report();
                }
            }
        }
    },

    posterState: function () {

    },

    report: function () {
        started = false;
        this.beginSound.play();
        this.music.stop();

        let x = 300;
        let y = 100;
        this.dimBg = game.add.sprite(0, 0, 'dimBg');
        this.reportLabel1 = game.add.text(x, y, "Game Over",
            {font: "50px Arial", fill: "#ff9432"}); y += 70;
        this.reportLabel2 = game.add.text(x, y, "- You saved " + vaccineCount + " lives.",
            {font: "25px Arial", fill: "#ffffff"}); y += 50;
        this.reportLabel3 = game.add.text(x, y, "- You killed " + virusCount + " corona viruses.",
            {font: "25px Arial", fill: "#ffffff"}); y += 50;
        this.reportLabel4 = game.add.text(x, y, "- You killed " + superVirusCount + " super corona viruses.",
            {font: "25px Arial", fill: "#ffffff"}); y += 50;
        this.reportLabel5 = game.add.text(x, y, "- You collected " + gasTankCount + " pilot vaccines.",
            {font: "25px Arial", fill: "#ffffff"}); y += 50;
        this.reportLabel6 = game.add.text(x, y, "- You collected " + goldenVaccineCount + " golden vaccines.",
            {font: "25px Arial", fill: "#ffffff"}); y += 50;
        this.reportLabel7 = game.add.text(x, y, "@Author: Trung Tran - @Date: 02-20-2020 - GMU CS325",
            {font: "15px Arial", fill: "#ab592a"}); y += 50;
        this.reportLabel8 = game.add.text(x, y, "PRESS ENTER TO RESTART!",
            {font: "25px Arial", fill: "#58da24"});

        this.enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        this.enterKey.onDown.add(function() {
            this.music.stop();
            this.beginSound.stop();

            this.dimBg.kill();
            this.reportLabel1.kill();
            this.reportLabel2.kill();
            this.reportLabel3.kill();
            this.reportLabel4.kill();
            this.reportLabel5.kill();
            this.reportLabel6.kill();
            this.reportLabel7.kill();
            this.reportLabel8.kill();

            this.dimBg.destroy();
            this.reportLabel1.destroy();
            this.reportLabel2.destroy();
            this.reportLabel3.destroy();
            this.reportLabel4.destroy();
            this.reportLabel5.destroy();
            this.reportLabel6.destroy();
            this.reportLabel7.destroy();
            this.reportLabel8.kill();

            this.restartGame();
        }, this);
    },

    jump: function () {
        // this.face.body.velocity.y = -450;
        // this.laughSound.play();
    },

    restartGame: function () {
        this.sickSound.stop();
        this.immortalSound.stop();
        this.music.stop();
        game.state.start('main');
        game.add.text(100, 100, "123456");
    },

    addMultipleknifes: function () {
        let min = 2;
        let max = 4;
        let knifeNo = Math.floor(Math.random() * max) + min;
        for (let i = 0; i < knifeNo; i++) {
            let y = Math.floor(Math.random() * 600) + 1;
            this.addAknife(1200, y);
        }

    },

    addAknife: function (x, y) {
        this.knife = game.add.sprite(x, y, 'knife');
        game.physics.arcade.enable(this.knife);
        this.knife.body.setSize(30, 30, -5, 0);
        let speedX = Math.floor(Math.random() * 450) + 300;
        let speedY = Math.floor(Math.random() * 200) + 1;
        let upOrDown = Math.random() < 0.5 ? -1 : 1;
        this.knife.body.velocity.x = speedX * -1;
        this.knife.body.velocity.y = speedY * upOrDown;
        this.knife.anchor.setTo(0.5, 0.5);
        this.knife.checkWorldBounds = true;
        this.knife.outOfBoundsKill = true;
        this.knifes.add(this.knife);
    },

    addSuperVirus: function () {
        let y = Math.floor(Math.random() * 600) + 1;
        let x = 1200;
        this.superVirus = game.add.sprite(x, y, 'superVirus');
        game.physics.arcade.enable(this.superVirus);
        this.superVirus.body.setSize(30, 30, -5, 0);
        let speedX = Math.floor(Math.random() * 600) + 400;
        let speedY = Math.floor(Math.random() * 200) + 1;
        let upOrDown = Math.random() < 0.5 ? -1 : 1;
        this.superVirus.body.velocity.x = speedX * -1;
        this.superVirus.body.velocity.y = speedY * upOrDown;
        this.superVirus.anchor.setTo(0.5, 0.5);
        this.superVirus.checkWorldBounds = true;
        this.superVirus.outOfBoundsKill = true;
        this.superViruses.add(this.superVirus);
    },

    addVaccine: function () {
        let x = Math.floor(Math.random() * 1100) + 50;
        this.vaccine = game.add.sprite(x, 600, 'vaccine');
        game.physics.arcade.enable(this.vaccine);
        this.vaccine.body.setSize(50, 50, 15, 15);
        let speedY = Math.floor(Math.random() * 150) + 50;
        this.vaccine.body.velocity.y = speedY * -1;
        this.vaccine.checkWorldBounds = true;
        this.vaccine.outOfBoundsKill = true;
        this.vaccines.add(this.vaccine);
    },

    addGoldVaccine: function () {
        let x = Math.floor(Math.random() * 1100) + 50;
        this.goldVaccine = game.add.sprite(x, 600, 'goldVaccine');
        game.physics.arcade.enable(this.goldVaccine);
        this.goldVaccine.body.setSize(50, 50, 15, 15);
        let speedY = Math.floor(Math.random() * 150) + 50;
        this.goldVaccine.body.velocity.y = speedY * -1;
        this.goldVaccine.checkWorldBounds = true;
        this.goldVaccine.outOfBoundsKill = true;
        this.goldVaccines.add(this.goldVaccine);
    },

    addGas: function () {
        let x = Math.floor(Math.random() * 1100) + 50;
        this.gas = game.add.sprite(x, 600, 'gas');
        game.physics.arcade.enable(this.gas);
        this.gas.body.setSize(50, 50, 15, 15);
        let speedY = Math.floor(Math.random() * 150) + 50;
        this.gas.body.velocity.y = speedY * -1;
        this.gas.checkWorldBounds = true;
        this.gas.outOfBoundsKill = true;
        this.gases.add(this.gas);
    },

    addHealth: function () {
        let x = 1000;
        let y = 40;
        for (let i = 0; i < health; i++) {
            this.h = game.add.sprite(x, y, 'heart');
            this.healthIndicator.add(this.h);
            x += 60;
        }
    }
};

var game = new Phaser.Game(1200, 600);

game.state.add('main', mainState);
game.state.start('main');