import bgWallpaper from '../../img/wallpaper.jpg';
import icons from '../../img/icons.png';
import buttons from '../../img/button.png';

export default [
    {
        name: "empty",
    },
    {
        name: "mainBack",
        source: bgWallpaper,
        fixed: true,
        size: [1280, 720],
    },
    {
        name: "icnError",
        source: icons,
        size: [66, 63],
    },
    {
        name: "iconAlert",
        source: icons,
        size: [69, 63],
        sprite: [75, 0],
    },
    {
        name: "icnMortal",
        source: icons,
        size: [66, 63],
        sprite: [153, 0],
    },
    {
        name: "btnRed",
        size: [100, 32],
        source: buttons,
        sprite: {
            stand: [0, 0],
            press: [0, 33],
        },
    },
    {
        name: "btnYellow",
        source: buttons,
        size: [100, 32],
        sprite: {
            stand: [0, 0],
            press: [0, 33],
        },
    },
];
