import {
    CST
} from "../js/CST";

export class LoadScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.LOAD
        });
    }

    init() {
        console.log("Load scene is loaded");
    }

    preload() {
        let loadingBar = this.add.graphics();

        this.load.on("progress", (percent) => {
            console.log(percent);
            loadingBar.clear();
            loadingBar.fillStyle(0xffffff, 1);
            loadingBar.fillRect(0, 270, 800 * percent, 60);
        });

        // this.load.on("complete", () => {
        //     this.scene.start(CST.SCENES.MENU);
        // });

        this.load.setPath("../assets/");
        this.load.image("bg");
        // for (let i = 0; i < 10000000; i++) {
        //     this.load.image(bg);
        // }
    }

    create() {
        this.add.image(10, 10, "bg");
    }
}