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
            if (this.childs.menu) {
                Object.keys(this.childs.menu).forEach((item) => {
                    this.childs.menu[item].checkClicked(insidePos);
                });
            }
            if (this.childs.button) {
                Object.keys(this.childs.button).forEach((item) => {
                    this.childs.button[item].checkClicked(insidePos);
                });
            }
            return true;
        }
        return false;
    }
}
