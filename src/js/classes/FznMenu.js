import FznAnimation from './FznAnimation';

export default class FznMenu {
    construct(game, params) {
        let parent = null;
        let parentSize = 0;
        let centerX = 0;
        let centerY = 0;

        // Data Vars
        this.game = game;
        this.data = params.data || {};
        this.size = params.size || [this.game.cnv.width, this.game.cnv.height];
        this.parent = params.menu || game || false;
        this.pos = params.pos || [0, 0];
        this.realPos = [0, 0];
        this.name = params.name || false;
        this.value = params.value || 0;
        this.menu = params.menu || false;
        this.opacity = (typeof params.opacity !== "undefined") ? params.opacity : 1;
        this.source = params.source || false;
        this.sprite = params.sprite || false;
        this.color = params.color || "transparent";
        this.fixed = false;
        this.onLoad = params.onLoad || null;
        this.items = {
            backgrounds: params.backgrounds || [],
            buttons: params.buttons || [],
            ovelays: params.overlays || [],
            menus: params.menus || [],
            text: params.text || [],
            sounds: params.sound || [],
        };
        this.variableText = [];
        this.font = {
            family: "Arial", color: "black", size: "6px", align: "left", stroke: false,
        };
        if (typeof params.font !== "undefined") {
            this.font.family = params.font.family || this.font.family;
            this.font.color = params.font.color || this.font.color;
            this.font.size = params.font.size || this.font.size;
            this.font.align = params.font.align || this.font.align;
            this.font.stroke = params.font.stroke || this.font.stroke;
        }
        this.textPos = params.textPos || [
            (this.size[0] / 2) - 250,
            (this.size[1] / 2) - (
                (this.items.text.length / 2) * parseInt(this.game.canvas.font, 10)
            ),
        ];
        this.repeat = params.repeat || false;
        this.id = params.id;
        this.click = params.click || true;
        this.keys = params.keys || true;
        this.animation = params.animation || false;

        parent = this.menu || this.parent || this.game;
        parentSize = (typeof parent.size !== "undefined")
            ? [parent.size[0], parent.size[1]]
            : [parent.cnv.width, parent.cnv.height];
        centerX = (parentSize[0] / 2) - (this.size[0] / 2);
        centerY = (parentSize[1] / 2) - (this.size[1] / 2);
        if (this.pos === "center") {
            this.pos = [];
            this.pos[0] = centerX;
            this.pos[1] = centerY;
        } else {
            this.pos[0] = (this.pos[0] === "center") ? centerX : this.pos[0];
            this.pos[1] = (this.pos[1] === "center") ? centerX : this.pos[1];
        }
        centerX = (this.size[0] / 2);
        centerY = (this.size[1] / 2);
        if (this.textPos === "center") {
            this.textPos = [];
            this.textPos[0] = centerX;
            this.textPos[1] = centerY;
        } else {
            this.textPos[0] = (this.textPos[0] === "center") ? centerX : this.textPos[0];
            this.textPos[1] = (this.textPos[1] === "center") ? centerY : this.textPos[1];
        }
        this.anim = new FznAnimation(this, this.animation);
        // Generate a canvas for BG
        this.game.loadImage(this.source);
        this.loadItems();
        this.playSound();
        this.onLoad();
    }

    go() {
        this.anim.go();
        this.redraw();
        this.draw("background");
        this.draw("button");
        this.printText();
        this.draw("overlay");
        this.draw("menu");
    }

    loadItems() {
        let item = null;
        let theLib = null;
        this.game.libs.keys().forEach((lib) => {
            theLib = this.items[`${lib}s`] || false;
            if (theLib) {
                if (lib !== "sound") {
                    for (let i = 0, len = theLib.length; i < len; i += 1) {
                        item = theLib[i];
                        item.params = item.params || {};
                        item.params.menu = this;
                        this.add(lib, item.copyOf, item.id, item.params);
                    }
                } else {
                    item = theLib;
                    this.add(lib, item);
                }
            }
        });
    }

    add(type, name, id, params) {
        const targetType = type.toLowerCase();
        const target = `${targetType}s`;
        const lib = this.game.libs[target] || false;
        let item = null;

        if (lib) {
            item = lib.generate(name, id, params);
            if (item) {
                this[target] = this[target] || {};
                this[target][item.id] = item;
                if (type.toLowerCase() === "sprite") {
                    item.floor = this.floor;
                    this.spriteTypes[item.type] = this.spriteTypes[item.type] || {};
                    this.spriteTypes[item.type][item.id] = true;
                    if (item.type === "user") {
                        this.user = item;
                        this.attachEvents();
                    }
                }
            }
        }
    }

    remove(t, id) {
        const type = `${t.toLowerCase()}s`;
        const target = this[type] || false;
        if (target && typeof target[id] !== "undefined") {
            delete target[id];
        }
    }

