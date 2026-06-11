// ============================================
// D&D RPG - GAME LOGIC
// ============================================

// -------------------------------
// BASE CHARACTER CLASS
// -------------------------------
class Character {
    constructor(name, maxHp, attackPower) {
        this.name = name;
        this.maxHp = maxHp;
        this.hp = maxHp;
        this.atk = attackPower;
    }

    isAlive() { return this.hp > 0; }

    takeDamage(amount) {
        this.hp = Math.max(0, this.hp - amount);
        return amount;
    }

    receiveHeal(amount) {
        this.hp = Math.min(this.maxHp, this.hp + amount);
    }

    getHealthPercent() { return (this.hp / this.maxHp) * 100; }
}

// -------------------------------
// PLAYER / ALLY UNIT (with mana)
// -------------------------------
class PlayerUnit extends Character {
    constructor(className, customName = null) {
        const stats = {
            Warrior: { hp: 150, atk: 18, mana: 100 },
            Rogue: { hp: 110, atk: 22, mana: 100 },
            Mage: { hp: 90, atk: 15, mana: 100 }
        };
        const selected = stats[className] || stats.Warrior;
        super(customName || className, selected.hp, selected.atk);
        this.classType = className;
        this.mana = selected.mana;
        this.maxMana = 100;
    }

    basicAttack(target, logCallback) {
        const variance = Math.floor(Math.random() * 12) + 1;
        const totalDamage = this.atk + variance;
        target.takeDamage(totalDamage);
        logCallback(`${this.name} ⚡ strikes ${target.name} for ${totalDamage} damage!`);
        return totalDamage;
    }

    specialSkill(target, logCallback) {
        if (this.mana < 15) {
            logCallback(`❌ ${this.name} lacks mana! (${this.mana}/15 required)`);
            return false;
        }
        this.mana -= 15;
        let damage = 0;
        switch (this.classType) {
            case "Warrior":
                damage = this.atk * 2 + Math.floor(Math.random() * 8);
                logCallback(`💥 ${this.name} uses MIGHTY SLAM! ${damage} brutal damage!`);
                break;
            case "Rogue":
                damage = this.atk * 3 + Math.floor(Math.random() * 10);
                logCallback(`🗡️ ${this.name} backstabs for ${damage} critical!`);
                break;
            case "Mage":
                damage = this.atk * 4 + Math.floor(Math.random() * 12);
                logCallback(`🔮 ${this.name} casts FIREBALL! ${damage} arcane blast!`);
                break;
            default:
                damage = this.atk * 2;
                logCallback(`✨ ${this.name} uses special strike! ${damage} damage!`);
        }
        target.takeDamage(damage);
        return true;
    }

    selfHeal(logCallback) {
        const healAmount = 25;
        this.receiveHeal(healAmount);
        logCallback(`💚 ${this.name} recovers ${healAmount} HP! (${this.hp}/${this.maxHp})`);
    }

    regenMana(amount = 5) {
        this.mana = Math.min(this.maxMana, this.mana + amount);
    }
    
    fullRestore() {
        this.hp = this.maxHp;
        this.mana = this.maxMana;
    }
}

// -------------------------------
// ENEMY with image support (uses assets)
// -------------------------------
class Enemy extends Character {
    constructor(enemyData) {
        super(enemyData.name, enemyData.hp, enemyData.atk);
        this.cost = enemyData.cost;
        this.icon = enemyData.icon;
        this.iconColor = enemyData.iconColor;
        this.allyClass = enemyData.allyClass;
    }

    enemyAction(targetsList, logCallback) {
        const aliveTargets = targetsList.filter(t => t.isAlive());
        if (aliveTargets.length === 0) return;
        const randomTarget = aliveTargets[Math.floor(Math.random() * aliveTargets.length)];
        const damageDealt = this.atk + Math.floor(Math.random() * 8);
        randomTarget.takeDamage(damageDealt);
        logCallback(`🐉 ${this.name} attacks ${randomTarget.name} for ${damageDealt} damage!`);
    }

