const worstCaseAnimFrame = (callback) => {
    window.setTimeout(callback, 1000 / 30);
};
const method = window.requestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.oRequestAnimationFrame
    || window.msRequestAnimationFrame
    || worstCaseAnimFrame;

const logSetup = {
    log: { label: 'LOG', tClass: 'background: #26de81; color: #FFFFFF', mClass: 'color: #20bf6b;' },
    info: { label: 'INFO', tClass: 'background: #45aaf2; color: #FFFFFF', mClass: 'color: #2d98da;' },
    event: { label: 'LIFECYCLE', tClass: 'background: #4b7bec; color: #FFFFFF', mClass: 'color: #3867d6;' },
    tip: { label: 'TIP', tClass: 'background: #a55eea; color: #FFFFFF', mClass: 'color: #8854d0;' },
    warn: { label: 'WARNING', tClass: 'background: #f7b731; color: #FFFFFF', mClass: 'color: #fd9644;' },
    error: { label: 'ERROR', tClass: 'background: #fc5c65; color: #FFFFFF', mClass: 'color: #eb3b5a;' },
};

export function log(message, type) {
    let t = type || 'log';

    const format = logSetup[t] || logSetup.log;
    const { tClass, mClass } = format;
    const m = `%c ${message}`;

    t = `%c ${format.label} `;

    console.log(t + m, tClass, mClass);
}

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
