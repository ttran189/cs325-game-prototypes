class TitleScene extends Phaser.Scene {

    constructor() {
        super({key: 'TitleScene'});
    }

    preload() {
        this.load.image('background1', 'assets/img/bg.png');
    }

    create() {
        this.scene.switch('GameScene');

        this.bg1 = this.add.tileSprite(0, 35, 1200, 600, 'background1');
        this.bg1.setOrigin(0, 0);

        this.title = this.add.text(30, 10, 'Click here to continue');
        this.title.setInteractive({ useHandCursor: true });
        this.title.on('pointerdown', () => this.moveToGameScene());
    }

    moveToGameScene() {
        this.scene.switch('GameScene');
    }

    update() {
        this.bg1.tilePositionX -= 0.3;
    }

}

export default TitleScene;