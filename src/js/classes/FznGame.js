import { animationFrame, getRandom } from '../tools';
import gameLang from '../config/gameLang';
import FznLoader from './FznLoader';
import FznLibrary from './FznLibrary';
import FznMenu from './FznMenu2';
import FznButton from './FznButton2';
import FznDrawable from './FznDrawable';

export default class FznGame {
    constructor(canvasID) {
        const self = this;

        this.cnv = (typeof canvasID === "string") ? document.getElementById(canvasID) : canvasID;
        this.resize();
        this.canvas = (typeof this.cnv.getContext !== "undefined")
            ? this.cnv.getContext('2d')
            : false;
        this.size = [this.cnv.width, this.cnv.height];
        this.pos = [0, 0];
        this.posA = [0, 0];
        this.loadQueue = 0;
        this.start = true;
        this.images = {};
        this.children = {};
        this.instances = 0;
        this.audios = {};
        this.libs = {};
        this.windows = [];
        this.windowVariation = 3;
        this.turn = 0;
        this.score = 0;
        this.level = 0;
        this.gameOver = true;
        this.wait = 30;
        this.increment = 1.1;
        this.debug = false;
        this.font = {
            family: "Gamegirl",
            color: "black",
            align: "left",
            size: "10px",
        };
        this.ram = {};
        this.levelMeter = {};
        this.speed = 1;
        this.loader = new FznLoader(this, {
            color: "black",
            size: [this.cnv.width, 10],
            pos: [0, "center"],
        });

        if (!this.canvas) {
            this.error("Canvas not supported or error loading", "error");
            return false;
        }
        window.onresize = () => { self.resize(); };
        this.canvas.fillStyle = this.font.color;
        this.canvas.font = `${this.font.size} '${this.font.family}', sans-serif"`;
        this.canvas.textAlign = this.font.align;
        this.log('Game initialized!', 'event');
        this.catchClick();
    }

    load() {
        const self = this;
        this.loader.total = this.loadQueue;
        this.loading();

        this.log('Loading assets.');
        Object.keys(this.images).forEach((img) => {
            this.images[img] = new Image();
            this.images[img].addEventListener("load", () => {
                self.loadQueue -= 1;
                if (!self.loadQueue) self.log(`Assets loaded! Will wait ${self.wait} frames`, 'event');
                else self.log(`Image loaded, ${self.loadQueue} assets remaining.`);
            }, false);
            this.images[img].src = img;
        });

        Object.keys(this.audios).forEach((snd) => {
            this.audios[snd] = new Audio();
            this.audios[snd].addEventListener("loadeddata", () => {
                self.loadQueue -= 1;
                if (!self.loadQueue) self.log(`Assets loaded! Will wait ${self.wait} frames`, 'event');
                else self.log(`Audio loaded,  ${self.loadQueue} assets remaining.`);
            }, false);
            this.audios[snd].src = snd;
        });
    }

    loading() {
        const self = this;
        if (this.loadQueue !== 0) {
            this.loader.go();
            animationFrame(() => {
                self.loading();
            });
        } else if (this.wait > 0) {
            this.loader.go();
            animationFrame(() => {
                self.loading();
            });
            this.wait -= 1;
            if (this.wait <= 0) this.log('Done waiting!');
        } else {
            self.log("Starting Game.", "event");
            self.onLoad(self);
            animationFrame(() => {
                self.go();
            });
        }
    }

    go() {
        const self = this;

        if (!this.start) return;

        this.clear();
        this.turn = (this.turn < 2520) ? this.turn + 1 : 0;

        if ((this.turn % this.speed) === 0 && !this.gameOver) {
            this.loadWindow("commonWindow");
        }

        this.draw("background");
        this.draw("window");
        this.draw("overlay");

        if (!this.gameOver) {
            this.updateRam();
            this.updateLevelMeter();
            this.updateScore();
        }

        this.draw("menu");

        animationFrame(() => {
            self.go();
        });
    }

    draw(type) {
        const target = this.children[type] || [];

        for (let i = 0, len = target.length, item; i < len; i += 1) {
            item = target[i] || null;
            if (item && item.go) item.go();
        }
    }

    pause() {
        if (this.start) {
            this.start = false;
        } else {
            this.start = true;
            this.go();
        }
    }

    clear() {
        this.canvas.clearRect(0, 0, this.cnv.width, this.cnv.height);
    }

    define(typeOp, params) {
        const type = typeOp || false;

        if (!type) return;

        const target = type.toLowerCase();
        this.libs[target] = this.libs[target] || new FznLibrary(this, type.toLowerCase());
        this.libs[target].store(params);
    }

