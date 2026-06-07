export default class SaveManager {
    constructor(game) {
        this.game = game;
        this.SAVE_KEY = 'dead_roads_save';
    }

    save() {
        const data = this.game.state.serialize();
        localStorage.setItem(this.SAVE_KEY, data);
        this.game.ui.showNotification("PROGRESS SAVED");
    }

    load() {
        const data = localStorage.getItem(this.SAVE_KEY);
        if (data) {
            this.game.state.deserialize(data);
            this.game.ui.showNotification("PROGRESS LOADED");
            return true;
        }
        return false;
    }

    hasSave() {
        return localStorage.getItem(this.SAVE_KEY) !== null;
    }
}
