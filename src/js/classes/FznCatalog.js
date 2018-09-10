import FznMenu from './FznMenu';
import FznBackground from './FznBackground';
import FznButton from './FznButton';

export default class FznCatalog {
    constructor(game, type) {
        this.type = type || "generic";
        this.items = {};
        this.length = 0;
        this.instances = 0;
        this.game = game;
    }

    store(params) {
        const par = params || false;

        if (par && typeof par.name !== "undefined") {
            this.items[par.name] = par;
            this.length += 1;
        }
    }

    getRandom(limit) {
        const l = (limit > this.length || typeof limit === "undefined") ? this.length : limit;
        const index = Math.floor(Math.random() * l);
        let found = null;
        let counter = 0;
        this.items.keys().forEach((item) => {
            if (counter === index) found = item;
            counter += 1;
        });
        return found;
    }

    generate(name, id, orParams) {
        const n = name || false;
        const p = {};
        const itm = this.items[n];
        const params = orParams || {};
        let result = null;
        let parent = null;
        if (!n || typeof this.items[n] === "undefined") return result;

        this.instances += 1;

        this.itm.keys().forEach((def) => {
            p[def] = itm[def];
        });

        this.params.keys().forEach((def) => {
            p[def] = params[def];
        });

        p.id = p.id || id || `${this.type}_${name}_${this.instances}`;
        switch (this.type) {
        case "background":
            result = new FznBackground(this.game, p);
            break;
        case "overlay":
            result = new FznBackground(this.game, p);
            break;
        case "button":
            parent = p.menu || this.game.level || false;
            result = new FznButton(parent, p);
            break;
        case "window":
            result = new FznMenu(this.game, p);
            break;
        case "menu":
            result = new FznMenu(this.game, p);
            break;
        case "sound":
            p.audio = this.game.audios[p.source];
            result = p;
            break;
        default:
            result = p;
        }
        return result;
    }

    remove() { return this; }
}