    loadWindow(windowRaw, paramsRaw) {
        const params = paramsRaw || {};
        const window = this.libs.window.generate(
            getRandom(this.windowVariation, this.libs.window),
            false,
            params,
        );
        const rPos = [];
        let textArr;
        let target = 'def';
        let rndmText = 'Default';

        window.index = this.windows.length;
        rPos[0] = Math.round((this.cnv.width - window.size[0]) * Math.random());
        rPos[1] = Math.round((this.cnv.height - window.size[1]) * Math.random());
        window.pos = rPos;
        if (window.items.text.length === 0) {
            if (window.name.indexOf("little") === 0) {
                target = 'small';
            } else if (window.name.indexOf("medium") === 0) {
                target = 'med';
            } else if (window.name.indexOf("mega") === 0) {
                target = 'big';
            }
            textArr = gameLang[this.lang].game.windows[target];

            rndmText = Math.floor(textArr.length * Math.random());
            window.items.text = [textArr[rndmText]];
        }
        this.windows.push(window);
        this.ram.count += 1;
        return window;
    }

    removeWindow(window) {
        const { index } = window;
        this.windows[index] = false;
    }

    loadImage(source) {
        const src = source || false;
        if (!src || src in this.images) return;
        this.images[src] = null;
        this.loadQueue += 1;
    }

    loadSound(source) {
        const src = source || false;
        const sound = this.audios[src];
        if (src && typeof sound === "undefined") {
            this.audios[src] = null;
            this.loadQueue += 1;
        }
    }

    catchClick() {
        const self = this;
        this.cnv.addEventListener("mousedown", (event) => {
            const pos = [event.offsetX, event.offsetY];
            self.onClick(pos);
        }, false);
    }

    onClick(pos) {
        const menus = [];

        let catched = false;
        // len,window,menu;

        Object.keys(this.menus).forEach((menu) => {
            if (this.menus[menu].click) {
                menus.push(this.menus[menu]);
            }
        });
        for (let len = menus.length, menu; len > 0; len -= 1) {
            menu = menus[len - 1];
            if (menu.click) {
                catched = menu.checkClicked(pos);
                break;
            }
        }

        for (let len = this.windows.length, window; len > 0; len -= 1) {
            window = this.windows[len - 1];
            if (window.click) {
                catched = window.checkClicked(pos);
            }
            if (catched) {
                this.bringToTop(window);
                break;
            }
        }
    }

    onLoad() { return this; }

    bringToTop(window) {
        this.removeWindow(window);
        window.setIndex(this.windows.length);
        this.windows.push(window);
    }

    updateRam() {
        const percent = this.ram.count / this.ram.limit;
        const nHeight = 0 - Math.round(this.ram.height * percent);
        const ram = (typeof this.overlays !== "undefined") ? this.overlays.theRam : false;
        if (nHeight !== this.ram.size && ram && typeof ram.anim === "object") {
            this.ram.size = nHeight;
            ram.anim.stop();
            ram.anim.start("size", [ram.size[0], nHeight]);
            if (this.ram.count >= this.ram.limit) {
                this.onGameOver();
            }
        }
    }

    updateLevelMeter() {
        const percent = (this.score - this.levelMeter.count) / this.levelMeter.limit;
        const nWidth = Math.round(this.levelMeter.width * percent);
        const lvl = (typeof this.overlays !== "undefined") ? this.overlays.theLevelMeter : false;
        if (nWidth !== this.levelMeter.size && lvl && typeof lvl.anim === "object") {
            this.levelMeter.size = nWidth;
            lvl.anim.stop();
            lvl.anim.start("size", [nWidth, lvl.size[1]]);
            if (this.score - this.levelMeter.count >= this.levelMeter.limit) {
                this.levelMeter.count += this.levelMeter.limit;
                this.levelMeter.limit = Math.round(this.levelMeter.limit * this.increment);
                this.speed = Math.round(this.speed / this.increment);
                this.level += 1;
                this.windowVariation = (this.level + 1) * 3;
            }
        }
    }

    updateScore() {
        this.canvas.textAlign = "right";
        this.canvas.fillText(gameLang[this.lang].game.status.score, 80, 10);
        this.canvas.fillText(gameLang[this.lang].game.status.level, 80, 20);
        this.canvas.textAlign = "left";
        this.canvas.fillText(this.score, 85, 10);
        this.canvas.fillText(this.level, 85, 20);
    }

    onGameOver() {
        this.gameOver = true;
        this.add("menu", "BSOD", "BSOD");
        this.menus.BSOD.vatiableText = [
            gameLang[this.lang].menus.BSoD.message[7]
            + this.score
            + gameLang[this.lang].menus.BSoD.message[8], gameLang[this.lang].menus.BSoD.message[9]
            + this.level,
        ];
    }

