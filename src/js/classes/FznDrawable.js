import FznAnimation from './FznAnimation';

export default class FznDrawable {
    constructor(parent, params) {
        const children = params.children || {};

        // Relations and metadata
        this.name = params.name || 'Anon Item';
        this.type = params.type || 'Anonymous';
        this.id = params.id || `${this.type}_${this.name}_anon_${Math.random()}`;
        this.parent = parent || params.parent || null;
        this.children = {};
        this.game = this.parent && this.parent.game ? this.parent.game : this.parent;
        this.layers = ["background", "button", "text", "overlay", "menu", "sounds"];

        // Render properties
        this.size = params.size || this.game.size.slice();
        this.pos = this.getInitialPosition(params.pos);
        this.posA = [0, 0];
        this.isFixed = params.isFixed || false;
        this.opacity = typeof params.opacity === 'number' ? params.opacity : 1;

        // Image properties and sprites
        this.color = params.color || "transparent";
        this.source = params.source || null;
        this.repeat = params.repeat || false;
        this.sprite = params.sprite || {};
        this.activeSprite = params.activeSprite || null;

        // Text
        this.font = {
            family: params.font && params.font.family ? params.font.family : "Arial",
            color: params.font && params.font.color ? params.font.color : "black",
            size: params.font && params.font.size ? params.font.size : "6px",
            align: params.font && params.font.align ? params.font.align : "left",
            stroke: params.font && params.font.stroke ? params.font.stroke : false,
        };

        // Actions
        this.onLoad = params.onLoad || null;
        this.anim = (params.animation) ? new FznAnimation(this, params.animation) : null;
        this.afterGo = null;
        this.isAlive = true;

        // Initialize
        this.loadChildren(children);
        if (this.onLoad) this.onLoad();
        this.game.log(`Some ${this.type} item (${this.name}) successfuly loaded.`);
    }

    getInitialPosition(pos) {
        const parentSize = this.parent
            ? this.parent.size.slice()
            : [this.parent.cnv.width, this.parent.cnv.height];
        const centerP = [parentSize[0] / 2, parentSize[1] / 2];
        const centerM = [this.size[0] / 2, this.size[1] / 2];

        let newPos = [];

        switch (pos) {
        case 'left':
            newPos = [0, centerP[1] - centerM[1]];
            break;
        case 'right':
            newPos = [parentSize[0] - this.size[0], centerP[1] - centerM[1]];
            break;
        case 'center':
            newPos = [centerP[0] - centerM[0], centerP[1] - centerM[1]];
            break;
        default:
            newPos = pos || [0, 0];
        }

        return newPos;
    }

    loadChildren(items) {
        if (!this.game) return;
        for (let i = 0, len = this.layers.length, layer, itemList; i < len; i += 1) {
            layer = this.layers[i] || false;
            itemList = items[layer] || false;
            this.children[layer] = [];
            if (itemList) {
                if (itemList instanceof Array) {
                    for (let j = 0, len2 = itemList.length; j < len2; j += 1) {
                        this.add(layer, itemList[i]);
                    }
                } else this.add(layer, itemList);
            }
        }
    }

    go() {
        if (this.anim) this.anim.go();

        this.render();
        for (let i = 0, len = this.layers.length, layer, items; i < len; i += 1) {
            layer = this.layers[i];
            items = this.children[layer] || {};

            if (layer === "text") this.refreshText();
            else if (layer !== "sound") {
                for (let j = 0, len2 = items.length, item; j < len2; j += 1) {
                    item = items[j];
                    if (item.isAlive) {
                        item.go();
                    } else {
                        this.remove(layer, item.id);
                    }
                }
            }
        }
        if (this.afterGo && typeof this.afterGo === 'function') this.afterGo();
    }

    add(type, params) {
        const tmp = this.game ? this.game.generate(type, this, params) : null;
        if (tmp) this.children[type].push(tmp);
    }

    remove(t, id) {
        const type = t || false;
        if (this.children[type] && this.children[type][id]) delete this.children[type][id];
    }

    setTextVars(obj) {
        if (!this.children.text || typeof this.children.text !== 'object') return;

        this.children.text.parsed = null;
        this.children.variables = obj;
    }

