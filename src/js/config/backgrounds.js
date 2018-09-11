import bgWallpaper from '../../img/wallpaper.jpg';
import icons from '../../img/icons.png';

export default [
    {
        name: "empty",
    },
    {
        name: "mainBack",
        source: bgWallpaper,
        pos: "center",
        fixed: true,
        size: [1280, 720],
    },
    {
        name: "icnError",
        source: icons,
        pos: [8, 28],
        size: [66, 63],
    },
    {
        name: "iconAlert",
        source: icons,
        pos: [8, 28],
        size: [69, 63],
        sprite: [75, 0],
    },
    {
        name: "icnMortal",
        source: icons,
        pos: [8, 28],
        size: [66, 63],
        sprite: [153, 0],
    },
];
