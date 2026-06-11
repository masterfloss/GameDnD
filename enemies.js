// ============================================
// ENEMY ASSETS DATABASE - PORTUGUESE HISTORY EDITION (ENGLISH)
// All enemy data is stored here exclusively
// ============================================

const ENEMY_DATABASE = [
    {
        id: 1,
        name: "Celtic Warrior",
        hp: 45,
        atk: 9,
        cost: 35,
        icon: "🛡️",
        iconColor: "#7c9e5a",
        description: "Fierce warrior from the Lusitanian tribes",
        allyClass: "Warrior",
        era: "Pre-Roman",
        region: "Northern Portugal"
    },
    {
        id: 2,
        name: "Roman Legionary",
        hp: 80,
        atk: 14,
        cost: 65,
        icon: "🏛️",
        iconColor: "#c4452c",
        description: "Disciplined soldier of the Roman Empire",
        allyClass: "Warrior",
        era: "Roman Empire",
        region: "Scallabis (Santarém)"
    },
    {
        id: 3,
        name: "Vandal Invader",
        hp: 70,
        atk: 12,
        cost: 55,
        icon: "⚔️",
        iconColor: "#8b6b4a",
        description: "Germanic barbarian who plundered Hispania",
        allyClass: "Warrior",
        era: "Barbarian Invasions",
        region: "Baetica"
    },
    {
        id: 4,
        name: "Visigoth Noble",
        hp: 85,
        atk: 13,
        cost: 60,
        icon: "👑",
        iconColor: "#a67c52",
        description: "Noble warrior of the Visigothic Kingdom",
        allyClass: "Warrior",
        era: "Visigothic Kingdom",
        region: "Toledo"
    },
    {
        id: 5,
        name: "Suebian Tribesman",
        hp: 65,
        atk: 11,
        cost: 45,
        icon: "🗡️",
        iconColor: "#6b8e5a",
        description: "Warrior of the Suebian Kingdom of Gallaecia",
        allyClass: "Warrior",
        era: "Suebian Kingdom",
        region: "Braga (Gallaecia)"
    },
    {
        id: 6,
        name: "Almoravid Berber",
        hp: 72,
        atk: 15,
        cost: 70,
        icon: "🐫",
        iconColor: "#c47a3a",
        description: "North African warrior of Al-Andalus",
        allyClass: "Rogue",
        era: "Al-Andalus",
        region: "Maghreb → Gharb al-Andalus"
    },
    {
        id: 7,
        name: "Crusader Knight",
        hp: 90,
        atk: 16,
        cost: 80,
        icon: "✝️",
        iconColor: "#c9b26b",
        description: "Templar knight en route to the Holy Land",
        allyClass: "Warrior",
        era: "Crusades",
        region: "Porto (stopover to Jerusalem)"
    },
    {
        id: 8,
        name: "Castilian Enemy",
        hp: 78,
        atk: 13,
        cost: 60,
        icon: "🏰",
        iconColor: "#b57a3a",
        description: "Soldier of the Kingdom of Castile",
        allyClass: "Warrior",
        era: "Medieval Iberia",
        region: "Border with León"
    },
    {
        id: 9,
        name: "Moorish Pirate",
        hp: 55,
        atk: 17,
        cost: 65,
        icon: "🏴‍☠️",
        iconColor: "#d67a2a",
        description: "Feared corsair of the Mediterranean",
        allyClass: "Rogue",
        era: "Age of Discovery",
        region: "Algarve Coast"
    },
    {
        id: 10,
        name: "Scandinavian Viking",
        hp: 82,
        atk: 15,
        cost: 75,
        icon: "⚓",
        iconColor: "#5a8ec4",
        description: "Norse navigator who attacked Portuguese coasts",
        allyClass: "Warrior",
        era: "Viking Age (9th-10th century)",
        region: "Douro Estuary & Galicia"
    },
    {
        id: 11,
        name: "Crusader Bishop",
        hp: 68,
        atk: 18,
        cost: 85,
        icon: "⛪",
        iconColor: "#ca9a4a",
        description: "Religious leader with divine power",
        allyClass: "Mage",
        era: "Christian Reconquista",
        region: "Lisbon"
    },
    {
        id: 12,
        name: "Portuguese Standard-Bearer",
        hp: 95,
        atk: 14,
        cost: 70,
        icon: "🇵🇹",
        iconColor: "#c4562a",
        description: "Flag-bearer of D. Afonso Henriques' forces",
        allyClass: "Warrior",
        era: "Foundation of Portugal",
        region: "Battlefield of Ourique"
    },
    {
        id: 13,
        name: "Lusitanian Warrior",
        hp: 60,
        atk: 12,
        cost: 50,
        icon: "🐗",
        iconColor: "#8aba6a",
        description: "Follower of Viriatus, master of guerrilla warfare",
        allyClass: "Rogue",
        era: "Lusitanian Resistance",
        region: "Serra da Estrela"
    },
    {
        id: 14,
        name: "Enchanted Moorish Maiden",
        hp: 50,
        atk: 20,
        cost: 90,
        icon: "🧞‍♀️",
        iconColor: "#b45ac4",
        description: "Mystical being with ancestral magic",
        allyClass: "Mage",
        era: "Portuguese Legends",
        region: "Alcácer do Sal"
    },
    {
        id: 15,
        name: "Castilian Prince",
        hp: 88,
        atk: 16,
        cost: 80,
        icon: "👑",
        iconColor: "#e6b422",
        description: "Castilian noble claiming Portuguese lands",
        allyClass: "Warrior",
        era: "1383-1385 Crisis",
        region: "Aljubarrota"
    },
    {
        id: 16,
        name: "Hospitaller Knight",
        hp: 92,
        atk: 15,
        cost: 85,
        icon: "⚕️",
        iconColor: "#c97a2a",
        description: "Warrior-monk of the Order of St. John",
        allyClass: "Warrior",
        era: "Military Orders",
        region: "Belver Castle"
    },
    {
        id: 17,
        name: "Norman Raider",
        hp: 62,
        atk: 14,
        cost: 60,
        icon: "🪓",
        iconColor: "#6a9eca",
        description: "Viking descendant seeking plunder",
        allyClass: "Rogue",
        era: "Early Middle Ages",
        region: "Atlantic Coast"
    },
    {
        id: 18,
        name: "Templar Master",
        hp: 100,
        atk: 17,
        cost: 95,
        icon: "🛡️",
        iconColor: "#e6a822",
        description: "Legendary figure of the Knights Templar in Portugal",
        allyClass: "Warrior",
        era: "Knights Templar Order",
        region: "Convent of Tomar"
    }
];

// Helper function to get random enemy
function getRandomEnemy() {
    const index = Math.floor(Math.random() * ENEMY_DATABASE.length);
    return { ...ENEMY_DATABASE[index] };
}

// Helper to get enemy by name (if needed)
function getEnemyByName(name) {
    return ENEMY_DATABASE.find(e => e.name === name);
}

// Helper to get enemy art/icon
function getEnemyArt(enemyName) {
    const enemy = ENEMY_DATABASE.find(e => e.name === enemyName);
    if (enemy) {
        return { icon: enemy.icon, color: enemy.iconColor };
    }
    return { icon: "🏰", color: "#c97e5a" };
}

// Optional: Get enemies by era (for future expansions)
function getEnemiesByEra(era) {
    return ENEMY_DATABASE.filter(e => e.era === era);
}

// Optional: Get enemies by region
function getEnemiesByRegion(region) {
    return ENEMY_DATABASE.filter(e => e.region.includes(region));
}