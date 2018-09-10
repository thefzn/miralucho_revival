export default class FznAnimLib {
    constructor() {
        this.step = 7;
    }

    fall() {
        if (this.pos[1] < this.endPosition[1]) {
            this.velDown += this.gravity;
            this.velDown = (this.velDown > this.maxVel) ? this.maxVel : this.velDown;
            this.pos[1] += this.velDown;
            this.pos[1] = (this.pos[1] > this.endPosition[1]) ? this.endPosition[1] : this.pos[1];
            this.item.pos = [this.pos[0], this.pos[1]];
        } else {
            this.item.pos = [this.endPosition[0], this.endPosition[1]];
            this.onEnd();
        }
    }

    bounce() {
        this.velDown += this.gravity;
        this.pos[1] += this.velDown;
        if (this.pos[1] > this.endPosition[1]) {
            [, this.pos[1]] = this.endPosition;
            if (this.velDown < 1) {
                this.item.pos = [this.endPosition[0], this.endPosition[1]];
                this.onEnd();
            } else {
                this.velDown = -(this.velDown / 2);
            }
        }
        this.item.pos = [this.pos[0], this.pos[1]];
    }

    jump() {
        this.velDown += this.gravity;
        this.pos[1] += this.velDown;
        if (this.pos[1] >= this.endPosition[1]) {
            this.velDown = 0 - this.maxVel;
        }
        this.item.pos = [this.pos[0], this.pos[1]];
    }

    fadeIn() {
        this.opacity += 0.15;
        if (this.opacity > this.endOpacity) {
            this.opacity = this.endOpacity;
            this.onEnd();
        }
        this.item.opacity = this.opacity;
    }

    fadeOut() {
        this.opacity -= 0.3;
        if (this.opacity < 0) {
            this.opacity = 0;
            this.onEnd();
        }
        this.item.opacity = this.opacity;
    }

    move() {
        let rX = false;
        let rY = false;
        this.pos[0] += (this.endPosition[0] - this.pos[0]) / this.step;
        this.pos[1] += (this.endPosition[1] - this.pos[1]) / this.step;

        if (Math.abs(this.endPosition[0] - this.pos[0]) < 1) {
            [this.pos[0]] = this.endPosition;
            rX = true;
        }
        if (Math.abs(this.endPosition[1] - this.pos[1]) < 1) {
            [, this.pos[1]] = this.endPosition;
            rY = true;
        }
        this.item.pos = [this.pos[0], this.pos[1]];
        if (rX && rY) {
            this.onEnd();
        }
    }

    size() {
        let rX = false;
        let rY = false;
        this.size[0] += (this.endSize[0] - this.size[0]) / this.step;
        this.size[1] += (this.endSize[1] - this.size[1]) / this.step;

        if (Math.abs(this.endSize[0] - this.size[0]) < 1) {
            [this.size[0]] = this.endSize;
            rX = true;
        }
        if (Math.abs(this.endSize[1] - this.size[1]) < 1) {
            [, this.size[1]] = this.endSize;
            rY = true;
        }
        this.item.size = [this.size[0], this.size[1]];
        if (rX && rY) {
            this.onEnd();
        }
    }
}
