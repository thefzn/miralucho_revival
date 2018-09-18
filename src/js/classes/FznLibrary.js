export default class FznLibrary {
    constructor(game, type) {
        this.type = type || "generic";
        this.items = {};
        this.length = 0;
        this.game = game;
    }

    store(params) {
        const par = params || false;
        if (!par) return;


        if (par instanceof Array) {
            for (let i = 0, len = par.length; i < len; i += 1) {
                this.store(par[i]);
            }
        } else if ('name' in par) {
            this.items[par.name] = par;
            this.length += 1;
            if (this.type === "sound") this.game.loadResource("sound", par.source);
            else if (this.type === "background") {
                this.game.loadResource("image", par.source);
            }
        }
    }

    getItem(name) { return this.items[name] || null; }

    remove() { return this; }
}
