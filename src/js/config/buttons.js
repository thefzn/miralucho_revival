import buttonSprite from "../../img/button.png";

export default [
    {
        name: "btnClose",
        background: "btnRed",
        font: {
            family: "Gamegirl",
            color: "white",
            align: "center",
            stroke: "black",
            size: "10px",
        },
        pos: ["center", 60],
        sound: "pop",
        action(theGame, menu) {
            if (!this.dying) {
                this.dying = true;
                menu.anim.stop();
                theGame.addRam(-1);
                menu.anim.start("fadeOut", false, () => {
                    theGame.removeWindow(menu);
                });
            }
        },
    },
    {
        name: "btnWrong",
        source: buttonSprite,
        sprite: {
            stand: [202, 0],
            press: [202, 33],
        },
        font: {
            family: "Gamegirl",
            color: "white",
            align: "center",
            stroke: "black",
            size: "10px",
        },
        size: [100, 32],
        pos: ["center", 60],
        sound: "pop",
        action(theGame, menu) {
            if (!this.dying) {
                this.dying = true;
                menu.anim.stop();
                menu.anim.start("fadeOut", false, () => {
                    theGame.removeWindow(menu);
                    theGame.loadWindow();
                    theGame.loadWindow();
                    theGame.loadWindow();
                });
            }
        },
    },
    {
        name: "btnRight",
        source: buttonSprite,
        sprite: {
            stand: [303, 0],
            press: [303, 33],
        },
        font: {
            family: "Gamegirl",
            color: "white",
            align: "center",
            stroke: "black",
            size: "10px",
        },
        size: [100, 32],
        pos: ["center", 60],
        sound: "pop",
        action(theGame, menu) {
            if (!this.dying) {
                this.dying = true;
                menu.anim.stop();
                theGame.addRam(-3);
                theGame.addScore(55);
                menu.anim.start("fadeOut", false, () => {
                    theGame.removeWindow(menu);
                });
            }
        },
    },
    {
        name: "btnActivate",
        source: buttonSprite,
        sprite: {
            stand: [101, 0],
            press: [101, 33],
        },
        font: {
            family: "Gamegirl",
            color: "white",
            align: "center",
            stroke: "black",
            size: "10px",
        },
        size: [100, 32],
        pos: ["center", 60],
        sound: "pop",
        action(theGame, menu) {
            if (!this.dying) {
                this.dying = true;
                menu.anim.stop();

                theGame.addRam(-1);
                theGame.addScore(83);
                theGame.changeSpeed(theGame.speed * 2);
                setTimeout(() => { theGame.changeSpeed(Math.round(theGame.speed / 2)); }, 3000);
                menu.anim.start("fadeOut", false, () => {
                    theGame.removeWindow(menu);
                });
            }
        },
    },
    {
        name: "btnDisable",
        source: buttonSprite,
        sprite: {
            stand: [202, 0],
            press: [202, 33],
        },
        font: {
            family: "Gamegirl",
            color: "white",
            align: "center",
            stroke: "black",
            size: "10px",
        },
        size: [100, 32],
        pos: ["center", 60],
        sound: "pop",
        action(theGame, menu) {
            if (!this.dying) {
                this.dying = true;
                menu.anim.stop();
                theGame.addRam(-1);
                theGame.addScore(menu.value);
                menu.anim.start("fadeOut", false, () => {
                    theGame.removeWindow(menu);
                });
            }
        },
    },
    {
        name: "btnDeath",
        source: buttonSprite,
        sprite: {
            stand: [0, 0],
            press: [0, 33],
        },
        font: {
            family: "Gamegirl",
            color: "white",
            align: "center",
            stroke: "black",
            size: "10px",
        },
        size: [100, 32],
        pos: ["center", 60],
        sound: "pop",
        action(theGame, menu) {
            if (!this.dying) {
                this.dying = true;
                menu.anim.start("fadeOut", false, () => {
                    theGame.onGameOver();
                });
            }
        },
    },
    {
        name: "btnGray",
        source: buttonSprite,
        sprite: {
            stand: [404, 0],
            press: [404, 33],
        },
        font: {
            family: "Gamegirl",
            color: "white",
            align: "center",
            stroke: "black",
            size: "10px",
        },
        size: [100, 32],
        pos: ["center", 60],
        sound: "pop",
        action(theGame, menu) {
            if (!this.dying) {
                this.dying = true;
                menu.anim.stop();
                theGame.addRam(-1);
                theGame.addScore(menu.value);
                menu.anim.start("fadeOut", false, () => {
                    theGame.removeWindow(menu);
                });
            }
        },
    },
    {
        name: "empty",
        size: [86, 20],
        pos: "center",
        action(theGame) {
            return theGame;
        },
    },
];
