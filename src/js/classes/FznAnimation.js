import FznAnimLib from './FznAnimLib';

export default class FznAnimation extends FznAnimLib {
    constructor(item, anim, p) {
        super();

        // Data Vars
        const params = p || {};

        this.item = item;
        this.game = item.game;
        if (typeof params.size !== "undefined") {
            this.size = [...params.size];
        } else if (typeof this.item.size === "undefined") {
            this.size = [...item.size];
        } else {
            this.size = [50, 50];
        }
        if (typeof this.item.pos !== "undefined") {
            this.endPosition = [0, 0];
        } else if (typeof this.item.pos === "string") {
            this.endPosition = this.item.pos;
        } else {
            this.endPosition = [...this.item.pos];
        }
        if (typeof params.apos !== "undefined") {
            this.pos = [0, 0];
        } else if (typeof params.apos === "string") {
            this.pos = params.apos;
        } else {
            this.pos = [...params.apos];
        }
        this.endOpacity = params.opacity || this.item.opacity || 1;

        this.endSize = (typeof this.item.size === "undefined") ? [0, 0] : [...this.item.size];

        this.velDown = params.velDown || 0;
        this.gravity = params.gravity || 1;
        this.maxVel = params.maxVel || 11;
        this.anim = anim || false;
        this.animationEnd = true;
        this.opacity = params.aOpacity || 0;
        this.loop = params.loop || false;
        this.id = params.id;
        this.callback = (typeof params.callback === "function") ? params.callback : null;
        this.parent = this.item.parent || this.item.menu || this.item.level || this.item.game;

        this.pos = this.checkCenter(this.pos);
        if (this.anim) {
            this.start();
        }
    }

    start(theAnim, p, callback) {
        const params = p || false;
        let temp = 0;

        this.anim = theAnim || this.anim || false;
        if (!this.anim || !this.animationEnd) return;

        this.callback = (typeof callback === "function") ? callback : this.callback;
        this.endOpacity = this.endOpacity || 1;
        this.endPosition = this.item.pos || [0, 0];
        this.endSize = this.item.size || [10, 10];
        this.endPosition = [...this.endPosition];
        this.endSize = [...this.endSize];

        switch (this.anim) {
        case "bounce":
            temp = (typeof this.parent.pos !== "undefined") ? this.parent.pos[1] : 0;
            this.pos = [this.endPosition[0], temp - this.item.size[1]];
            this.item.pos = [...this.pos];
            break;
        case "fallIn":
            this.pos = [this.endPosition[0], this.endPosition[1] - this.size[1]];
            this.anim = "fall";
            this.item.pos = [...this.pos];
            break;
        case "fallOut":
            this.endPosition = [this.item.pos[0], this.item.pos[1] + this.item.game.cnv.height];
            this.pos = [this.item.pos[0], this.item.pos[1]];
            this.anim = "fall";
            this.item.pos = [...this.pos];
            break;
        case "fadeIn":
            this.opacity = 0;
            break;
        case "fadeOut":
            this.opacity = this.endOpacity;
            break;
        case "move":
            if (params && params instanceof Array) {
                this.pos = [...this.item.pos];
                this.endPosition = this.checkCenter(params);
            } else {
                return;
            }
            break;
        case "size":
            if (params && params instanceof Array) {
                this.size = [this.item.size[0], this.item.size[1]];
                this.endSize = params;
            } else {
                return;
            }
            break;
        default:
            this.pos = [this.endPosition[0], this.endPosition[1]];
        }
        this.animationEnd = false;
    }

    stop() {
        this.opacity = this.endOpacity;
        this.pos = [this.endPosition[0], this.endPosition[1]];
        this.item.opacity = this.opacity;
        this.animationEnd = true;
        this.onEnd();
    }

    checkCenter(p) {
        let w = 0;
        let h = 0;
        let pos = [...p];
        if (pos === "center") {
            pos = [];
            pos[0] = (this.item.game.cnv.width / 2) - (this.item.size[0] / 2);
            pos[1] = (this.item.game.cnv.height / 2) - (this.item.size[1] / 2);
        } else {
            if (pos[0] === "center") {
                w = (typeof this.parent.size !== "undefined") ? this.parent.size[0] : this.parent.cnv.width;
                pos[0] = (w / 2) - (this.item.size[0] / 2);
            }
            if (pos[0] === "center") {
                h = (typeof this.parent.size !== "undefined") ? this.parent.size[1] : this.parent.cnv.height;
                pos[1] = (h / 2) - (this.item.size[1] / 2);
            }
        }
        return [pos[0], pos[1]];
    }

    go() {
        const target = this.anims[this.anim];
        if (typeof target === "function" && !this.animationEnd) {
            target.call(this);
        }
    }

    onEnd() {
        const cB = this.callback;
        this.animationEnd = true;

        this.callback = null;
        cB(this.item, this);
    }
}
