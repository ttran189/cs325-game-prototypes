export default class ScoreBoardScene extends Phaser.Scene {

    constructor() {
        super('scoreBoard');
    }

    init(data) {
        console.debug('init', this.scene.key, data, this);
    }

    pullScoresFromDB() {
        let firebaseConfig = {
            apiKey: "AIzaSyCkip7lcHNNodJNhrO5n0Hog5Kvs1mvnuI",
            authDomain: "sterminal-8bf73.firebaseapp.com",
            databaseURL: "https://sterminal-8bf73.firebaseio.com",
            projectId: "sterminal-8bf73",
            storageBucket: "sterminal-8bf73.appspot.com",
            messagingSenderId: "961511930263",
            appId: "1:961511930263:web:f3cec40f38f7b7d40d6cd2"
        };

        let db = firebase.initializeApp(firebaseConfig).database();
        let ref = db.ref("gameHighScores");

        let scene = this;

        let data = [];
        ref.orderByChild("score").on("value", function (snap) {
            snap.forEach(e => {
                //console.log(e.val());
                data.push(e.val());
            });
            data.reverse();
            //console.log(scene.addText(data));
            scene.addText(data);
        });
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
        picBgDim.setScale(2, 1.7);
        picBgDim.setPosition(230, 250);

        this.pullScoresFromDB();

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