    draw(type) {
        const target = this[`${type.toLowerCase()}s`] || false;
        if (target) {
            target.keys().forEach((item) => {
                if (type.toLowerCase() === "sprite") {
                    if (target[item].alive) {
                        target[item].go();
                    } else {
                        this.remove(type, target[item].id, target[item].type);
                    }
                } else {
                    target[item].go();
                }
            });
        }
    }

    printText() {
        const texts = this.items.text;
        let i = 0;
        let len = 0;
        let txt = 0;
        let j = 0;
        let posx = 0;
        let posy = 0;

        if (this.items.text.length > 0) {
            this.game.canvas.save();
            if (this.opacity !== 1) {
                this.game.canvas.globalAlpha = this.opacity;
            }
            this.game.canvas.fillStyle = this.font.color;
            this.game.canvas.font = `${this.font.size} '${this.font.family}', sans-serif`;
            this.game.canvas.textAlign = this.font.align;
            if (this.font.stroke) {
                this.game.canvas.lineWidth = 3;
                this.game.canvas.strokeStyle = this.stroke;
            }
            for (i = 0, len = texts.length; i < len; i += 1) {
                txt = texts[i];
                posx = (this.menu) ? this.pos[0] + this.menu.realPos[0] : this.pos[0];
                posy = (this.menu) ? this.pos[1] + this.menu.realPos[1] : this.pos[1];
                if (this.font.stroke) {
                    this.game.canvas.strokeText(
                        txt,
                        this.textPos[0] + posx,
                        this.textPos[1] + (i * (parseInt(this.game.canvas.font, 10) + 3)) + posy,
                    );
                }
                this.game.canvas.fillText(
                    txt,
                    this.textPos[0] + posx,
                    this.textPos[1] + (i * (parseInt(this.game.canvas.font, 10) + 3)) + posy,
                );
            }
            if (this.vatiableText instanceof Array) {
                for (j = 0, len = this.vatiableText.length; j < len; j += 1) {
                    txt = this.vatiableText[j];
                    this.game.canvas.fillText(
                        txt,
                        this.textPos[0],
                        this.textPos[1] + (i * (parseInt(this.game.canvas.font, 10) + 3)),
                    );
                    i += 1;
                }
            }
            this.game.canvas.restore();
        }
    }

    playSound() {
        this.sounds.keys().forEach((s) => {
            if (this.sounds[s].audio instanceof Audio) {
                this.sounds[s].audio.play();
            }
        });
    }

    checkClicked(pos) {
        const insidePos = [];
        if (
            pos[0] > this.pos[0]
            && pos[0] < this.pos[0] + this.size[0]
            && pos[1] > this.pos[1]
            && pos[1] < this.pos[1] + this.size[1]
        ) {
            insidePos[0] = pos[0] - this.pos[0];
            insidePos[1] = pos[1] - this.pos[1];
            if (typeof this.menus === "object") {
                this.menus.keys().forEach((item) => {
                    this.menus[item].checkClicked(insidePos);
                });
            }
            if (typeof this.buttons === "object") {
                this.buttons.keys().forEach((item) => {
                    this.buttons[item].checkClicked(insidePos);
                });
            }
            return true;
        }
        return false;
    }

    redraw() {
        const pos = [this.pos[0], this.pos[1]];
        const x = (this.parent) ? pos[0] + this.parent[0] : pos[0];
        const y = (this.parent) ? pos[1] + this.parent[1] : pos[1];
        const sprite = this.sprite || [0, 0];
        const ptrn = this.game.canvas.createPattern(this.game.images[this.source], this.repeat);

        this.realPos[0] = (this.menu) ? pos[0] + this.menu.pos[0] : pos[0];
        this.realPos[1] = (this.menu) ? pos[1] + this.menu.pos[1] : pos[1];
        this.game.canvas.save();
        this.game.canvas.globalAlpha = (this.menu)
            ? this.menu.opacity * this.opacity
            : this.opacity;
        if (this.color !== "transparent") {
            this.game.canvas.fillStyle = this.color;
            this.game.canvas.fillRect(
                this.realPos[0],
                this.realPos[1],
                this.size[0],
                this.size[1],
            );
        }
        if (this.source) {
            if (this.repeat === "repeat" || this.repeat === "repeat-x" || this.repeat === "repeat-y") {
                this.game.canvas.translate(x, y);
                this.game.canvas.fillStyle = ptrn;
                this.game.canvas.fillRect(
                    this.realPos[0],
                    this.realPos[1],
                    this.game.cnv.width,
                    this.game.cnv.height,
                );
            } else {
                this.game.canvas.drawImage(
                    this.game.images[this.source],
                    sprite[0],
                    sprite[1],
                    this.size[0],
                    this.size[1],
                    this.realPos[0],
                    this.realPos[1],
                    this.size[0],
                    this.size[1],
                );
            }
        }
        this.game.canvas.restore();
    }
}
