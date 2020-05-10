import DefaultScene from "./default.js";
import ScoreBoardScene from "./scoreBoard.js";
import AboutScene from "./about.js";

export default class MenuScene extends Phaser.Scene {

    constructor() {
        super('menu');
    }

    init(data) {
        console.debug('init', this.scene.key, data, this);
    }

    create() {
        let player = this.sound;
        let scene = this.scene;
        let selectedMenu = 1;

        this.picBg = this.add.image(500, 300, 'uni');

        const picTitle = this.add.image(0, 0, 'title');
        picTitle.setOrigin(0, 0);
        picTitle.setPosition((game.renderer.width - picTitle.width) / 2, 100);

        const picBgDim = this.add.image(0, 0, 'bg-dim-1');
        picBgDim.setOrigin(0, 0);
        picBgDim.setPosition((game.renderer.width - picBgDim.width) / 2, 270);

        const btnNewGame = this.add.sprite(0, 0, 'btn-newGame').setInteractive();
        btnNewGame.setOrigin(0, 0);
        btnNewGame.setPosition((game.renderer.width - btnNewGame.width) / 2 - 10, 305);
        btnNewGame.setFrame(1);
        // btnNewGame.on('pointerover', function(pointer) {
        //     player.play('sound-swap');
        //     btnNewGame.setFrame(1);
        // });
        // btnNewGame.on('pointerout', function(pointer) {
        //     btnNewGame.setFrame(0);
        // });
        btnNewGame.setScale(1.3);

        const btnHighScore = this.add.sprite(0, 0, 'btn-highScore').setInteractive();
        btnHighScore.setOrigin(0, 0);
        btnHighScore.setPosition((game.renderer.width - btnHighScore.width) / 2 - 12, 355);
        // btnHighScore.on('pointerover', function(pointer) {
        //     player.play('sound-swap');
        //     btnHighScore.setFrame(1);
        // });
        // btnHighScore.on('pointerout', function(pointer) {
        //     btnHighScore.setFrame(0);
        // });
        btnHighScore.setScale(1.3);

        const btnAbout = this.add.sprite(0, 0, 'btn-about').setInteractive();
        btnAbout.setOrigin(0, 0);
        btnAbout.setPosition((game.renderer.width - btnAbout.width) / 2 - 12, 405);
        // btnAbout.on('pointerover', function(pointer) {
        //     player.play('sound-swap');
        //     btnAbout.setFrame(1);
        // });
        // btnAbout.on('pointerout', function(pointer) {
        //     btnAbout.setFrame(0);
        // });
        btnAbout.setScale(1.3);

        //this.input.on('pointerup', this.start, this);
        btnNewGame.on('pointerup', function (pointer) {
            player.play('sound-click');
        });

        btnHighScore.on('pointerup', function (pointer) {
            player.play('sound-click');
        });

        btnAbout.on('pointerup', function (pointer) {
            player.play('sound-click');
        });


        let keyUp = this.input.keyboard.addKey('UP');
        keyUp.on('down', function (event) {
            selectedMenu--;
            if (selectedMenu === 0)
                selectedMenu = 3;
            highLightBtn();
        });

        let keyDown = this.input.keyboard.addKey('DOWN');
        keyDown.on('down', function (event) {
            selectedMenu++;
            if (selectedMenu === 4)
                selectedMenu = 1;
            highLightBtn();
        });

        function highLightBtn() {
            player.play('sound-swap');
            switch (selectedMenu) {
                case 1:
                    btnNewGame.setFrame(1);
                    btnHighScore.setFrame(0);
                    btnAbout.setFrame(0);
                    break;
                case 2:
                    btnNewGame.setFrame(0);
                    btnHighScore.setFrame(1);
                    btnAbout.setFrame(0);
                    break;
                case 3:
                    btnNewGame.setFrame(0);
                    btnHighScore.setFrame(0);
                    btnAbout.setFrame(1);
                    break;
            }
        }

        let keyEnter = this.input.keyboard.addKey('ENTER');
        keyEnter.on('down', function (event) {
            switch (selectedMenu) {
                case 1:
                    //scene.add('default', DefaultScene, true)
                    scene.start('default');
                    break;
                case 2:
                    //scene.add('scoreBoard', ScoreBoardScene, true)
                    scene.start('scoreBoard');
                    break;
                case 3:
                    //scene.add('about', AboutScene, true)
                    scene.start('about');
                    break;
            }
        });

    }

    update(time, delta) {
        super.update(time, delta);
        this.picBg.rotation += 0.0005;
    }

}
