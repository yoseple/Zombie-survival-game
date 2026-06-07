import { gsap } from 'gsap';

export default class UIManager {
    constructor(game) {
        this.game = game;
        this.dialogueContainer = document.getElementById('dialogue-container');
        this.dialogueText = document.getElementById('dialogue-text');
        this.speakerName = document.getElementById('speaker-name');
        this.choicesContainer = document.getElementById('choices-container');
        this.mainMenu = document.getElementById('main-menu');
        this.notification = document.getElementById('notification');
        this.combatUI = document.getElementById('combat-ui');
        this.threatFill = document.getElementById('threat-fill');

        // Add Timer Bar to DOM dynamically or assume it's in index.html
        this.createTimerBar();

        document.getElementById('start-btn').onclick = () => this.game.startNewGame();
    }

    createTimerBar() {
        this.timerContainer = document.createElement('div');
        this.timerContainer.style = "width: 100%; height: 4px; background: #222; position: absolute; bottom: 0; left: 0;";
        this.timerBar = document.createElement('div');
        this.timerBar.style = "width: 0%; height: 100%; background: #e74c3c;";
        this.timerContainer.appendChild(this.timerBar);
        this.dialogueContainer.appendChild(this.timerContainer);
    }

    showMenu() {
        gsap.to(this.mainMenu, { opacity: 1, display: 'flex', duration: 0.5 });
        this.dialogueContainer.style.display = 'none';
        this.combatUI.style.display = 'none';
    }

    hideMenu() {
        gsap.to(this.mainMenu, { opacity: 0, display: 'none', duration: 0.5 });
    }

    showDialogue(speaker, text, choices = []) {
        this.dialogueContainer.style.display = 'block';
        gsap.fromTo(this.dialogueContainer, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 });

        this.speakerName.innerText = speaker;
        this.dialogueText.innerText = text;
        this.choicesContainer.innerHTML = '';

        if (choices.length === 0) {
            this.timerContainer.style.display = 'none';
            const nextBtn = document.createElement('button');
            nextBtn.className = 'choice-btn';
            nextBtn.innerText = 'CONTINUE';
            nextBtn.onclick = () => this.game.onDialogueComplete();
            this.choicesContainer.appendChild(nextBtn);
        } else {
            this.timerContainer.style.display = 'block';
            this.startChoiceTimer(choices);

            choices.forEach(choice => {
                const btn = document.createElement('button');
                btn.className = 'choice-btn';
                btn.innerText = choice.text;
                btn.onclick = () => {
                    this.stopChoiceTimer();
                    this.game.onChoiceSelected(choice);
                };
                this.choicesContainer.appendChild(btn);
            });
        }
    }

    startChoiceTimer(choices) {
        gsap.killTweensOf(this.timerBar);
        this.timerBar.style.width = '100%';
        gsap.to(this.timerBar, {
            width: '0%',
            duration: 10,
            ease: "none",
            onComplete: () => {
                // Default to first choice if time runs out (classic Telltale)
                this.game.onChoiceSelected(choices[0]);
            }
        });
    }

    stopChoiceTimer() {
        gsap.killTweensOf(this.timerBar);
        this.timerBar.style.width = '0%';
    }

    hideDialogue() {
        gsap.to(this.dialogueContainer, { opacity: 0, duration: 0.3, onComplete: () => {
            this.dialogueContainer.style.display = 'none';
        }});
    }

    showNotification(text, duration = 3000) {
        this.notification.innerText = text;
        this.notification.style.display = 'block';
        gsap.fromTo(this.notification, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3 });

        setTimeout(() => {
            gsap.to(this.notification, { opacity: 0, duration: 0.3, onComplete: () => {
                this.notification.style.display = 'none';
            }});
        }, duration);
    }

    updateCombatUI(threat) {
        this.combatUI.style.display = 'block';
        this.threatFill.style.width = `${threat}%`;
    }

    hideCombatUI() {
        this.combatUI.style.display = 'none';
    }
}