    getArtHTML() {
        return `<div class="enemy-image" style="background: #00000066; text-shadow: 0 0 6px currentColor; color: ${this.iconColor};">
                    <span style="font-size:3rem;">${this.icon}</span>
                </div>`;
    }
}

// -------------------------------
// MAIN GAME CONTROLLER
// -------------------------------
class DungeonGame {
    constructor() {
        this.player = null;
        this.allies = [];
        this.currentEnemy = null;
        this.gold = 120;
        this.progress = 0;
        this.gameActive = false;

        this.startScreen = document.getElementById("startScreen");
        this.gameInterface = document.getElementById("gameInterface");
        this.classSelect = document.getElementById("classSelect");
        this.startBtn = document.getElementById("startGameBtn");
        this.logContainer = document.getElementById("combatLog");
        this.restartContainer = document.getElementById("restartContainer");
        this.restartBtn = document.getElementById("restartButton");

        this.attackBtn = document.getElementById("btnAttack");
        this.skillBtn = document.getElementById("btnSkill");
        this.healBtn = document.getElementById("btnHeal");
        this.recruitBtn = document.getElementById("btnRecruit");
        this.nextBtn = document.getElementById("btnNext");

        this.playerStatsDiv = document.getElementById("playerStatsArea");
        this.alliesDiv = document.getElementById("alliesContainer");
        this.enemyDiv = document.getElementById("enemyArea");

        this.bindEvents();
    }

    bindEvents() {
        this.startBtn.onclick = () => this.startNewGame();
        this.restartBtn.onclick = () => this.restartGame();
        this.attackBtn.onclick = () => this.playerAttack();
        this.skillBtn.onclick = () => this.playerSkill();
        this.healBtn.onclick = () => this.playerHeal();
        this.recruitBtn.onclick = () => this.attemptRecruit();
        this.nextBtn.onclick = () => this.nextEncounter();
    }

    addLog(message) {
        const logEntry = document.createElement("p");
        logEntry.innerHTML = `⚡ ${message}`;
        this.logContainer.appendChild(logEntry);
        logEntry.scrollIntoView({ behavior: "smooth", block: "nearest" });
        this.logContainer.scrollTop = this.logContainer.scrollHeight;
    }

    clearLog() {
        this.logContainer.innerHTML = "";
        this.addLog("✨ Adventure begins! Defeat enemies to earn gold & progress.");
    }

    restartGame() {
        this.gameActive = false;
        this.allies = [];
        this.gold = 120;
        this.progress = 0;
        this.currentEnemy = null;
        
        const selectedClass = this.classSelect.value;
        this.player = new PlayerUnit(selectedClass, "Hero");
        this.spawnRandomEnemy();
        this.gameActive = true;
        
        this.restartContainer.classList.add("hidden");
        this.clearLog();
        this.addLog(`🔄 GAME RESTARTED! 🔄`);
        this.addLog(`🛡️ ${this.player.name} the ${this.player.classType} returns to battle!`);
        this.addLog(`💰 Starting gold: ${this.gold} | Recruit enemies by paying their cost!`);
        
        this.updateAllUI();
    }

    startNewGame() {
        const selectedClass = this.classSelect.value;
        this.player = new PlayerUnit(selectedClass, "Hero");
        this.allies = [];
        this.gold = 120;
        this.progress = 0;
        this.gameActive = true;
        this.spawnRandomEnemy();

        this.startScreen.classList.add("hidden");
        this.gameInterface.classList.remove("hidden");
        this.restartContainer.classList.add("hidden");
        this.clearLog();
        this.addLog(`🛡️ ${this.player.name} the ${this.player.classType} joins the fight!`);
        this.addLog(`💰 Starting gold: ${this.gold} | Recruit enemies by paying their cost!`);
        this.updateAllUI();
    }

    spawnRandomEnemy() {
        const enemyData = getRandomEnemy();
        this.currentEnemy = new Enemy(enemyData);
        this.addLog(`⚠️ ${this.currentEnemy.name} appears! ${this.currentEnemy.icon} (Recruit cost: 🪙${this.currentEnemy.cost})`);
    }

