const worstCase = (callback) => {
    window.setTimeout(callback, 1000 / 30);
};
const animationFrame = callback => window.requestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.mozRequestAnimationFrame
    || window.oRequestAnimationFrame
    || window.msRequestAnimationFrame
    || worstCase(callback);

export default animationFrame;
