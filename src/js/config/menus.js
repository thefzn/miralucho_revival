import gameLang from './gameLang';

export default (LANG, HEIGHT, WIDTH) => [
    {
        name: "BSOD",
        color: "blue",
        font: {
            family: "Gamegirl",
            color: "white",
            size: "8px",
        },
        children: {
            text: {
                content: gameLang[LANG].menus.BSoD.message,
            },
            button: [
                {
                    copyOf: "empty",
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
                {
                    copyOf: "empty",
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
            ],
        },
    },
    {
        name: "xMainMenu",
        animation: "fadeIn",
        color: "grey",
        children: {
            button: [
                {
                    copyOf: "btnClose",
                    pos: [(WIDTH / 2) - 110, HEIGHT - 100],
                    action(theGame, menu) {
                        theGame.reset(true);
                        menu.anim.start("fadeOut", false, () => {
                            theGame.remove("menu", menu.id);
                        });
                    },
                    children: { text: gameLang[LANG].menus.main.start },
                },
                {
                    copyOf: "btnClose",
                    pos: [(WIDTH / 2) + 10, HEIGHT - 100],
                    action(theGame) { theGame.add("menu", "settingsMenu"); },
                    children: { text: gameLang[LANG].menus.main.settings },
                },
            ],
        },
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
        children: {
            text: gameLang[LANG].menus.settings.skin.title,
        },
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
        textPos: [20, 30],
        children: {
            text: gameLang[LANG].menus.settings.lang.title,
            button: [
                {
                    copyOf: "btnClose",
                    pos: [120, 10],
                    action(theGame) {
                        theGame.setLang("EN");
                    },
                    children: {
                        text: gameLang[LANG].menus.settings.lang.EN,
                    },
                },
                {
                    copyOf: "btnClose",
                    pos: [240, 10],
                    fixed: false,
                    action(theGame) {
                        theGame.setLang("ES");
                    },
                    children: {
                        text: gameLang[LANG].menus.settings.lang.ES,
                    },
                },
                {
                    copyOf: "btnClose",
                    pos: [360, 10],
                    fixed: false,
                    action(theGame) {
                        theGame.setLang("DEBUG");
                    },
                    children: {
                        text: gameLang[LANG].menus.settings.lang.DEBUG,
                    },
                },
            ],
        },
    },
    {
        name: "settingsMenu",
        animation: "bounce",
        color: "#993300",
        font: {
            family: "Gamegirl",
            color: "white",
            size: "16px",
        },
        textPos: [20, 36],
        children: {
            text: gameLang[LANG].menus.settings.title,
            button: [
                {
                    copyOf: "btnClose",
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
                    children: {
                        text: gameLang[LANG].menus.settings.button,
                    },
                },
            ],
            menu: [
                { copyOf: "setMenuSkin" },
                { copyOf: "setMenuLang" },
            ],
        },
    },
];
