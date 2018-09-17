import { animationFrame, getRandom } from '../tools';
import gameLang from '../config/gameLang';
import FznLoader from './FznLoader';
import FznLibrary from './FznLibrary';
import FznMenu from './FznMenu';
import FznButton from './FznButton';
import FznDrawable from './FznDrawable';

export default class FznGame extends FznDrawable {
    constructor(canvasID) {
        super(null, { id: "GAME" }, canvasID);
        const self = this;

        this.resize();

        this.loadQueue = 0;
        this.start = true;
        this.images = {};
        this.instances = 0;
        this.audios = {};
        this.libs = {};

        this.windowVariation = 3;
        this.turn = 0;
        this.score = 0;
        this.level = 0;
        this.gameOver = false;
        this.wait = 0;
        this.increment = 1.1;
        this.debug = false;
        this.isAlive = false;

        this.ram = {};
        this.levelMeter = {};
        this.speed = 1;

        this.loader = new FznLoader(this, {
            color: "black",
            size: [this.cnv.width, 10],
            pos: [0, "bottom"],
        });

        if (!this.canvas) {
            throw (
                new Error("Sorry! Canvas is not supported or there was an error while loading")
            );
        }

        window.onresize = () => { self.resize(); };

        this.canvas.fillStyle = this.font.color;
        this.canvas.font = `${this.font.size} '${this.font.family}', sans-serif"`;
        this.canvas.textAlign = this.font.align;

        this.logClasses = {
            log: { label: 'LOG', tClass: 'background: #26de81; color: #FFFFFF', mClass: 'color: #20bf6b;' },
            info: { label: 'INFO', tClass: 'background: #45aaf2; color: #FFFFFF', mClass: 'color: #2d98da;' },
            event: { label: 'LIFECYCLE', tClass: 'background: #4b7bec; color: #FFFFFF', mClass: 'color: #3867d6;' },
            tip: { label: 'TIP', tClass: 'background: #a55eea; color: #FFFFFF', mClass: 'color: #8854d0;' },
            warn: { label: 'WARNING', tClass: 'background: #f7b731; color: #FFFFFF', mClass: 'color: #fd9644;' },
            error: { label: 'ERROR', tClass: 'background: #fc5c65; color: #FFFFFF', mClass: 'color: #eb3b5a;' },
        };

        this.log('Game initialized!', 'event', true);
        this.catchClick();
    }

    beforeGo() {
        this.canvas.clearRect(0, 0, this.cnv.width, this.cnv.height);

        this.turn = (this.turn < 2520) ? this.turn + 1 : 0;

        if ((this.turn % this.speed) === 0 && !this.gameOver) {
            this.loadWindow();
        }

        // if (!this.gameOver) {
        //     this.updateRam();
        //     this.updateLevelMeter();
        //     this.updateScore();
        // }
    }

    afterGo() {
        animationFrame(() => {
            if (this.loadQueue !== 0 || this.wait !== 0) this.loading();
            else this.go();
        });
    }

    load() {
        const self = this;
        this.loader.total = this.loadQueue;

        this.log('Loading assets.');
        Object.keys(this.images).forEach((img) => {
            this.images[img] = new Image();
            this.images[img].addEventListener("load", () => {
                self.loadQueue -= 1;
                if (!self.loadQueue) {
                    self.log(`Assets loaded!`, 'event');
                    if (self.wait) self.log(`Will wait ${self.wait} frames`);
                } else self.log(`Image loaded, ${self.loadQueue} assets remaining.`);
            }, false);
            this.images[img].src = img;
        });

        Object.keys(this.audios).forEach((snd) => {
            this.audios[snd] = new Audio();
            this.audios[snd].addEventListener("loadeddata", () => {
                self.loadQueue -= 1;
                if (!self.loadQueue) {
                    self.log(`Assets loaded!`, 'event');
                    if (self.wait) self.log(`Will wait ${self.wait} frames`);
                } else self.log(`Audio loaded, ${self.loadQueue} assets remaining.`);
            }, false);
            this.audios[snd].src = snd;
        });

        this.loading();
    }

