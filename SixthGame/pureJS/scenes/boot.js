import CONST from '../data/const.js';
import {CONSTANT} from "../data/CONSTANT.js";

const Rectangle = Phaser.Geom.Rectangle;

export default class BootScene extends Phaser.Scene {

  constructor () {
    super('boot');
    this.progressBar = null;
    this.progressBgRect = null;
    this.progressRect = null;
  }

  preload () {
    this.load.image('bg', 'bg.png');
    this.load.image('bg2', 'bg2.png');
    this.load.image('title', 'title.png');
    this.load.image('bg-dim-1', 'bg-dim-1.png');
    this.load.image("cell", "cell.png");

    this.load.spritesheet('btn-newGame',
        'btn-newGame.png',
        { frameWidth: 121, frameHeight: 26 }
    );

    this.load.spritesheet('btn-highScore',
        'btn-highScore.png',
        { frameWidth: 121, frameHeight: 26 }
    );

    this.load.spritesheet('btn-about',
        'btn-about.png',
        { frameWidth: 121, frameHeight: 26 }
    );

    this.load.audio('sound-swap', 'sound-swap.wav');
    this.load.audio('sound-click', 'sound-click.wav');
    this.load.audio('sound-fallFast', 'sound-fallFast.wav');
    this.load.audio('sound-done', 'sound-done.wav');
    this.load.audio('sound-drop', 'sound-drop.wav');
    this.load.audio('sound-move', 'sound-move.wav');
    this.load.audio('sound-bgMusic', 'sound-bgMusic.mp3');

    this.load.on('progress', this.onLoadProgress, this);
    this.load.on('complete', this.onLoadComplete, this);
    this.createProgressBar();
  }

  create () {
    this.registry.set('score', 0);
    this.scene.start('menu');
  }

  // extend:

  createProgressBar () {
    const main = this.cameras.main;
    this.progressBgRect = new Rectangle(0, 0, 0.5 * main.width, 50);
    Rectangle.CenterOn(this.progressBgRect, 0.5 * main.width, 0.5 * main.height);
    this.progressRect = Rectangle.Clone(this.progressBgRect);
    this.progressBar = this.add.graphics();
  }

  onLoadComplete (loader, totalComplete, totalFailed) {
    console.debug('complete', totalComplete);
    console.debug('failed', totalFailed);
    this.progressBar.destroy();
  }

  onLoadProgress (progress) {
    console.debug('progress', progress);
    this.progressRect.width = progress * this.progressBgRect.width;
    this.progressBar
      .clear()
      .fillStyle(CONST.hexColors.darkGray)
      .fillRectShape(this.progressBgRect)
      .fillStyle(this.load.totalFailed ? CONST.hexColors.red : CONST.hexColors.white)
      .fillRectShape(this.progressRect);
  }

}
