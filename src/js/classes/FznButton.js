import FznAnimation from './FznAnimation';

export default class FznButton {
    construct(menu, params) {
        // Data Vars
        this.menu = menu || false;
        this.game = menu.game;
        this.data = params.data || {};
        this.size = params.size || [50, 20];
        this.parent = params.menu || this.game || false;
        this.pos = [params.pos[0], params.pos[1]] || [0, 0];
        this.action = params.action || null;
        this.opacity = (typeof params.opacity !== "undefined") ? params.opacity : 1;
        this.source = params.source || false;
        this.sound = params.sound || false;
        this.color = params.color || "transparent";
        this.sound = params.sound || [];
        this.font = {
            family: "Arial", color: "black", size: "6px", align: "center", stroke: false,
        };
        if (typeof params.font !== "undefined") {
            this.font.family = params.font.family || this.font.family;
            this.font.color = params.font.color || this.font.color;
            this.font.size = params.font.size || this.font.size;
            this.font.align = params.font.align || this.font.align;
            this.font.stroke = params.font.stroke || this.font.stroke;
        }
        this.sprite = params.sprite || { stand: [0, 0] };
        this.state = "stand";
        this.repeat = params.repeat || false;
        this.text = params.text || false;
        this.id = params.id;
        this.animation = params.animation || false;

        const parentSize = (typeof this.parent.size !== "undefined")
            ? [...this.parent.size]
            : [this.parent.cnv.width, this.parent.cnv.height];
        const centerX = (parentSize[0] / 2) - (this.size[0] / 2);
        const centerY = (parentSize[1] / 2) - (this.size[1] / 2);
        if (this.pos === "center") {
            this.pos = [];
            this.pos[0] = centerX;
            this.pos[1] = centerY;
        } else {
            this.pos[0] = (this.pos[0] === "center") ? centerX : this.pos[0];
            this.pos[1] = (this.pos[1] === "center") ? centerX : this.pos[1];
        }
        this.anim = new FznAnimation(this, this.animation);
        // Generate a canvas for BG
        this.game.loadImage(this.source);
        if (this.sound) {
            this.sound = this.game.libs.sound.generate(this.sound);
        }
    }

    go() {
        this.anim.go();
        this.redraw();
        this.state = "stand";
    }

    redraw() {
        const state = this.sprite[this.state] || [0, 0];
        const pos = [this.pos[0], this.pos[1]];
        const ptrn = this.game.canvas.createPattern(this.game.images[this.source], this.repeat);

        let x = (this.menu) ? pos[0] + this.menu.realPos[0] : pos[0];
        let y = (this.menu) ? pos[1] + this.menu.realPos[1] : pos[1];

        this.game.canvas.save();
        this.game.canvas.globalAlpha = (this.menu)
            ? this.menu.opacity * this.opacity
            : this.opacity;
        if (this.color !== "transparent") {
            this.game.canvas.fillStyle = this.color;
            this.game.canvas.fillRect(
                x,
                y,
                this.size[0],
                this.size[1],
            );
        }
        if (this.source) {
            if (this.repeat === "repeat" || this.repeat === "repeat-x" || this.repeat === "repeat-y") {
                this.game.canvas.translate(x, y);
                this.game.canvas.fillStyle = ptrn;
                this.game.canvas.fillRect(
                    x,
                    y,
                    this.game.cnv.width,
                    this.game.cnv.height,
                );
            } else {
                this.game.canvas.drawImage(
                    this.game.images[this.source],
                    state[0],
                    state[1],
                    this.size[0],
                    this.size[1],
                    x,
                    y,
                    this.size[0],
                    this.size[1],
                );
            }
        }
        if (this.text) {
            this.game.canvas.fillStyle = this.font.color;
            this.game.canvas.font = `${this.font.size} '${this.font.family}', sans-serif`;
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
            this.game.canvas.textAlign = this.font.align;

            if (this.font.stroke) {
                this.game.canvas.lineWidth = 3;
                this.game.canvas.strokeStyle = this.stroke;
                this.game.canvas.strokeText(this.text, x, y);
            }

            this.game.canvas.fillText(this.text, x, y);
        }
        this.game.canvas.restore();
    }

    checkClicked(pos) {
        if (
            pos[0] > this.pos[0]
            && pos[0] < this.pos[0] + this.size[0]
            && pos[1] > this.pos[1]
            && pos[1] < this.pos[1] + this.size[1]
        ) {
            this.state = "press";
            if (this.sound) {
                this.sound.audio.play();
            }
            this.action(this.game, this.menu);
            return 1;
        }
        return 0;
    }
}
