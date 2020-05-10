export default class AboutScene extends Phaser.Scene {

    constructor() {
        super('about');
    }

    init(data) {
        console.debug('init', this.scene.key, data, this);
    }

    addText(data) {
        let styleConfig = {
            font: "20px 'Verdana'", fill: "#ff0000", align: "center"
        };
        let x = 300;
        let y = 300;
        for (let i = 0; i < 5; i++) {
            if (data[i] != null) {
                let n = i + 1;
                let str = n + ". " + data[i].username + " - Score: " + data[i].score + " - Level: " + data[i].level;
                this.add.text(x, y, str, styleConfig);
                y += 50;
            } else {
                break;
            }
        }
    }

    create() {
        this.picBg = this.add.image(500, 300, 'uni');

        const picTitle = this.add.image(0, 0, 'title');
        picTitle.setOrigin(0, 0);
        picTitle.setPosition((game.renderer.width - picTitle.width) / 2, 100);

        const picBgDim = this.add.image(0, 0, 'bg-dim-1');
        picBgDim.setOrigin(0, 0);
        picBgDim.setScale(1.5, 1);
        picBgDim.setPosition(300, 250);

        let styleConfig = {
            font: "20px 'Verdana'", fill: "#d0b202", align: "center"
        };
        let x = 400;
        let y = 300;

        let str = "@author: Trung Tran\n" +
            "@date: April 22 2020\n" +
            "@game: Tetris 2020\n" +
            "@version: 3.0";
        this.add.text(x, y, str, styleConfig);

        // let keyEnter = this.input.keyboard.addKey('ENTER');
        // keyEnter.on('down', this.changeScene);

    }

    changeScene() {
        this.scene.start('menu');
    }

    update(time, delta) {
        super.update(time, delta);
        this.picBg.rotation += 0.0005;
    }

}
