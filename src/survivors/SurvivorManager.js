export default class SurvivorManager {
    constructor(game) {
        this.game = game;
    }

    updateTrust(id, amount) {
        if (!this.game.state.survivors[id]) {
            this.game.state.survivors[id] = { trust: 0, morale: 50, alive: true };
        }
        this.game.state.survivors[id].trust += amount;
        this.game.ui.showNotification(`${id.toUpperCase()} TRUST: ${this.game.state.survivors[id].trust}`);
    }

    getSurvivor(id) {
        return this.game.state.survivors[id];
    }
}
