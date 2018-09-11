import backgrounds from './backgrounds';
import buttons from './buttons';
import menus from './menus';
import overlays from './overlays';
import sounds from './sounds';
import windows from './windows';

export default (LANG, HEIGHT, WIDTH) => ({
    backgrounds,
    sounds,
    overlays,
    buttons,
    windows: windows(LANG),
    menus: menus(LANG, HEIGHT, WIDTH),
});