    refreshText(newVars) {
        let rawText = null;
        let vars = {};

        if (!this.children.text || this.children.text.parsed) return;

        rawText = this.children.text.content || this.children.text || null;
        vars = newVars || this.children.text.variables || {};
        this.children.text = {
            content: typeof rawText === 'string' ? rawText : null,
            variables: vars,
            parsed: '',
        };

        if (typeof rawText === 'string') this.children.text.parsed = rawText;
        else if (rawText instanceof Array) this.children.text.parsed = rawText.join('\n');

        if (this.children.text.parsed === '') return;

        this.children.text.parsed = '';
        Object.keys(vars).forEach((v) => {
            this.children.text = this.children.text.replace(`{{${v}}}`, vars[v]);
        });
    }

    playSound() {
        if (!this.children.sound) return;
        if (this.children.sound.audio instanceof Audio) {
            this.children.sound.audio.play();
            return;
        }
        Object.keys(this.children.sound).forEach((item) => {
            if (this.children.sound[item].audio instanceof Audio) {
                this.children.sound[item].audio.play();
            }
        });
    }

    render() {
        // Calculate position and size
        let size = this.size.slice();

        this.posA = [
            this.parent && !this.isFixed ? this.pos[0] + this.parent.posA[0] : this.pos[0],
            this.parent && !this.isFixed ? this.pos[1] + this.parent.posA[1] : this.pos[1],
        ];

        // Calculate relative position
        if (this.parent && typeof this.isFixed === 'number') {
            this.posA = [
                this.pos[0] - (this.parent.pos[0] * this.isFixed),
                this.pos[1] - (this.parent.pos[1] * this.isFixed),
            ];
            size = [
                this.parent.pos[0] * this.isFixed,
                this.parent.pos[1] * this.isFixed,
            ];
        }

        this.game.canvas.save();

        // Calculate the opacity
        this.game.canvas.globalAlpha = (this.parent)
            ? this.parent.opacity * this.opacity
            : this.opacity;

        console.log("Render:", this.id);

        // Render item
        this.renderBgColor(this.posA);
        this.renderBgImage(this.posA, size);
        this.renderText(this.posA);

        this.game.canvas.restore();
    }

    renderBgColor(pos) {
        // Render background color
        if (this.color && this.color !== "transparent") {
            this.game.canvas.fillStyle = this.color;
            this.game.canvas.fillRect(
                pos[0],
                pos[1],
                this.size[0],
                this.size[1],
            );
        }
    }

    renderBgImage(pos, size) {
        const sprite = this.activeSprite && this.sprite[this.activeSprite]
            ? this.sprite[this.activeSprite]
            : [0, 0];
        const [x, y] = pos;
        let [sX, sY] = size;
        let ptrn = null;
        if (this.source) {
            if (this.repeat === "repeat" || this.repeat === "repeat-x" || this.repeat === "repeat-y") {
                this.game.canvas.translate(x, y);
                ptrn = this.game.canvas.createPattern(this.game.images[this.source], this.repeat);
                sY = this.repeat === "repeat-x" || this.repeat === "repeat" ? 0 : sY;
                sX = this.repeat === "repeat-y" || this.repeat === "repeat" ? 0 : sX;

                this.game.canvas.fillStyle = ptrn;
                this.game.canvas.fillRect(
                    0,
                    0,
                    sX,
                    sY,
                );
            } else {
                ptrn = this.game.images[this.source];
                if (!ptrn) return;
                this.game.canvas.drawImage(
                    ptrn,
                    sprite[0],
                    sprite[1],
                    this.size[0],
                    this.size[1],
                    x,
                    y,
                    this.size[0],
                    this.size[1],
                );
            }
        }
    }

    renderText(pos) {
        let [x, y] = pos;

        if (this.children.text) {
            this.game.canvas.fillStyle = this.font.color || 'black';
            this.game.canvas.font = `${this.font.size} '${this.font.family}', sans-serif"`;
            y += (parseInt(this.font.size, 10) / 2) + (this.size[1] / 2);
            switch (this.font.align) {
            case "right":
                x += this.size[0];
                break;
            case "center":
                x += this.size[0] / 2;
                break;
            default:
                x += 0;
            }
            this.game.canvas.textAlign = this.font.align || 'center';

            if (this.font.stroke) {
                this.game.canvas.lineWidth = this.font.lineWeight || 3;
                this.game.canvas.strokeStyle = this.font.stroke || 'solid';
                this.game.canvas.strokeText(this.text, x, y);
            }

            this.game.canvas.fillText(this.text, x, y);
        }
    }
}
