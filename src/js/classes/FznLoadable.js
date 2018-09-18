import FznDrawable from './FznDrawable';
import FznLoader from './FznLoader';
import { animationFrame } from '../tools';

export default class FznLoadable extends FznDrawable {
    constructor(parent, params, canvasID) {
        super(parent, params, canvasID);

        this.loadQueue = 0;
        this.resources = {};
        this.loadComplete = false;

        this.validResources = {
            image: {
                loadEvent: "load",
                class: Image,
            },
            sound: {
                loadEvent: "loadeddata",
                class: Audio,
            },
        };

        this.loader = new FznLoader(this, {
            color: "black",
            size: [this.cnv.width, 10],
            pos: [0, "bottom"],
        });
    }

    afterGo() {
        animationFrame(() => {
            if (!this.loadComplete) this.loading();
            else this.go();
        });
    }

    load() {
        const types = Object.keys(this.validResources);
        this.loader.total = this.loadQueue;

        this.log('Loading assets.');

        for (let i = 0, len = types.length, resources; i < len; i += 1) {
            const type = types[i];
            const resourceSpecs = this.validResources[type] || {};
            const TheClass = resourceSpecs.class || null;
            const loadEvent = resourceSpecs.loadEvent || null;
            const resource = this.resources[type] || null;

            if (resource && TheClass && loadEvent) {
                resources = Object.keys(resource);

                for (let r = 0, len2 = resources.length; r < len2; r += 1) {
                    const src = resources[r];

                    if (src && src !== "length") {
                        this.resources[type][src] = new TheClass();
                        this.resources[type][src].addEventListener(loadEvent, () => {
                            this.loadQueue -= 1;

                            if (!this.loadQueue) {
                                this.log(`Assets loaded!`, 'event');
                                if (this.wait) this.log(`Will wait ${this.wait} frames`);
                            } else this.log(`Resource (${type}) loaded, ${this.loadQueue} assets remaining.`);
                        }, false);
                        this.resources[type][src].src = src;
                    }
                }
            }
        }

        this.loading();
    }

    loading() {
        if (this.loadQueue !== 0) {
            this.loader.go();
        } else if (this.wait > 0) {
            this.wait -= 1;
            this.loader.go();
        } else {
            this.loadComplete = true;
            this.log("Loading complete. Starting Game!", "event");
            if (typeof this.onLoad === "function") this.onLoad(this);
        }
        this.afterGo();
    }

    loadResource(theType, source) {
        const src = source || null;
        const type = theType || "unknown";
        this.resources[type] = this.resources[type] || { length: 0 };
        if (!src || src in this.resources[type]) return;
        this.resources[type][src] = null;
        this.resources[type].length += 1;
        this.loadQueue += 1;
    }
}
