export default class DialogueManager {
    constructor(game) {
        this.game = game;
    }

    processChoice(choice) {
        console.log("Processing choice:", choice.text);
        
        if (choice.action) {
            this.executeAction(choice.action);
        }

        return choice.next;
    }

    executeAction(action) {
        switch (action.type) {
            case 'trust':
                this.game.survivorManager.updateTrust(action.id, action.value);
                if (action.resource) {
                    this.game.inventoryManager.updateItem(action.resource, action.amount);
                }
                break;
            case 'flag':
                this.game.state.setFlag(action.name, action.value);
                break;
            case 'combat_attack':
            case 'combat_scavenge':
                this.game.combatManager.handleAction(action);
                break;
        }
    }
}
