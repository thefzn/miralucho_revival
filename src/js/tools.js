const worstCase = (callback) => {
    window.setTimeout(callback, 1000 / 30);
};
const method = window.requestAnimationFrame
|| window.webkitRequestAnimationFrame
|| window.mozRequestAnimationFrame
|| window.oRequestAnimationFrame
|| window.msRequestAnimationFrame
|| worstCase;

export function animationFrame(callback) {
    return method(callback);
}

export function getRandom(limit, lib) {
    const isArray = lib instanceof Array;
    const items = isArray ? lib : Object.keys(lib);
    const len = limit && limit <= items.length ? limit : items.length;
    const random = Math.floor(Math.random() * len);
    let found = null;
    for (let i = 0; i < len; i += 1) {
        if (i === random) {
            found = isArray ? items[i] : lib[items[i]];
            break;
        }
    }
    return found;
}
