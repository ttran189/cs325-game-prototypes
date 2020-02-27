import TitleScene from './TitleScene.js';
import GameScene from './GameScene.js';

let config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
};

let game = new Phaser.Game(config);
let gameScene = new GameScene({game: game});
let titleScene = new TitleScene();

// load scenes
game.scene.add('TitleScene', titleScene);
game.scene.add("GameScene", gameScene);

// start title
game.scene.start('TitleScene');