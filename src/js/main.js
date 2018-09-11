import FznGame from './classes/FznGame';

import '../css/styles.css';

// Cofiguration
import configProvider from './config';

(function loadGame() {
    const element = document.createElement('canvas');
    let game = null;

    element.id = 'board';
    element.width = '100%';
    element.height = '100%';
    document.body.appendChild(element);

    game = new FznGame("board");

    const LANG = "EN";

    // Add language
    game.lang = LANG;

    const HEIGHT = game.cnv.height;
    const WIDTH = game.cnv.width;
    const CONFIG = configProvider(LANG, HEIGHT, WIDTH);

    // Backgrounds
    game.define("background", CONFIG.backgrounds);

    // Music and sounds
    game.define("sound", CONFIG.sounds);

    // Overlays (like backgrounds but on the front)
    game.define("overlay", CONFIG.overlays);

    // Buttons
    game.define("button", CONFIG.buttons);

    // Game Windows
    game.define("window", CONFIG.windows);

    // Menus
    game.define("menu", CONFIG.menus);

    game.onLoad = (theGame) => {
        // const music;
        console.log('Loaded');
        theGame.add("menu", "xMainMenu");
        // music = theGame.add("sound","bgMusic","mainBGMusic");
        // music.audio.play();
        // music.audio.volume = 0.1;
        // music.audio.loop=true;
    };

    game.load();
}());

// window.addEventListener("load", loadGame);
