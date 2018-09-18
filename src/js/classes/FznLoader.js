import FznDrawable from './FznDrawable';

export default class FznLoader extends FznDrawable {
    constructor(parent, params) {
        super(parent, params);
        // Data Vars
        this.total = 0;
    }

    beforeGo() {
        const width = this.size[0] * (1 - (this.game.loadQueue / this.total));
        const step = 5;
        this.size[0] += (width - this.size[0]) / step;
        console.log(this.size);
    }
}
