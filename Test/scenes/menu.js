import DefaultScene from "./default.js";

export default class MenuScene extends Phaser.Scene {

    constructor() {
        super('menu');
    }

    init(data) {
        console.debug('init', this.scene.key, data, this);
    }

    create() {
        this.label = this.add.text(300, 300, "Test");
    }

}
