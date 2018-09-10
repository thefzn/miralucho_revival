import FznGame from './classes/FznGame';
import gameLang from './tools/Lang';
import '../css/styles.css';

const LANG = "EN";

function loadGame() {
    const element = document.createElement('canvas');
    let game = null;

    element.id = 'board';
    element.width = '100%';
    element.height = '100%';
    document.body.appendChild(element);

    game = new FznGame("board");

    // Add language
    game.lang = LANG;

    // Backgrounds
    game.define("background", [
        { name: "empty" },
        {
            name: "mainBack", source: "IMG/wallpaper.jpg", pos: "center", fixed: true, size: [1280, 720],
        },
        {
            name: "icnError", source: "IMG/icons.png", pos: [8, 28], size: [66, 63],
        },
        {
            name: "icnAlert", source: "IMG/icons.png", pos: [8, 28], size: [69, 63], sprite: [75, 0],
        },
        {
            name: "icnMortal", source: "IMG/icons.png", pos: [8, 28], size: [66, 63], sprite: [153, 0],
        },
    ]);

    // Music and sounds
    game.define("sound", [
        // { name: "bgMusic", source: "SFX/Kalimba.mp3"},
        { name: "pop", source: "SFX/pop01.mp3" },
        { name: "pop2", source: "SFX/drop.mp3" },
    ]);

    // Overlays (like backgrounds but on the front)
    game.define("overlay", [
        { name: "levelBar", source: "IMG/bar01.png", repeat: "repeat-x" },
        { name: "levelBarBack", source: "IMG/levelMeterBack.png", size: [167, 38] },
        { name: "ramBar", source: "IMG/bar02.png", repeat: "repeat-y" },
        { name: "ramBarBack", source: "IMG/ramMeterBack.png", size: [40, 181] },
        { name: "empty", fixed: true },
    ]);

    // Buttons
    game.define("button", [
        {
            name: "btnClose",
            source: "IMG/button.png",
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
            source: "IMG/button.png",
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
                        theGame.loadWindow("commonWindow");
                        theGame.loadWindow("commonWindow");
                        theGame.loadWindow("commonWindow");
                    });
                }
            },
        },
        {
            name: "btnRight",
            source: "IMG/button.png",
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
            source: "IMG/button.png",
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
                        game.removeWindow(menu);
                    });
                }
            },
        },
        {
            name: "btnDisable",
            source: "IMG/button.png",
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
            source: "IMG/button.png",
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
            source: "IMG/button.png",
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
    ]);

    // Game Windows
    game.define("window", [
        {
            name: "little01",
            animation: "fadeIn",
            value: 10,
            size: [200, 100],
            source: "IMG/windows.png",
            sprite: [0, 0],
            font: {
                family: "Gamegirl",
                color: "black",
                size: "9px",
                align: "center",
            },
            textPos: ["center", 47],
            sound: "pop2",
            buttons: [
                {
                    copyOf: "btnClose",
                    params: {
                        text: gameLang[game.lang].game.windows.buttons.close,
                    },
                },
            ],
        },
        {
            name: "little02",
            animation: "fadeIn",
            value: 10,
            size: [200, 100],
            source: "IMG/windows.png",
            sprite: [0, 101],
            font: {
                family: "Gamegirl",
                color: "black",
                size: "9px",
                align: "center",
            },
            textPos: ["center", 47],
            sound: "pop2",
            buttons: [
                {
                    copyOf: "btnClose",
                    params: {
                        text: gameLang[game.lang].game.windows.buttons.close,
                    },
                },
            ],
        },
        {
            name: "little03",
            animation: "fadeIn",
            value: 10,
            size: [200, 100],
            source: "IMG/windows.png",
            sprite: [0, 202],
            font: {
                family: "Gamegirl",
                color: "black",
                size: "9px",
                align: "center",
            },
            textPos: ["center", 47],
            sound: "pop2",
            buttons: [
                {
                    copyOf: "btnClose",
                    params: {
                        text: gameLang[game.lang].game.windows.buttons.close,
                    },
                },
            ],
        },
        {
            name: "little04",
            animation: "fadeIn",
            value: 10,
            size: [200, 100],
            source: "IMG/windows.png",
            sprite: [0, 303],
            font: {
                family: "Gamegirl",
                color: "black",
                size: "9px",
                align: "center",
            },
            textPos: ["center", 47],
            sound: "pop2",
            buttons: [
                {
                    copyOf: "btnClose",
                    params: {
                        text: gameLang[game.lang].game.windows.buttons.close,
                    },
                },
            ],
        },
        {
            name: "little05",
            animation: "fadeIn",
            value: 10,
            size: [200, 100],
            source: "IMG/windows.png",
            sprite: [0, 404],
            font: {
                family: "Gamegirl",
                color: "black",
                size: "9px",
                align: "center",
            },
            textPos: ["center", 47],
            sound: "pop2",
            buttons: [
                {
                    copyOf: "btnClose",
                    params: {
                        text: gameLang[game.lang].game.windows.buttons.close,
                    },
                },
            ],
        },
        {
            name: "little06",
            animation: "fadeIn",
            value: 10,
            size: [200, 100],
            source: "IMG/windows.png",
            sprite: [0, 505],
            font: {
                family: "Gamegirl",
                color: "black",
                size: "9px",
                align: "center",
            },
            textPos: ["center", 47],
            sound: "pop2",
            buttons: [
                {
                    copyOf: "btnClose",
                    params: {
                        text: gameLang[game.lang].game.windows.buttons.close,
                    },
                },
            ],
        },
        {
            name: "little07",
            animation: "fadeIn",
            value: 10,
            size: [200, 100],
            source: "IMG/windows.png",
            sprite: [0, 606],
            font: {
                family: "Gamegirl",
                color: "black",
                size: "9px",
                align: "center",
            },
            textPos: ["center", 47],
            sound: "pop2",
            buttons: [
                {
                    copyOf: "btnClose",
                    params: {
                        text: gameLang[game.lang].game.windows.buttons.close,
                    },
                },
            ],
        },
        {
            name: "littleError",
            animation: "fadeIn",
            value: 2,
            size: [200, 100],
            source: "IMG/windows.png",
            sprite: [0, 303],
            font: {
                family: "Gamegirl",
                color: "black",
                size: "9px",
                align: "left",
            },
            textPos: [82, 47],
            sound: "pop2",
            backgrounds: [
                { copyOf: "icnError" },
            ],
            buttons: [
                {
                    copyOf: "btnClose",
                    params: {
                        text: gameLang[game.lang].game.windows.buttons.close,
                        pos: [80, 60],
                    },
                },
            ],
        },
        {
            name: "littleAlert",
            animation: "fadeIn",
            value: 30,
            size: [200, 100],
            source: "IMG/windows.png",
            sprite: [0, 303],
            font: {
                family: "Gamegirl",
                color: "black",
                size: "9px",
                align: "left",
            },
            textPos: [84, 47],
            sound: "pop2",
            backgrounds: [
                { copyOf: "icnAlert" },
            ],
            buttons: [
                {
                    copyOf: "btnClose",
                    params: {
                        text: gameLang[game.lang].game.windows.buttons.close,
                        pos: [82, 60],
                    },
                },
            ],
        },
        {
            name: "medium01",
            animation: "fadeIn",
            value: 20,
            size: [250, 100],
            source: "IMG/windows.png",
            sprite: [201, 0],
            font: {
                family: "Gamegirl",
                color: "black",
                size: "9px",
                align: "center",
            },
            textPos: ["center", 47],
            sound: "pop2",
            buttons: [
                {
                    copyOf: "btnClose",
                    params: {
                        text: gameLang[game.lang].game.windows.buttons.close,
                    },
                },
            ],
        },
        {
            name: "medium02",
            animation: "fadeIn",
            value: 0,
            size: [250, 100],
            source: "IMG/windows.png",
            sprite: [201, 101],
            font: {
                family: "Gamegirl",
                color: "black",
                size: "9px",
                align: "center",
            },
            text: [gameLang[game.lang].game.windows.special.clear],
            textPos: ["center", 47],
            sound: "pop2",
            buttons: [
                {
                    copyOf: "btnClose",
                    params: {
                        pos: [130, 60],
                        text: gameLang[game.lang].game.windows.buttons.close,
                    },
                },
                {
                    copyOf: "btnRight",
                    params: {
                        pos: [20, 60],
                        text: gameLang[game.lang].game.windows.buttons.right,
                    },
                },
            ],
        },
        {
            name: "medium03",
            animation: "fadeIn",
            value: 20,
            size: [250, 100],
            source: "IMG/windows.png",
            sprite: [201, 202],
            font: {
                family: "Gamegirl",
                color: "black",
                size: "9px",
                align: "center",
            },
            textPos: ["center", 47],
            sound: "pop2",
            buttons: [
                {
                    copyOf: "btnClose",
                    params: {
                        text: gameLang[game.lang].game.windows.buttons.close,
                    },
                },
            ],
        },
        {
            name: "medium04",
            animation: "fadeIn",
            value: 20,
            size: [250, 100],
            source: "IMG/windows.png",
            sprite: [201, 303],
            font: {
                family: "Gamegirl",
                color: "black",
                size: "9px",
                align: "center",
            },
            textPos: ["center", 47],
            sound: "pop2",
            buttons: [
                {
                    copyOf: "btnClose",
                    params: {
                        text: gameLang[game.lang].game.windows.buttons.close,
                    },
                },
            ],
        },
        {
            name: "medium05",
            animation: "fadeIn",
            value: 20,
            size: [250, 100],
            source: "IMG/windows.png",
            sprite: [201, 404],
            font: {
                family: "Gamegirl",
                color: "black",
                size: "9px",
                align: "center",
            },
            textPos: ["center", 47],
            sound: "pop2",
            buttons: [
                {
                    copyOf: "btnClose",
                    params: {
                        text: gameLang[game.lang].game.windows.buttons.close,
                    },
                },
            ],
        },
        {
            name: "medium06",
            animation: "fadeIn",
            value: 20,
            size: [250, 100],
            source: "IMG/windows.png",
            sprite: [201, 505],
            font: {
                family: "Gamegirl",
                color: "black",
                size: "9px",
                align: "center",
            },
            textPos: ["center", 47],
            sound: "pop2",
            buttons: [
                {
                    copyOf: "btnClose",
                    params: {
                        text: gameLang[game.lang].game.windows.buttons.close,
                    },
                },
            ],
        },
        {
            name: "medium07",
            animation: "fadeIn",
            value: 3,
            size: [250, 100],
            source: "IMG/windows.png",
            sprite: [201, 606],
            font: {
                family: "Gamegirl",
                color: "black",
                size: "9px",
                align: "center",
            },
            text: [gameLang[game.lang].game.windows.special.spawn],
            textPos: ["center", 47],
            sound: "pop2",
            buttons: [
                {
                    copyOf: "btnClose",
                    params: {
                        pos: [130, 60],
                        text: gameLang[game.lang].game.windows.buttons.close,
                    },
                },
                {
                    copyOf: "btnWrong",
                    params: {
                        pos: [20, 60],
                        text: gameLang[game.lang].game.windows.buttons.wrong,
                    },
                },
            ],
        },
        {
            name: "mediumError",
            animation: "fadeIn",
            value: 3,
            size: [250, 100],
            source: "IMG/windows.png",
            sprite: [201, 303],
            font: {
                family: "Gamegirl",
                color: "black",
                size: "9px",
                align: "center",
            },
            textPos: [162, 47],
            sound: "pop2",
            backgrounds: [
                { copyOf: "icnError" },
            ],
            buttons: [
                {
                    copyOf: "btnClose",
                    params: {
                        text: gameLang[game.lang].game.windows.buttons.close,
                        pos: [112, 60],
                    },
                },
            ],
        },
        {
            name: "mediumAlert",
            animation: "fadeIn",
            value: 55,
            size: [250, 100],
            source: "IMG/windows.png",
            sprite: [201, 303],
            font: {
                family: "Gamegirl",
                color: "black",
                size: "9px",
                align: "center",
            },
            textPos: [162, 47],
            sound: "pop2",
            backgrounds: [
                { copyOf: "icnAlert" },
            ],
            buttons: [
                {
                    copyOf: "btnClose",
                    params: {
                        text: gameLang[game.lang].game.windows.buttons.close,
                        pos: [112, 60],
                    },
                },
            ],
        },
        {
            name: "mega01",
            animation: "fadeIn",
            value: 30,
            size: [300, 100],
            source: "IMG/windows.png",
            sprite: [452, 0],
            font: {
                family: "Gamegirl",
                color: "black",
                size: "9px",
                align: "center",
            },
            textPos: ["center", 47],
            sound: "pop2",
            buttons: [
                {
                    copyOf: "btnClose",
                    params: {
                        text: gameLang[game.lang].game.windows.buttons.close,
                    },
                },
            ],
        },
        {
            name: "mega02",
            animation: "fadeIn",
            value: 0,
            size: [300, 100],
            source: "IMG/windows.png",
            sprite: [452, 101],
            font: {
                family: "Gamegirl",
                color: "black",
                size: "9px",
                align: "center",
            },
            text: [gameLang[game.lang].game.windows.special.slowmo],
            textPos: ["center", 47],
            sound: "pop2",
            buttons: [
                {
                    copyOf: "btnClose",
                    params: {
                        pos: [130, 60],
                        text: gameLang[game.lang].game.windows.buttons.close,
                    },
                },
                {
                    copyOf: "btnActivate",
                    params: {
                        pos: [20, 60],
                        text: gameLang[game.lang].game.windows.buttons.activate,
                    },
                },
            ],
        },
        {
            name: "mega03",
            animation: "fadeIn",
            value: 30,
            size: [300, 100],
            source: "IMG/windows.png",
            sprite: [452, 202],
            font: {
                family: "Gamegirl",
                color: "black",
                size: "9px",
                align: "center",
            },
            textPos: ["center", 47],
            sound: "pop2",
            buttons: [
                {
                    copyOf: "btnClose",
                    params: {
                        text: gameLang[game.lang].game.windows.buttons.close,
                    },
                },
            ],
        },
        {
            name: "mega04",
            animation: "fadeIn",
            value: 30,
            size: [300, 100],
            source: "IMG/windows.png",
            sprite: [452, 303],
            font: {
                family: "Gamegirl",
                color: "black",
                size: "9px",
                align: "center",
            },
            textPos: ["center", 47],
            sound: "pop2",
            buttons: [
                {
                    copyOf: "btnClose",
                    params: {
                        text: gameLang[game.lang].game.windows.buttons.close,
                    },
                },
            ],
        },
        {
            name: "mega05",
            animation: "fadeIn",
            value: 30,
            size: [300, 100],
            source: "IMG/windows.png",
            sprite: [452, 404],
            font: {
                family: "Gamegirl",
                color: "black",
                size: "9px",
                align: "center",
            },
            textPos: ["center", 47],
            sound: "pop2",
            buttons: [
                {
                    copyOf: "btnClose",
                    params: {
                        text: gameLang[game.lang].game.windows.buttons.close,
                    },
                },
            ],
        },
        {
            name: "mega06",
            animation: "fadeIn",
            value: 30,
            size: [300, 100],
            source: "IMG/windows.png",
            sprite: [452, 505],
            font: {
                family: "Gamegirl",
                color: "black",
                size: "9px",
                align: "center",
            },
            text: [gameLang[game.lang].game.windows.special.speedup],
            textPos: ["center", 47],
            sound: "pop2",
            buttons: [
                {
                    copyOf: "btnClose",
                    params: {
                        pos: [155, 60],
                        text: gameLang[game.lang].game.windows.buttons.close,
                    },
                },
                {
                    copyOf: "btnDisable",
                    params: {
                        pos: [45, 60],
                        text: gameLang[game.lang].game.windows.buttons.disable,
                    },
                },
            ],
        },
        {
            name: "mega07",
            animation: "fadeIn",
            value: 30,
            size: [300, 100],
            source: "IMG/windows.png",
            sprite: [452, 606],
            font: {
                family: "Gamegirl",
                color: "black",
                size: "9px",
                align: "center",
            },
            textPos: ["center", 47],
            sound: "pop2",
            buttons: [
                {
                    copyOf: "btnClose",
                    params: {
                        text: gameLang[game.lang].game.windows.buttons.close,
                    },
                },
            ],
        },
        {
            name: "megaError",
            animation: "fadeIn",
            value: 5,
            size: [300, 100],
            source: "IMG/windows.png",
            sprite: [452, 303],
            font: {
                family: "Gamegirl",
                color: "black",
                size: "9px",
                align: "center",
            },
            text: [gameLang[game.lang].game.windows.special.megaFail],
            textPos: [187, 47],
            sound: "pop2",
            backgrounds: [
                { copyOf: "icnError", pos: [13, 28] },
            ],
            buttons: [
                {
                    copyOf: "btnClose",
                    params: {
                        text: gameLang[game.lang].game.windows.buttons.close,
                        pos: [137, 60],
                    },
                },
            ],
        },
        {
            name: "megaAlert",
            animation: "fadeIn",
            value: 80,
            size: [300, 100],
            source: "IMG/windows.png",
            sprite: [452, 303],
            font: {
                family: "Gamegirl",
                color: "black",
                size: "9px",
                align: "center",
            },
            text: [gameLang[game.lang].game.windows.special.megaWin],
            textPos: [187, 47],
            sound: "pop2",
            backgrounds: [
                { copyOf: "icnAlert" },
            ],
            buttons: [
                {
                    copyOf: "btnClose",
                    params: {
                        text: gameLang[game.lang].game.windows.buttons.close,
                        pos: [137, 60],
                    },
                },
            ],
        },
        {
            name: "megaDeath",
            animation: "fadeIn",
            value: 150,
            size: [300, 100],
            source: "IMG/windows.png",
            sprite: [452, 707],
            font: {
                family: "Gamegirl",
                color: "black",
                size: "9px",
                align: "center",
            },
            text: [gameLang[game.lang].game.windows.special.bigMortal],
            textPos: [187, 47],
            sound: "pop2",
            backgrounds: [
                { copyOf: "icnMortal" },
            ],
            buttons: [
                {
                    copyOf: "btnDeath",
                    params: {
                        text: gameLang[game.lang].game.windows.buttons.death,
                        pos: [195, 60],
                    },
                },
                {
                    copyOf: "btnGray",
                    params: {
                        text: gameLang[game.lang].game.windows.buttons.safe,
                        pos: [85, 60],
                    },
                },
            ],
        },
    ]);

    // Menus
    game.define("menu", [
        {
            name: "BSOD",
            color: "blue",
            buttons: [
                {
                    copyOf: "empty",
                    params: {
                        color: "white",
                        font: {
                            family: "Gamegirl",
                            color: "blue",
                            size: "9px",
                        },
                        pos: ["center", (game.cnv.height / 2) - 80],
                        text: gameLang[game.lang].menus.BSoD.title,
                        action(theGame, menu) {
                            let mMenu = null;
                            theGame.reset();
                            mMenu = theGame.add("menu", "xMainMenu");
                            mMenu.anim.callback = () => {
                                theGame.remove("menu", menu.id);
                            };
                        },
                    },
                },
                {
                    copyOf: "empty",
                    params: {
                        size: [250, 22],
                        pos: ["center", (game.cnv.height / 2) + 65],
                        font: {
                            family: "Gamegirl",
                            color: "white",
                            size: "8px",
                        },
                        text: gameLang[game.lang].menus.BSoD.button,
                        action(theGame, menu) {
                            game.reset(true);
                            menu.anim.start("fadeOut", false, () => {
                                theGame.remove("menu", menu.id);
                            });
                        },
                    },
                },
            ],
            font: {
                family: "Gamegirl",
                color: "white",
                size: "8px",
            },
            text: [
                gameLang[game.lang].menus.BSoD.message[0],
                gameLang[game.lang].menus.BSoD.message[1],
                gameLang[game.lang].menus.BSoD.message[2],
                gameLang[game.lang].menus.BSoD.message[3],
                gameLang[game.lang].menus.BSoD.message[4],
                gameLang[game.lang].menus.BSoD.message[5],
                gameLang[game.lang].menus.BSoD.message[6],
            ],
        },
        {
            name: "xMainMenu",
            animation: "fadeIn",
            color: "grey",
            buttons: [
                {
                    copyOf: "btnClose",
                    params: {
                        text: gameLang[game.lang].menus.main.start,
                        pos: [(game.cnv.width / 2) - 110, game.cnv.height - 100],
                        action(theGame, menu) {
                            theGame.reset(true);
                            menu.anim.start("fadeOut", false, () => {
                                theGame.remove("menu", menu.id);
                            });
                        },
                    },
                },
                {
                    copyOf: "btnClose",
                    params: {
                        text: gameLang[game.lang].menus.main.settings,
                        pos: [(game.cnv.width / 2) + 10, game.cnv.height - 100],
                        action(theGame) {
                            theGame.add("menu", "settingsMenu");
                        },
                    },
                },
            ],
        },
        {
            name: "setMenuSkin",
            color: "#994400",
            size: [game.cnv.width - 40, 100],
            pos: [20, 50],
            font: {
                family: "Gamegirl",
                color: "white",
                size: "10px",
            },
            text: [
                gameLang[game.lang].menus.settings.skin.title,
            ],
            textPos: [20, 30],
        },
        {
            name: "setMenuLang",
            color: "#994400",
            size: [game.cnv.width - 40, 50],
            pos: [20, 170],
            font: {
                family: "Gamegirl",
                color: "white",
                size: "10px",
            },
            text: [
                gameLang[game.lang].menus.settings.lang.title,
            ],
            textPos: [20, 30],
            buttons: [
                {
                    copyOf: "btnClose",
                    params: {
                        pos: [120, 10],
                        text: gameLang[game.lang].menus.settings.lang.EN,
                        action(theGame) {
                            theGame.setLang("EN");
                        },
                    },
                },
                {
                    copyOf: "btnClose",
                    params: {
                        pos: [240, 10],
                        fixed: false,
                        text: gameLang[game.lang].menus.settings.lang.ES,
                        action(theGame) {
                            theGame.setLang("ES");
                        },
                    },
                },
                {
                    copyOf: "btnClose",
                    params: {
                        pos: [360, 10],
                        fixed: false,
                        text: gameLang[game.lang].menus.settings.lang.DEBUG,
                        action(theGame) {
                            theGame.setLang("DEBUG");
                        },
                    },
                },
            ],
        },
        {
            name: "settingsMenu",
            animation: "bounce",
            color: "#993300",
            buttons: [
                {
                    copyOf: "btnClose",
                    params: {
                        text: gameLang[game.lang].menus.settings.button,
                        pos: [game.cnv.width - 110, game.cnv.height - 40],
                        action(theGame, menu) {
                            menu.anim.start("fallOut", false, () => {
                                theGame.remove("menu", menu.id);
                                if (theGame.lang !== LANG) {
                                    theGame.sounds.mainBGMusic.audio.pause();
                                    theGame.reset();
                                    theGame.pause();
                                    loadGame();
                                }
                            });
                        },
                    },
                },
            ],
            menus: [
                { copyOf: "setMenuSkin" },
                { copyOf: "setMenuLang" },
            ],
            font: {
                family: "Gamegirl",
                color: "white",
                size: "16px",
            },
            text: [
                gameLang[game.lang].menus.settings.title,
            ],
            textPos: [20, 36],
        },
    ]);

    game.onLoad = (theGame) => {
        // const music;
        theGame.add("menu", "xMainMenu");
        // music = theGame.add("sound","bgMusic","mainBGMusic");
        // music.audio.play();
        // music.audio.volume = 0.1;
        // music.audio.loop=true;
    };

    game.load();
}

window.addEventListener("load", loadGame);
