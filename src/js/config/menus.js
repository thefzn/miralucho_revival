import gameLang from './gameLang';

export default (LANG, HEIGHT, WIDTH) => [
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
                    pos: ["center", (HEIGHT / 2) - 80],
                    text: gameLang[LANG].menus.BSoD.title,
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
                    pos: ["center", (HEIGHT / 2) + 65],
                    font: {
                        family: "Gamegirl",
                        color: "white",
                        size: "8px",
                    },
                    text: gameLang[LANG].menus.BSoD.button,
                    action(theGame, menu) {
                        theGame.reset(true);
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
            gameLang[LANG].menus.BSoD.message[0],
            gameLang[LANG].menus.BSoD.message[1],
            gameLang[LANG].menus.BSoD.message[2],
            gameLang[LANG].menus.BSoD.message[3],
            gameLang[LANG].menus.BSoD.message[4],
            gameLang[LANG].menus.BSoD.message[5],
            gameLang[LANG].menus.BSoD.message[6],
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
                    text: gameLang[LANG].menus.main.start,
                    pos: [(WIDTH / 2) - 110, HEIGHT - 100],
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
                    text: gameLang[LANG].menus.main.settings,
                    pos: [(WIDTH / 2) + 10, HEIGHT - 100],
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
        size: [WIDTH - 40, 100],
        pos: [20, 50],
        font: {
            family: "Gamegirl",
            color: "white",
            size: "10px",
        },
        text: [
            gameLang[LANG].menus.settings.skin.title,
        ],
        textPos: [20, 30],
    },
    {
        name: "setMenuLang",
        color: "#994400",
        size: [WIDTH - 40, 50],
        pos: [20, 170],
        font: {
            family: "Gamegirl",
            color: "white",
            size: "10px",
        },
        text: [
            gameLang[LANG].menus.settings.lang.title,
        ],
        textPos: [20, 30],
        buttons: [
            {
                copyOf: "btnClose",
                params: {
                    pos: [120, 10],
                    text: gameLang[LANG].menus.settings.lang.EN,
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
                    text: gameLang[LANG].menus.settings.lang.ES,
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
                    text: gameLang[LANG].menus.settings.lang.DEBUG,
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
                    text: gameLang[LANG].menus.settings.button,
                    pos: [WIDTH - 110, HEIGHT - 40],
                    action(theGame, menu) {
                        menu.anim.start("fallOut", false, () => {
                            theGame.remove("menu", menu.id);
                            if (theGame.lang !== LANG) {
                                theGame.sounds.mainBGMusic.audio.pause();
                                theGame.reset();
                                theGame.pause();
                                theGame.forceReload();
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
            gameLang[LANG].menus.settings.title,
        ],
        textPos: [20, 36],
    },
];
