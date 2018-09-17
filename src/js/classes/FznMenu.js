import FznDrawable from './FznDrawable';

export default class FznMenu extends FznDrawable {
    constructor(parent, params) {
        super(parent, params);

        this.playSound();
    }

    checkClicked(pos) {
        let insidePos = [];
        if (
            pos[0] > this.posA[0]
            && pos[0] < this.posA[0] + this.size[0]
            && pos[1] > this.posA[1]
            && pos[1] < this.posA[1] + this.size[1]
        ) {
            insidePos = [pos[0] - this.posA[0], pos[1] - this.posA[1]];
            if (this.children.menu) {
                Object.keys(this.children.menu).forEach((item) => {
                    this.children.menu[item].checkClicked(insidePos);
                });
            }
            if (this.children.button) {
                Object.keys(this.children.button).forEach((item) => {
                    this.children.button[item].checkClicked(insidePos);
                });
            }
            return true;
        }
        return false;
    }
}
