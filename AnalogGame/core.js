class Util {
    constructor() {

    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

class Dice {
    constructor() {
        this.active = true;
        this.n = 0;
    }

    reset() {
        this.active = true;
        this.n = 0;
    }

    deactivate() {
        this.active = false;
    }

    roll() {
        let u = new Util();
        this.n = u.getRandomInt(1, 6);
    }

    toString() {
        return this.n;
    }

    toVal() {
        return this.n;
    }
}

class Player {
    constructor(id) {
        this.id = id;
        this.score = 0;
        this.points = 0;
        this.pointsTurn = 0;
        this.diceNo = 6;
        this.dices = [];
        for (let i = 0; i < this.diceNo; i++) {
            let d = new Dice();
            this.dices.push(d);
        }
    }

    roll() {
        this.dices.forEach(d => {
            d.roll();
        })
        let pointCalculator = new ScoreBoard(this.dicesToArray());
        this.points = pointCalculator.toPoints();
    }

    dicesToString() {
        let str = "[";
        for (let i = 0; i < this.diceNo; i++) {
            str += this.dices[i].toString();
            if (i !== this.diceNo - 1) {
                str += ", "
            }
        }
        str += "]";
        return str;
    }

    dicesToArray() {
        let diceArr = []
        for (let i = 0; i < this.diceNo; i++) {
            diceArr.push(this.dices[i].toVal());
        }
        return diceArr;
    }

    toString() {
        let str = "";
        str += '<div class="playerCol" id="player_' + this.id + '">';
        str += '<div class="playerName"><span class="spacing">Player</span> ' + this.id + '</div>';
        str += '<div class="dice"><span class="spacing">Rolled</span> ' + this.dicesToString() + '</div>';
        str += '<div class="score"><span class="spacing">Points</span> ' + this.points + '</div>';
        str += '<div class="score"><span class="spacing">Turn</span> ' + this.pointsTurn + '</div>';
        str += '<div class="score"><span class="spacing">Score</span> ' + this.score + '</div>';
        str += '</div>';
        return str;
    }

}

class ScoreBoard {
    constructor(dices) {
        this.dices = {
            one: 0,
            two: 0,
            three: 0,
            four: 0,
            five: 0,
            six: 0
        }
        //console.log(dices);
        dices.forEach(d => {
            this.push(d);
        })
    }

    push(n) {
        switch (n) {
            case 1:
                this.dices.one++;
                break;
            case 2:
                this.dices.two++;
                break;
            case 3:
                this.dices.three++;
                break;
            case 4:
                this.dices.four++;
                break;
            case 5:
                this.dices.five++;
                break;
            case 6:
                this.dices.six++
                break;
        }
    }

    checkTripLet() {
        let tbCounter = Object.values(this.dices);
        let cnt = 0;
        tbCounter.forEach(e => {
            if (e === 3)
                cnt++;
        });
        return cnt === 2;
    }

    checkFourOfAnyNumberWithAPair() {
        let tbCounter = Object.values(this.dices);
        let cnt = 0;
        tbCounter.forEach(e => {
            if (e === 4)
                cnt++;
        });
        if (cnt === 1) {
            cnt = 0;
            tbCounter.forEach(e => {
                if (e === 2)
                    cnt++;
            });
            return cnt === 1;
        } else
            return false;
    }

    checkThreePairs() {
        let tbCounter = Object.values(this.dices);
        let cnt = 0;
        tbCounter.forEach(e => {
            if (e === 2)
                cnt++;
        });
        return cnt === 3;
    }

    checkOneToSix() {
        let tbCounter = Object.values(this.dices);
        let cnt = 0;
        tbCounter.forEach(e => {
            if (e === 1)
                cnt++;
        });
        return cnt === 6;
    }

    checkSixAny() {
        let tbCounter = Object.values(this.dices);
        let cnt = 0;
        tbCounter.forEach(e => {
            if (e === 6)
                cnt++;
        });
        return cnt === 1;
    }

    checkFiveAny() {
        let tbCounter = Object.values(this.dices);
        let cnt = 0;
        tbCounter.forEach(e => {
            if (e === 5)
                cnt++;
        });
        return cnt === 1;
    }

    checkFourAny() {
        let tbCounter = Object.values(this.dices);
        let cnt = 0;
        tbCounter.forEach(e => {
            if (e === 4)
                cnt++;
        });
        return cnt === 1;
    }

    checkThreeAny() {
        let tbCounter = Object.values(this.dices);
        //console.log(tbCounter);
        let cnt = 0;
        tbCounter.forEach(e => {
            if (e === 3)
                cnt++;
        });
        return cnt === 1;
    }

    toPoints() {
        //console.log(this);
        if (this.checkTripLet()) {
            console.log("Trip Let");
            return 2500;
        } else if (this.checkFourOfAnyNumberWithAPair() || this.checkThreePairs() || this.checkOneToSix()) {
            console.log("Any 4 with pair, 3 pairs, 1 to 6");
            return 1500;
        } else if (this.checkSixAny()) {
            console.log("Any Six");
            return 3000;
        } else if (this.checkFourAny()) {
            console.log("Any Four");
            let s = 1000;
            if (this.dices.one === 1 && this.dices.five === 0)
                return s + 100;
            else if (this.dices.one === 0 && this.dices.five === 1)
                return s + 50;
            else if (this.dices.one === 1 && this.dices.five === 5)
                return s + 150;
            else
                return s;
        } else if (this.checkFiveAny()) {
            console.log("Any Five");
            let s = 2000;
            if (this.dices.one === 1)
                return s + 100;
            else if (this.dices.five === 1)
                return s + 50;
            return s;
        } else if (this.checkThreeAny()) {
            console.log("Any Three");
            let s = 0;
            if (this.dices.one === 3) {
                s = 300;
                if (this.dices.five === 1)
                    s += 50;
                else if (this.dices.five === 2)
                    s += 100;
            } else if (this.dices.two === 3) {
                s = 200;
            } else if (this.dices.three === 3) {
                s = 300;
            } else if (this.dices.four === 3) {
                s = 400;
            } else if (this.dices.five === 3) {
                s = 500;
                if (this.dices.one === 1)
                    s += 100;
                else if (this.dices.one === 2)
                    s += 200;
            } else if (this.dices.six === 3) {
                s = 600;
            }

            if (this.dices.one === 1 && this.dices.five === 0)
                return s + 100;
            else if (this.dices.one === 2 && this.dices.five === 0)
                return s + 200;
            else if (this.dices.one === 0 && this.dices.five === 1)
                return s + 50;
            else if (this.dices.one === 0 && this.dices.five === 2)
                return s + 100;
            else if (this.dices.one === 1 && this.dices.five === 2)
                return s + 200;
            else if (this.dices.one === 2 && this.dices.five === 1)
                return s + 250;
            else if (this.dices.one === 1 && this.dices.five === 1)
                return s + 150;
            else

                // Modification.
                // if (this.dices.one === 1 || this.dices.five === 1) {
                //     return s + 100;
                // } else
                return s;
        } else {
            // if (this.dices.one === 1 && this.dices.five === 0)
            //     return 100;
            // else if (this.dices.one === 2 && this.dices.five === 0)
            //     return 200;
            // else if (this.dices.one === 0 && this.dices.five === 1)
            //     return 50;
            // else if (this.dices.one === 0 && this.dices.five === 2)
            //     return 100;
            // else if (this.dices.one === 1 && this.dices.five === 2)
            //     return 200;
            // else if (this.dices.one === 2 && this.dices.five === 1)
            //     return 250;
            // else if (this.dices.one === 1 && this.dices.five === 1)
            //     return 150;
            // else

            // Modification.
            if (this.dices.one === 1 || this.dices.five === 1) {
                return 100;
            } else
                return 0;
        }


    }
}

$(function () {
        // Declarations
        let playerNoInput = $("#playerNoInput");
        let playerNoBtn = $("#playerNoBtn");
        let playerNo = 0;
        let container = $("#container");
        let playerSet = [];
        let rollBtn = $("#rollBtn");
        let currentPlayer = 1;
        let passBtn = $("#passBtn");
        let winScore = 0;

        // Events
        playerNoBtn.click(() => takePlayerNoInput());
        rollBtn.click(() => roll());
        passBtn.click(() => pass());

        // Methods
        function isValidPlayerNo(n) {
            return n >= 2 && n <= 4;
        }

        function pass() {
            for (let i = 0; i < playerNo; i++)
                if (playerSet[i].id === currentPlayer) {
                    playerSet[i].score += playerSet[i].pointsTurn;
                    playerSet[i].points = 0;
                    playerSet[i].pointsTurn = 0;
                    nextTurn();
                    redraw();
                    break;
                }
        }

        function forcePass() {
            for (let i = 0; i < playerNo; i++)
                if (playerSet[i].id === currentPlayer) {
                    playerSet[i].points = 0;
                    playerSet[i].pointsTurn = 0;
                    if (playerSet[i].score >= 5000)
                        playerSet[i].score -= 500;
                    else if (playerSet[i].score >= 1000)
                        playerSet[i].score -= 300;
                    nextTurn();
                    redraw();
                    break;
                }
        }

        function markCurrentPlayer() {
            let id = "#player_" + currentPlayer;
            let e = $(id);
            e.css("color", "blue");
        }

        function nextTurn() {
            currentPlayer++;
            if (currentPlayer > playerNo) {
                currentPlayer = 1;
            }
        }

        function checkForWinner() {
            for (let i = 0; i < playerNo; i++) {
                if (playerSet[i].score >= winScore) {
                    alert("Player " + playerSet[i].id + " is a winner!");
                    reset();
                    break;
                }
            }
        }

        function reset() {
            playerSet = [];
            currentPlayer = 1;
            switch (playerNo) {
                case 2:
                    winScore = 10000;
                    break;
                case 3:
                    winScore = 12000;
                    break;
                case 4:
                    winScore = 14000;
                    break;
            }
            container.empty();
        }

        function setup() {
            for (let i = 1; i <= playerNo; i++) {
                let p = new Player(i);
                let str = p.toString();
                container.append(str);
                playerSet.push(p);
            }
            markCurrentPlayer();
        }

        function redraw() {
            container.empty();
            playerSet.forEach(p => {
                let str = p.toString();
                container.append(str);
            });
            markCurrentPlayer();
        }

        function roll() {
            let points = 0;
            playerSet.forEach(p => {
                if (currentPlayer === p.id) {
                    p.roll();
                    points = p.points;
                    if (p.points !== 0) {
                        p.pointsTurn += p.points;
                    }
                }
            });
            if (points === 0)
                forcePass();
            redraw();
            checkForWinner();
        }

        function takePlayerNoInput() {
            let n = parseInt(playerNoInput.val());
            if (isValidPlayerNo(n)) {
                playerNo = n;
                reset();
                setup();
            } else {
                alert("Number of player must be >= 2 and <= 4");
            }
        }

    }
)