    getAlliedFighters() {
        return [this.player, ...this.allies].filter(u => u.isAlive());
    }

    enemyTurn() {
        if (!this.currentEnemy || !this.currentEnemy.isAlive()) return;
        const targets = this.getAlliedFighters();
        if (targets.length === 0) {
            this.addLog("💀 Everyone is defeated! Game Over...");
            this.endGame();
            return;
        }
        this.currentEnemy.enemyAction(targets, (msg) => this.addLog(msg));
    }

    endGame() {
        this.gameActive = false;
        this.addLog("☠️ GAME OVER - Your journey has ended.");
        this.addLog("✨ Click the RESTART button to begin a new adventure! ✨");
        this.restartContainer.classList.remove("hidden");
        this.updateAllUI();
    }

    checkCombatState() {
        if (!this.player.isAlive()) {
            this.endGame();
            return true;
        }

        if (this.currentEnemy && !this.currentEnemy.isAlive()) {
            const goldReward = 25;
            const progressGain = 12;
            this.gold += goldReward;
            this.progress = Math.min(100, this.progress + progressGain);
            this.addLog(`🏆 VICTORY! +${goldReward} gold, +${progressGain} progress!`);
            this.player.regenMana(8);
            this.addLog(`🔋 ${this.player.name} recovers 8 mana.`);
            this.currentEnemy = null;
            this.updateAllUI();
            if (this.progress >= 100) {
                this.addLog("🎉✨ YOU REACHED 100% PROGRESS! YOU ARE LEGEND! ✨🎉");
                this.addLog("🏆 YOU WIN! Click RESTART to play again! 🏆");
                this.gameActive = false;
                this.restartContainer.classList.remove("hidden");
            }
            return true;
        }
        return false;
    }

    resolveAction() {
        if (!this.gameActive) return;
        if (this.currentEnemy && this.currentEnemy.isAlive()) {
            this.enemyTurn();
        }
        this.checkCombatState();
        this.updateAllUI();
    }

    playerAttack() {
        if (!this.gameActive) return;
        if (!this.currentEnemy || !this.currentEnemy.isAlive()) {
            this.addLog("No enemy to attack! Click 'Next Foe'.");
            return;
        }
        this.player.basicAttack(this.currentEnemy, (msg) => this.addLog(msg));
        this.resolveAction();
    }

    playerSkill() {
        if (!this.gameActive) return;
        if (!this.currentEnemy || !this.currentEnemy.isAlive()) {
            this.addLog("No enemy to use skill!");
            return;
        }
        const success = this.player.specialSkill(this.currentEnemy, (msg) => this.addLog(msg));
        if (success) this.resolveAction();
        else this.updateAllUI();
    }

    playerHeal() {
        if (!this.gameActive) return;
        if (!this.player.isAlive()) return;
        this.player.selfHeal((msg) => this.addLog(msg));
        this.resolveAction();
    }

    attemptRecruit() {
        if (!this.gameActive) {
            this.addLog("Game is over, click RESTART.");
            return;
        }
        if (!this.currentEnemy) {
            this.addLog("👻 No enemy to recruit! Click 'Next Foe' first.");
            return;
        }

        if (typeof this.currentEnemy.cost !== 'number' || isNaN(this.currentEnemy.cost)) {
            this.addLog("😕 This creature cannot be recruited.");
            return;
        }

        const cost = this.currentEnemy.cost;
        if (this.gold < cost) {
            this.addLog(`💰 Not enough gold! Need ${cost} gold. You have ${this.gold}.`);
            return;
        }

        this.gold -= cost;

        // Use allyClass from enemy data (from assets)
        let allyClassType = this.currentEnemy.allyClass || "Warrior";
        
        const recruitedAlly = new PlayerUnit(allyClassType, this.currentEnemy.name);
        this.allies.push(recruitedAlly);
        this.addLog(`🤝 SUCCESS! ${this.currentEnemy.name} ${this.currentEnemy.icon} joins your cause! (-${cost} gold)`);

        this.currentEnemy = null;
        this.updateAllUI();
        this.addLog("⭐ The battlefield is clear. Press 'Next Foe' to continue.");
    }

