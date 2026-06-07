import * as THREE from 'three';
import SceneManager from './three/SceneManager.js';
import GameState from './game/GameState.js';
import UIManager from './ui/UIManager.js';
import EpisodeManager from './story/EpisodeManager.js';
import DialogueManager from './story/DialogueManager.js';
import CombatManager from './combat/CombatManager.js';
import SurvivorManager from './survivors/SurvivorManager.js';
import InventoryManager from './inventory/InventoryManager.js';
import SaveManager from './save/SaveManager.js';

class Game {
    constructor() {
        this.state = new GameState();
        this.scene = new SceneManager();
        this.ui = new UIManager(this);
        
        // Managers
        this.episodeManager = new EpisodeManager(this);
        this.dialogueManager = new DialogueManager(this);
        this.combatManager = new CombatManager(this);
        this.survivorManager = new SurvivorManager(this);
        this.inventoryManager = new InventoryManager(this);
        this.saveManager = new SaveManager(this);

        this.currentScene = null;
        this.isExploring = false;

        window.gameInstance = this; // Expose for camera follow logic

        this.init();
        this.animate();
        this.setupInput();
    }

    init() {
        const loadBtn = document.getElementById('load-btn');
        if (this.saveManager.hasSave()) {
            loadBtn.style.display = 'block';
            loadBtn.onclick = () => this.loadGame();
        }
    }

    setupInput() {
        window.addEventListener('mousedown', (e) => this.handleInput(e));
        window.addEventListener('touchstart', (e) => this.handleInput(e.touches[0]));
    }

    handleInput(e) {
        if (!this.isExploring) return;
        
        // Check for Interaction first
        const interactable = this.scene.getInteractionAtPoint(e);
        if (interactable) {
            this.handleInteraction(interactable);
            return;
        }

        const groundPoint = this.scene.getGroundClickPoint(e);
        if (groundPoint) {
            this.scene.movePlayer(groundPoint);
        }
    }

    handleInteraction(obj) {
        const data = obj.userData;
        if (data.type === 'supplies') {
            this.inventoryManager.updateItem('ammo', 2);
            this.ui.showNotification("FOUND 2 AMMO IN THE CRATE");
            this.scene.scene.remove(obj);
            this.scene.interactables = this.scene.interactables.filter(i => i !== obj);
        } else if (data.type === 'lore') {
            this.ui.showDialogue("LORE", "An old photograph lies here. The faces are faded by the sun.");
        }
    }

    async startNewGame() {
        this.state.reset();
        this.ui.hideMenu();
        await this.episodeManager.loadEpisode(this.state.currentEpisode);
        
        // Setup Player
        this.scene.spawnPlayer(new THREE.Vector3(0, 0.9, 0));
        
        this.currentScene = this.episodeManager.getScene(this.state.currentEpisode, "start");
        this.renderScene();
    }

    async loadGame() {
        if (this.saveManager.load()) {
            this.ui.hideMenu();
            await this.episodeManager.loadEpisode(this.state.currentEpisode);
            
            this.scene.spawnPlayer(new THREE.Vector3(0, 0.9, 0));
            
            this.currentScene = this.episodeManager.getScene(this.state.currentEpisode, this.state.currentSceneId);
            this.renderScene();
        }
    }

    renderScene() {
        if (!this.currentScene) return;
        
        this.state.currentSceneId = this.currentScene.id;
        this.isExploring = this.currentScene.type === "exploration";

        if (this.currentScene.type === "dialogue") {
            this.scene.transitionToDialogue();
            this.ui.showDialogue(this.currentScene.speaker, this.currentScene.text, this.currentScene.choices);
        } else if (this.currentScene.type === "combat") {
            this.ui.hideDialogue();
            this.combatManager.startCombat(this.currentScene.encounterId);
        } else if (this.currentScene.type === "exploration") {
            this.scene.transitionToExploration();
            this.ui.hideDialogue();
            this.ui.showNotification("EXPLORE THE ROAD");
            
            // Spawn an interactive crate
            this.scene.spawnLootable('crate_1', new THREE.Vector3(2, 0.4, -2), 'supplies');
            this.scene.spawnLootable('photo_1', new THREE.Vector3(-2, 0.4, -3), 'lore');
        }
        
        // Auto-save at every scene transition
        this.saveManager.save();
    }

    onDialogueComplete() {
        if (this.currentScene.next === "main_menu") {
            this.ui.showMenu();
        } else if (this.currentScene.next === "end_episode") {
            this.ui.showNotification("EPISODE COMPLETE!");
            setTimeout(() => this.ui.showMenu(), 3000);
        } else {
            this.currentScene = this.episodeManager.getScene(this.state.currentEpisode, this.currentScene.next);
            this.renderScene();
        }
    }

    onChoiceSelected(choice) {
        const nextId = this.dialogueManager.processChoice(choice);
        
        if (nextId) {
            this.currentScene = this.episodeManager.getScene(this.state.currentEpisode, nextId);
            this.renderScene();
        }
    }

    animate() {
        const time = performance.now();
        requestAnimationFrame(() => this.animate());
        this.scene.update(time);
    }
}

new Game();
