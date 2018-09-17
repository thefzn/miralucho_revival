import FznDrawable from './FznDrawable';

export default class FznButton extends FznDrawable {
    constructor(parent, params) {
        super(parent, params);

        this.afterGo = () => { this.state = "stand"; };

        this.action = params.action || null;
        this.sprite = params.sprite || { stand: [0, 0] };
        this.activeSprite = "stand";

        this.preAction = () => {
            this.activeSprite = "press";
            if (this.sound && this.sound.audio) this.sound.audio.play();
            this.action(this.game, this.menu);
        };
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
            if (this.preAction && typeof this.preAction === 'function') this.preAction();
            if (this.action && typeof this.action === 'function') this.action();

            return 1;
        }
        return 0;
    }
}