    nextEncounter() {
        if (!this.gameActive) {
            this.addLog("Game over, click RESTART.");
            return;
        }
        if (this.currentEnemy && this.currentEnemy.isAlive()) {
            this.addLog("⚔️ You must defeat or recruit the current enemy before moving on!");
            return;
        }
        this.spawnRandomEnemy();
        this.player.regenMana(5);
        this.updateAllUI();
        this.addLog("🌀 A new challenge emerges...");
    }

    updateAllUI() {
        if (!this.player) return;

        const playerHpPercent = this.player.getHealthPercent();
        const manaPercent = (this.player.mana / this.player.maxMana) * 100;
        const powerPercent = Math.min(100, (this.player.atk / 35) * 100);
        const goldPercent = Math.min(100, (this.gold / 200) * 100);
        const progPercent = this.progress;

        this.playerStatsDiv.innerHTML = `
            <div class="stat-block">
                <div class="stat-label">❤️ ${this.player.name} (${this.player.classType}) | ${this.player.hp}/${this.player.maxHp} HP</div>
                <div class="bar"><div class="fill hp" style="width: ${playerHpPercent}%;"></div></div>
            </div>
            <div class="stat-block">
                <div class="stat-label">✨ MANA: ${this.player.mana}/${this.player.maxMana}</div>
                <div class="bar"><div class="fill mana" style="width: ${manaPercent}%;"></div></div>
            </div>
            <div class="stat-block">
                <div class="stat-label">⚔️ POWER: ${this.player.atk}</div>
                <div class="bar"><div class="fill power" style="width: ${powerPercent}%;"></div></div>
            </div>
            <div class="stat-block">
                <div class="stat-label">🪙 GOLD: ${this.gold}</div>
                <div class="bar"><div class="fill gold" style="width: ${goldPercent}%;"></div></div>
            </div>
            <div class="stat-block">
                <div class="stat-label">📈 PROGRESS: ${this.progress}%</div>
                <div class="bar"><div class="fill progress" style="width: ${progPercent}%;"></div></div>
            </div>
        `;

        if (this.allies.length === 0) {
            this.alliesDiv.innerHTML = "<div style='opacity:0.7;'>— No allies recruited —<br>💰 Defeat & recruit monsters!</div>";
        } else {
            this.alliesDiv.innerHTML = this.allies.map(ally => `
                <div class="ally-badge">
                    <span>⚔️ ${ally.name} (${ally.classType})</span>
                    <span style="color:#ffaa88">❤️ ${ally.hp}/${ally.maxHp}</span>
                </div>
            `).join('');
        }

        if (this.currentEnemy && this.currentEnemy.isAlive()) {
            const enemyHpPercent = (this.currentEnemy.hp / this.currentEnemy.maxHp) * 100;
            this.enemyDiv.innerHTML = `
                <div class="enemy-card">
                    ${this.currentEnemy.getArtHTML()}
                    <div class="enemy-stats">
                        <strong>🐲 ${this.currentEnemy.name}</strong>
                        <div class="bar" style="margin: 8px 0;"><div class="fill hp" style="width: ${enemyHpPercent}%; background:#e06c6c;"></div></div>
                        <div>❤️ ${this.currentEnemy.hp}/${this.currentEnemy.maxHp} HP | ⚔️ ATK: ${this.currentEnemy.atk}</div>
                        <div class="cost-badge">💰 Recruit cost: 🪙${this.currentEnemy.cost}</div>
                    </div>
                </div>
            `;
        } else if (this.currentEnemy && !this.currentEnemy.isAlive()) {
            this.enemyDiv.innerHTML = `<div style="background:#2e2a3a; border-radius:16px; padding:12px;">✅ Defeated! Press "Next Foe"</div>`;
        } else {
            this.enemyDiv.innerHTML = `<div style="background:#1f2538; border-radius:16px; padding:12px;">🌀 No enemy. Press "Next Foe" to continue.</div>`;
        }
    }
}

// Start the game when DOM is ready
window.addEventListener("DOMContentLoaded", () => {
    new DungeonGame();
});