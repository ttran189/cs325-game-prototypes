class Balloon extends Phaser.Physics.Arcade.Sprite  {
    constructor(config) {
        super(config.scene, config.x, config.y, config.letter);

        this.displayWidth = 70;
        this.displayHeight = 150;
        this.checkWorldBounds = true;
        this.outOfBoundsKill = true;
    }
}

export default Balloon;
