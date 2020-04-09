import {
    CST
} from "../js/CST";

export class MenuScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.MENU
        });
    }

    init() {
        console.log("Menu scene is loaded");
    }

    preload() {

    }

    create() {

    }
}