import CONST from '../data/const.js';
import MenuScene from "./menu.js";

const Rectangle = Phaser.Geom.Rectangle;

export default class BootScene extends Phaser.Scene {

    constructor() {
        super('boot');
    }

    preload() {

    }

    create() {
        // this.registry.set('score', 0);
        this.scene.add('menu', MenuScene, false);
        this.scene.start('menu');
    }

    onLoadComplete(loader, totalComplete, totalFailed) {

    }

    onLoadProgress(progress) {

    }

}