    reset(r) {
        const restart = r || false;
        this.level = 0;
        this.score = 0;
        this.speed = 75;
        this.windowVariation = 1;
        this.ram = {
            count: 0,
            limit: 13,
            height: 0,
            size: 0,
            padding: 50,
        };
        this.levelMeter = {
            count: 0,
            limit: 100,
            width: 0,
            size: 0,
            padding: 20,
        };
        this.windows = [];
        this.ram.height = 154;
        this.levelMeter.width = 150;

        this.add("overlay", "levelBarBack", "theLevelMeterBack", {
            pos: [
                (this.cnv.width - (this.levelMeter.width + this.levelMeter.padding + 12)),
                this.levelMeter.padding - 18,
            ],
        });
        this.add("overlay", "ramBarBack", "theRamBack", {
            pos: [
                (this.ram.padding / 2) - 5,
                this.cnv.height - (this.ram.padding + 159),
            ],
        });

        this.add("overlay", "ramBar", "theRam", {
            pos: [
                (this.ram.padding / 2),
                this.cnv.height - this.ram.padding,
            ],
            size: [30, 1],
        });
        this.add("overlay", "levelBar", "theLevelMeter", {
            pos: [
                (this.cnv.width - (this.levelMeter.width + this.levelMeter.padding)),
                this.levelMeter.padding,
            ],
            size: [1, 15],
        });
        this.add("background", "mainBack", "wallpaper");

        if (restart) {
            this.gameOver = false;
        }
    }

    add(type, name) {
        const tmp = this.generate(type, null, null, name);
        this.children[type] = this.children[type] || [];
        this.children[type].push(tmp);
        return tmp;
    }

    remove(t, id) {
        const type = t.toLowerCase();
        const target = this[`${type}s`] || false;
        if (target && typeof target[id] !== "undefined") {
            delete target[id];
        }
    }

    resize() {
        this.cnv.width = document.body.clientWidth;
        this.cnv.height = document.body.clientHeight;
    }

    addRam(val) {
        this.ram.count += val;
        this.ram.count = (this.ram.count < 0) ? 0 : this.ram.count;
    }

    addScore(val) {
        this.score += val;
    }

    changeSpeed(val) {
        this.speed = val;
    }

    setLang(lang) {
        if (lang && lang in gameLang) {
            this.lang = lang;
        }
    }

    generate(type, parent, orParams, name) {
        const params = orParams || {};
        const n = name || params.copyOf || false;
        const lib = this.libs[type] || false;
        const itm = !n || !lib || !lib.items ? {} : lib.items[n] || {};
        const parentEl = parent || this;
        const p = Object.assign({}, itm, params);
        let result = null;
        if (!lib) return result;

        console.log(type, n, lib, itm, params, p);

        this.instances += 1;

        p.id = `${type}_${n}_${this.instances}`;
        p.type = type;
        switch (type) {
        case "background":
            result = new FznDrawable(parentEl, p);
            break;
        case "overlay":
            result = new FznDrawable(parentEl, p);
            break;
        case "button":
            result = new FznButton(parentEl, p);
            break;
        case "window":
            result = new FznMenu(parentEl, p);
            break;
        case "menu":
            result = new FznMenu(parentEl, p);
            break;
        case "sound":
            p.audio = this.game.audios[p.source];
            result = p;
            break;
        default:
            result = null;
        }
        return result;
    }

    forceReload() {
        this.pause();
        window.location.reload();
    }

    log(message, type) {
        let t = type || 'log';
        const classes = {
            log: { tClass: 'background: #26de81; color: #FFFFFF', mClass: 'color: #20bf6b;' },
            info: { tClass: 'background: #45aaf2; color: #FFFFFF', mClass: 'color: #2d98da;' },
            event: { tClass: 'background: #4b7bec; color: #FFFFFF', mClass: 'color: #3867d6;' },
            tip: { tClass: 'background: #a55eea; color: #FFFFFF', mClass: 'color: #8854d0;' },
            warn: { tClass: 'background: #f7b731; color: #FFFFFF', mClass: 'color: #fd9644;' },
            error: { tClass: 'background: #fc5c65; color: #FFFFFF', mClass: 'color: #eb3b5a;' },
        };
        const format = classes[t] || classes.log;
        const { tClass, mClass } = format;
        const m = `%c ${message}`;

        t = `%c ${t} `;

        if (!this.debug) return;
        if (t) console.log(t + m, tClass, mClass);
        else console.log(m, mClass);
    }
}