    loading() {
        if (this.loadQueue !== 0) {
            this.loader.go();
        } else if (this.wait > 0) {
            this.wait -= 1;
            if (this.wait <= 0) {
                this.log("Loading complete. Starting Game!", "event");
                if (typeof this.onLoad === "function") this.onLoad(this);
                this.isAlive = true;
            }
            this.loader.go();
        }
        this.afterGo();
    }

    pause() { this.isAlive = !this.isAlive; }

    define(typeOp, params) {
        const type = typeOp || false;

        if (!type) return;

        const target = type.toLowerCase();
        this.libs[target] = this.libs[target] || new FznLibrary(this, type.toLowerCase());
        this.libs[target].store(params);
    }

    loadWindow(paramsRaw) {
        return getRandom(this.windowVariation, {}, paramsRaw);
        // const params = paramsRaw || {};
        // const window = this.libs.window.generate(
        //     getRandom(this.windowVariation, this.libs.window),
        //     false,
        //     params,
        // );
        // const rPos = [];
        // let textArr;
        // let target = 'def';
        // let rndmText = 'Default';

        // window.index = this.windows.length;
        // rPos[0] = Math.round((this.cnv.width - window.size[0]) * Math.random());
        // rPos[1] = Math.round((this.cnv.height - window.size[1]) * Math.random());
        // window.pos = rPos;
        // if (window.items.text.length === 0) {
        //     if (window.name.indexOf("little") === 0) {
        //         target = 'small';
        //     } else if (window.name.indexOf("medium") === 0) {
        //         target = 'med';
        //     } else if (window.name.indexOf("mega") === 0) {
        //         target = 'big';
        //     }
        //     textArr = gameLang[this.lang].game.windows[target];

        //     rndmText = Math.floor(textArr.length * Math.random());
        //     window.items.text = [textArr[rndmText]];
        // }
        // this.windows.push(window);
        // this.ram.count += 1;
        // return window;
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
        if (this.children.menu && this.children.menu.length !== 0) {
            for (let len = this.children.menu.length, menu; len > 0; len -= 1) {
                menu = this.children.menu[len - 1];
                if (menu.checkClicked(pos)) break;
            }
        }

        if (this.children.window && this.children.window.length !== 0) {
            for (let len = this.children.window.length, window; len > 0; len -= 1) {
                window = this.children.window[len - 1];
                if (window.checkClicked(pos)) {
                    this.bringToTop(window);
                    break;
                }
            }
        }
    }

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

        this.add("overlay", {
            copyOf: "levelBarBack",
            pos: [
                (this.cnv.width - (this.levelMeter.width + this.levelMeter.padding + 12)),
                this.levelMeter.padding - 18,
            ],
        });
        this.add("overlay", {
            copyOf: "ramBarBack",
            pos: [
                (this.ram.padding / 2) - 5,
                this.cnv.height - (this.ram.padding + 159),
            ],
        });

        this.add("overlay", {
            copyOf: "ramBar",
            pos: [
                (this.ram.padding / 2),
                this.cnv.height - this.ram.padding,
            ],
            size: [30, 1],
        });
        this.add("overlay", {
            copyOf: "levelBar",
            pos: [
                (this.cnv.width - (this.levelMeter.width + this.levelMeter.padding)),
                this.levelMeter.padding,
            ],
            size: [1, 15],
        });
        this.add("background", "mainBack");

        if (restart) this.gameOver = false;
    }

    resize() {
        this.cnv.width = document.body.clientWidth;
        this.cnv.height = document.body.clientHeight;
        this.size = [this.cnv.width, this.cnv.height];
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
        const bgFields = ['size', 'source', 'sprite', 'fixed', 'color'];
        let result = null;
        let bg = null;
        if (!lib) return result;

        this.instances += 1;

        p.id = `${type}_${n}_${this.instances}`;
        p.type = type;

        if (p.background) {
            bg = this.libs.background.getItem(p.background);
            for (let i = 0, len = bgFields.length; i < len; i += 1) {
                if (bgFields[i] in bg) p[bgFields[i]] = bg[bgFields[i]];
            }
        }
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

    log(message, type, force) {
        let t = type || 'log';

        const format = this.logClasses[t] || this.logClasses.log;
        const { tClass, mClass } = format;
        const m = `%c ${message}`;
        const f = force || false;

        t = `%c ${format.label} `;

        if (!this.debug && !f) return;
        console.log(t + m, tClass, mClass);
    }
}
