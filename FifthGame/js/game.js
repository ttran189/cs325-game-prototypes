import {LoadScene} from "../scenes/LoadScene";
import {MenuScene} from "../scenes/MenuScene";

const config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 500,
    scene: [LoadScene, MenuScene]
};

let game = new Phaser.Game(config);