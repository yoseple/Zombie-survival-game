export default class InventoryManager {
    constructor(game) {
        this.game = game;
    }

    updateItem(id, amount) {
        if (this.game.state.inventory[id] !== undefined) {
            this.game.state.inventory[id] += amount;
            this.game.ui.showNotification(`${id.toUpperCase()}: ${this.game.state.inventory[id]}`);
        }
    }

    hasItem(id, amount = 1) {
        return (this.game.state.inventory[id] || 0) >= amount;
    }
}
