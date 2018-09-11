import windowSprite from "../../img/windows.png";
import gameLang from './gameLang';

export default LANG => [
    {
        name: "little01",
        animation: "fadeIn",
        value: 10,
        size: [200, 100],
        source: windowSprite,
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
                    text: gameLang[LANG].game.windows.buttons.close,
                },
            },
        ],
    },
    {
        name: "little02",
        animation: "fadeIn",
        value: 10,
        size: [200, 100],
        source: windowSprite,
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
                    text: gameLang[LANG].game.windows.buttons.close,
                },
            },
        ],
    },
    {
        name: "little03",
        animation: "fadeIn",
        value: 10,
        size: [200, 100],
        source: windowSprite,
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
                    text: gameLang[LANG].game.windows.buttons.close,
                },
            },
        ],
    },
    {
        name: "little04",
        animation: "fadeIn",
        value: 10,
        size: [200, 100],
        source: windowSprite,
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
                    text: gameLang[LANG].game.windows.buttons.close,
                },
            },
        ],
    },
    {
        name: "little05",
        animation: "fadeIn",
        value: 10,
        size: [200, 100],
        source: windowSprite,
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
                    text: gameLang[LANG].game.windows.buttons.close,
                },
            },
        ],
    },
    {
        name: "little06",
        animation: "fadeIn",
        value: 10,
        size: [200, 100],
        source: windowSprite,
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
                    text: gameLang[LANG].game.windows.buttons.close,
                },
            },
        ],
    },
    {
        name: "little07",
        animation: "fadeIn",
        value: 10,
        size: [200, 100],
        source: windowSprite,
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
                    text: gameLang[LANG].game.windows.buttons.close,
                },
            },
        ],
    },
    {
        name: "littleError",
        animation: "fadeIn",
        value: 2,
        size: [200, 100],
        source: windowSprite,
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
                    text: gameLang[LANG].game.windows.buttons.close,
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
        source: windowSprite,
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
                    text: gameLang[LANG].game.windows.buttons.close,
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
        source: windowSprite,
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
                    text: gameLang[LANG].game.windows.buttons.close,
                },
            },
        ],
    },
    {
        name: "medium02",
        animation: "fadeIn",
        value: 0,
        size: [250, 100],
        source: windowSprite,
        sprite: [201, 101],
        font: {
            family: "Gamegirl",
            color: "black",
            size: "9px",
            align: "center",
        },
        text: [gameLang[LANG].game.windows.special.clear],
        textPos: ["center", 47],
        sound: "pop2",
        buttons: [
            {
                copyOf: "btnClose",
                params: {
                    pos: [130, 60],
                    text: gameLang[LANG].game.windows.buttons.close,
                },
            },
            {
                copyOf: "btnRight",
                params: {
                    pos: [20, 60],
                    text: gameLang[LANG].game.windows.buttons.right,
                },
            },
        ],
    },
    {
        name: "medium03",
        animation: "fadeIn",
        value: 20,
        size: [250, 100],
        source: windowSprite,
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
                    text: gameLang[LANG].game.windows.buttons.close,
                },
            },
        ],
    },
    {
        name: "medium04",
        animation: "fadeIn",
        value: 20,
        size: [250, 100],
        source: windowSprite,
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
                    text: gameLang[LANG].game.windows.buttons.close,
                },
            },
        ],
    },
    {
        name: "medium05",
        animation: "fadeIn",
        value: 20,
        size: [250, 100],
        source: windowSprite,
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
                    text: gameLang[LANG].game.windows.buttons.close,
                },
            },
        ],
    },
    {
        name: "medium06",
        animation: "fadeIn",
        value: 20,
        size: [250, 100],
        source: windowSprite,
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
                    text: gameLang[LANG].game.windows.buttons.close,
                },
            },
        ],
    },
    {
        name: "medium07",
        animation: "fadeIn",
        value: 3,
        size: [250, 100],
        source: windowSprite,
        sprite: [201, 606],
        font: {
            family: "Gamegirl",
            color: "black",
            size: "9px",
            align: "center",
        },
        text: [gameLang[LANG].game.windows.special.spawn],
        textPos: ["center", 47],
        sound: "pop2",
        buttons: [
            {
                copyOf: "btnClose",
                params: {
                    pos: [130, 60],
                    text: gameLang[LANG].game.windows.buttons.close,
                },
            },
            {
                copyOf: "btnWrong",
                params: {
                    pos: [20, 60],
                    text: gameLang[LANG].game.windows.buttons.wrong,
                },
            },
        ],
    },
    {
        name: "mediumError",
        animation: "fadeIn",
        value: 3,
        size: [250, 100],
        source: windowSprite,
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
                    text: gameLang[LANG].game.windows.buttons.close,
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
        source: windowSprite,
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
                    text: gameLang[LANG].game.windows.buttons.close,
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
        source: windowSprite,
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
                    text: gameLang[LANG].game.windows.buttons.close,
                },
            },
        ],
    },
    {
        name: "mega02",
        animation: "fadeIn",
        value: 0,
        size: [300, 100],
        source: windowSprite,
        sprite: [452, 101],
        font: {
            family: "Gamegirl",
            color: "black",
            size: "9px",
            align: "center",
        },
        text: [gameLang[LANG].game.windows.special.slowmo],
        textPos: ["center", 47],
        sound: "pop2",
        buttons: [
            {
                copyOf: "btnClose",
                params: {
                    pos: [130, 60],
                    text: gameLang[LANG].game.windows.buttons.close,
                },
            },
            {
                copyOf: "btnActivate",
                params: {
                    pos: [20, 60],
                    text: gameLang[LANG].game.windows.buttons.activate,
                },
            },
        ],
    },
    {
        name: "mega03",
        animation: "fadeIn",
        value: 30,
        size: [300, 100],
        source: windowSprite,
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
                    text: gameLang[LANG].game.windows.buttons.close,
                },
            },
        ],
    },
    {
        name: "mega04",
        animation: "fadeIn",
        value: 30,
        size: [300, 100],
        source: windowSprite,
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
                    text: gameLang[LANG].game.windows.buttons.close,
                },
            },
        ],
    },
    {
        name: "mega05",
        animation: "fadeIn",
        value: 30,
        size: [300, 100],
        source: windowSprite,
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
                    text: gameLang[LANG].game.windows.buttons.close,
                },
            },
        ],
    },
    {
        name: "mega06",
        animation: "fadeIn",
        value: 30,
        size: [300, 100],
        source: windowSprite,
        sprite: [452, 505],
        font: {
            family: "Gamegirl",
            color: "black",
            size: "9px",
            align: "center",
        },
        text: [gameLang[LANG].game.windows.special.speedup],
        textPos: ["center", 47],
        sound: "pop2",
        buttons: [
            {
                copyOf: "btnClose",
                params: {
                    pos: [155, 60],
                    text: gameLang[LANG].game.windows.buttons.close,
                },
            },
            {
                copyOf: "btnDisable",
                params: {
                    pos: [45, 60],
                    text: gameLang[LANG].game.windows.buttons.disable,
                },
            },
        ],
    },
    {
        name: "mega07",
        animation: "fadeIn",
        value: 30,
        size: [300, 100],
        source: windowSprite,
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
                    text: gameLang[LANG].game.windows.buttons.close,
                },
            },
        ],
    },
    {
        name: "megaError",
        animation: "fadeIn",
        value: 5,
        size: [300, 100],
        source: windowSprite,
        sprite: [452, 303],
        font: {
            family: "Gamegirl",
            color: "black",
            size: "9px",
            align: "center",
        },
        text: [gameLang[LANG].game.windows.special.megaFail],
        textPos: [187, 47],
        sound: "pop2",
        backgrounds: [
            { copyOf: "icnError", pos: [13, 28] },
        ],
        buttons: [
            {
                copyOf: "btnClose",
                params: {
                    text: gameLang[LANG].game.windows.buttons.close,
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
        source: windowSprite,
        sprite: [452, 303],
        font: {
            family: "Gamegirl",
            color: "black",
            size: "9px",
            align: "center",
        },
        text: [gameLang[LANG].game.windows.special.megaWin],
        textPos: [187, 47],
        sound: "pop2",
        backgrounds: [
            { copyOf: "icnAlert" },
        ],
        buttons: [
            {
                copyOf: "btnClose",
                params: {
                    text: gameLang[LANG].game.windows.buttons.close,
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
        source: windowSprite,
        sprite: [452, 707],
        font: {
            family: "Gamegirl",
            color: "black",
            size: "9px",
            align: "center",
        },
        text: [gameLang[LANG].game.windows.special.bigMortal],
        textPos: [187, 47],
        sound: "pop2",
        backgrounds: [
            { copyOf: "icnMortal" },
        ],
        buttons: [
            {
                copyOf: "btnDeath",
                params: {
                    text: gameLang[LANG].game.windows.buttons.death,
                    pos: [195, 60],
                },
            },
            {
                copyOf: "btnGray",
                params: {
                    text: gameLang[LANG].game.windows.buttons.safe,
                    pos: [85, 60],
                },
            },
        ],
    },
];
