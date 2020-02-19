var mainState = {
    preload: function () {
        game.load.image('bg', 'assets/bg.jpg');
        game.load.image('face', 'assets/face.png');
        game.load.image('rock', 'assets/rock.png');
        game.load.audio('laugh', 'assets/laugh.wav');
        game.load.audio('aww', 'assets/aww.wav');
        game.load.audio('beat', 'assets/looped-beat.ogg');
    },

    create: function () {
        this.music = game.add.audio('beat');
        this.music.play();

        game.stage.backgroundColor = '#4198b1';

        this.bg = game.add.tileSprite(0, 0, 800, 600, 'bg');

        game.physics.startSystem(Phaser.Physics.ARCADE);

        this.face = game.add.sprite(100, 250, 'face');
        game.physics.arcade.enable(this.face);

        this.face.body.gravity.y = 1000;

        this.spaceKey = game.input.keyboard.addKey(
            Phaser.Keyboard.SPACEBAR);
        this.spaceKey.onDown.add(this.jump, this);

        game.input.onTap.add(this.jump, this);

        this.laughSound = game.add.audio('laugh');
        this.hurtSound = game.add.audio('aww');

        this.rocks = game.add.group();

        this.timer = game.time.events.loop(1000, this.addMultipleRocks, this);

        this.score = 0;
        this.labelScore = game.add.text(20, 10, "0",
            { font: "50px Arial", fill: "#ffffff" });
    },

    update: function () {
        this.bg.tilePosition.x += -1;

        if (this.face.y < -100 || this.face.y > 600)
            this.restartGame();

        game.physics.arcade.overlap(
            this.face, this.rocks, this.hit, null, this);

        if (game.input.activePointer.isDown)
        {
            this.jump();
        }
    },

    hit: function () {
        this.music.stop();
        this.hurtSound.play();
        //this.rocks.body.velocity.x = 0;
        //game.paused = true;
        this.spaceKey.onDown.removeAll();
        this.face.body.velocity.y = 700;
    },

    jump: function () {
        this.face.body.velocity.y = -450;
        this.laughSound.play();
    },

    restartGame: function () {
        this.music.stop();
        game.state.start('main');
    },

    addMultipleRocks: function () {
        for (var i = 0; i < 3; i++) {
            var y = Math.floor(Math.random() * 600) + 1;
            this.addARock(600, y);
            this.score += 1;
            this.labelScore.text = this.score;
        }
    },

    addARock: function (x, y) {
        this.rock = game.add.sprite(x, y, 'rock');
        this.rocks.add(this.rock);
        game.physics.arcade.enable(this.rock);
        this.rock.body.velocity.x = -500     ;
        this.rock.checkWorldBounds = true;
        this.rock.outOfBoundsKill = true;
    },
};

var game = new Phaser.Game(600, 600);

game.state.add('main', mainState);

game.state.start('main');