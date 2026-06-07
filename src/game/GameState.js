export default class GameState {
    constructor() {
        this.reset();
    }

    reset() {
        this.currentEpisode = 1;
        this.currentSceneId = "start";
        this.inventory = {
            ammo: 5,
            medkits: 1,
            food: 2
        };
        this.resources = {
            fuel: 10,
            scrap: 0
        };
        this.survivors = {}; // key: id, value: { trust: 0, morale: 50, alive: true }
        this.flags = {}; // Narrative flags: { met_vance: true, saved_elias: false }
        this.playerStats = {
            hp: 100,
            stress: 0
        };
    }

    setFlag(name, value) {
        this.flags[name] = value;
    }

    getFlag(name) {
        return this.flags[name] || false;
    }

    serialize() {
        return JSON.stringify({
            currentEpisode: this.currentEpisode,
            currentSceneId: this.currentSceneId,
            inventory: this.inventory,
            resources: this.resources,
            survivors: this.survivors,
            flags: this.flags,
            playerStats: this.playerStats
        });
    }

    deserialize(json) {
        const data = JSON.parse(json);
        Object.assign(this, data);
    }
}
