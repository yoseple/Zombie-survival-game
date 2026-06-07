import * as THREE from 'three';

export default class CombatManager {
    constructor(game) {
        this.game = game;
        this.active = false;
        this.enemies = [];
        this.threat = 0;
    }

    startCombat(encounterId) {
        this.active = true;
        this.threat = 0;
        this.game.ui.updateCombatUI(this.threat);
        this.game.ui.showNotification("COMBAT STARTED!");
        
        // Spawn placeholder enemies
        for (let i = 0; i < 3; i++) {
            const pos = new THREE.Vector3((i - 1) * 2, 0.9, -5);
            const mesh = this.game.scene.spawnZombie(pos);
            this.enemies.push({ mesh, hp: 20 });
        }

        this.playerTurn();
    }

    playerTurn() {
        if (!this.active) return;
        this.game.ui.showDialogue("COMBAT", "Your turn. Ammo: " + this.game.state.inventory.ammo, [
            { text: "SHOOT (-1 Ammo)", action: { type: "combat_attack" } },
            { text: "SCAVENGE", action: { type: "combat_scavenge" } }
        ]);
    }

    async handleAction(action) {
        if (action.type === "combat_attack") {
            if (this.game.state.inventory.ammo > 0) {
                this.game.state.inventory.ammo--;
                this.threat += 20;
                
                // Damage first enemy
                const target = this.enemies[0];
                if (target) {
                    target.hp -= 20;
                    this.game.ui.showNotification("HIT! Enemy HP: " + target.hp);
                    if (target.hp <= 0) {
                        this.game.scene.scene.remove(target.mesh);
                        this.enemies.shift();
                    }
                }
            } else {
                this.game.ui.showNotification("NO AMMO!");
            }
        } else if (action.type === "combat_scavenge") {
            const found = Math.random() > 0.5;
            if (found) {
                this.game.state.inventory.ammo += 2;
                this.game.ui.showNotification("FOUND AMMO!");
            } else {
                this.game.ui.showNotification("FOUND NOTHING.");
            }
        }

        this.game.ui.updateCombatUI(this.threat);
        
        if (this.enemies.length === 0) {
            this.endCombat(true);
        } else {
            await new Promise(r => setTimeout(r, 1000));
            this.enemyTurn();
        }
    }

    enemyTurn() {
        this.game.ui.showNotification("ENEMY TURN...");
        setTimeout(() => {
            this.game.state.playerStats.hp -= 10;
            this.game.scene.shakeCamera(0.2, 0.5); // Cinematic shake on hit
            this.game.ui.showNotification("YOU TOOK DAMAGE! HP: " + this.game.state.playerStats.hp);
            
            if (this.game.state.playerStats.hp <= 0) {
                this.endCombat(false);
            } else {
                this.playerTurn();
            }
        }, 1000);
    }

    endCombat(win) {
        this.active = false;
        this.enemies = [];
        this.game.ui.hideCombatUI();
        this.game.scene.clearScene();
        
        if (win) {
            this.game.ui.showNotification("VICTORY!");
            this.game.currentScene = this.game.episodeManager.getScene(this.game.state.currentEpisode, "win_scene");
        } else {
            this.game.ui.showNotification("DEFEAT...");
            this.game.currentScene = this.game.episodeManager.getScene(this.game.state.currentEpisode, "lose_scene");
        }
        this.game.renderScene();
    }
}
