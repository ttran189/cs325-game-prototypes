export default class DefaultScene extends Phaser.Scene {

    constructor() {
        super('default');
    }

    init(data) {
        console.debug('init', this.scene.key, data, this);
        this.events.on('shutdown', this.shutdown, this);
    }

    create() {
        this.input.keyboard.once('keydown_Q', this.quit, this);
    }

    update() {

    }

    // extend:

    quit() {
        // this.removeBrick();
        // this.fallTimer.destroy();

        // this.scene.add('menu', MenuScene, false);
        // this.scene.start('menu');
    }

    shutdown() {
        // this.registry.set('score', this.score);
    }

}
