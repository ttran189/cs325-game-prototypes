export class SpecialItem extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, pic, id) {
        super(scene, 300, 160, pic);
        this.alpha = 0.5;
        this.sdpoint = 0;
        this.id = id;
        switch (id) {
            case 1:
                this.sdpoint = 20; // remove 1 rows
                break;
            case 2:
                this.sdpoint = 25; // remove 2 rows
                break;
            case 3:
                this.sdpoint = 30; // remove 3 rows
                break;
            case 4:
                this.sdpoint = 15; // fast 5s
                break;
            case 5:
                this.sdpoint = 20; // fast 10s
                break;
            case 6:
                this.sdpoint = 25; // fast 15s
                break;
            case 7:
                this.sdpoint = 10; // reverse 5s
                break;
            case 8:
                this.sdpoint = 15; // reverse 7s
                break;
            case 9:
                this.sdpoint = 20; // reverse 9s
                break;

        }
    }

    activate() {
        this.scene.sound.play('sound-siUse');
        switch (this.id) {
            case 1:
                this.scene.board.removeRows(1);
                break;
            case 2:
                this.scene.board.removeRows(2);
                break;
            case 3:
                this.scene.board.removeRows(3);
                break;
            case 4:
                this.scene.startFastDrop(5);
                break;
            case 5:
                this.scene.startFastDrop(10);
                break;
            case 6:
                this.scene.startFastDrop(15);
                break;
            case 7:
                this.scene.startReverse(5);
                break;
            case 8:
                this.scene.startReverse(7);
                break;
            case 9:
                this.scene.startReverse(9);
                break;
        }
    }
}