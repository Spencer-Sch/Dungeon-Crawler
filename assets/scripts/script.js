const dungeonData = {
    roomData: {
        searchedCurrentRoom: false,
    },
    items: {
        weapons: {
            dagger: {
                baseAtkDmg: 8,
                normalAtkModifier: 5,
                bigAtkModifier: 10,
                specialAtk: null, // make a function?
                weaponLvl: 0,
            },
            sword: {
                baseAtkDmg: 15,
                normalAtkModifier: 10,
                bigAtkModifier: 15,
                specialAtk: null, // make a function?
                // rarityModifier: 5,
                weaponLvl: 1,
            },
            axe: {
                baseAtkDmg: 20,
                normalAtkModifier: 20,
                bigAtkModifier: 30,
                specialAtk: null, // make a function?
                // rarityModifier: 10,
                weaponLvl: 2,
            },
            wand: {
                baseAtkDmg: 0,
                normalAtkModifier: 0,
                bigAtkModifier: 0,
                specialAtk: null, // spend all potions = insta kill
                // rarityModifier: 25,
                weaponLvl: 3,
            },

        },
        potions: {
            baseHealValue: 20, // percent of total missing health
            healValueModifier: 15, // percent of total missing health
            rarityModifier: 15,
        },
    },
    playerData: {
        playerHealth: 100,
        playerPotionCount: 1,
        playerCurrentWeapon: 'DAGGER',
        playerCurrentWeaponLvl: 0,
        playerPrevWeapons: ['DAGGER'],
    },
    monsterData: {
        monsterCount: 0,
        findMonsterModifier: 0,
        showMonsterNearbyMessage: true,
        monsterLevels: {
            level_1: {
                monsterHealth: 100,
                monsterBaseAtkDmg: 10,
                monsterAtkDmgModifier: 10,
            },
            level_2: {
                monsterHealth: 150,
                monsterBaseAtkDmg: 20,
                monsterAtkDmgModifier: 20,
            },
            level_3: {
                monsterHealth: 200,
                monsterBaseAtkDmg: 30,
                monsterAtkDmgModifier: 30,
            },
            
        },
    },
};

/*===========================================
Dungeon Object Constants
===========================================*/
const ROOM_DATA = dungeonData.roomData;
const WEAPON_DAGGER = dungeonData.items.weapons.dagger;
const WEAPON_SWORD = dungeonData.items.weapons.sword;
const WEAPON_AXE = dungeonData.items.weapons.axe;
const WEAPON_WAND = dungeonData.items.weapons.wand;
const ITEM_POTION = dungeonData.items.potions;
const PLAYER_DATA = dungeonData.playerData;
const PLAYER_PREV_WEAPONS = dungeonData.playerData.playerPrevWeapons;
const MONSTER_DATA = dungeonData.monsterData;
const MONSTER_LVL1 = dungeonData.monsterData.monsterLevels.level_1;
const MONSTER_LVL2 = dungeonData.monsterData.monsterLevels.level_2;
const MONSTER_LVL3 = dungeonData.monsterData.monsterLevels.level_3;

/*===========================================
DOM Constants
===========================================*/
const VISUAL_CONTAINER = document.getElementById('visual-container');
const BTN_START_GAME = document.getElementById('start-game-btn');
const START_BTN_CONTAINER = document.getElementById('start-btn-ui-container');
const GAME_INFO_CONTAINER = document.getElementById('game-info-container');
const NON_COMBAT_UI = document.getElementById('non-combat-ui');
const COMBAT_UI = document.getElementById('combat-ui');
const MONSTER_HEALTH = document.getElementById('monster-health-container');
const MOVE_BTN = document.getElementById('move-btn');
const SEARCH_BTN = document.getElementById('search-btn');
const DUNGEON_IMG = document.getElementById('corridor-img');
const H1 = document.querySelector('h1');
const MODAL_WINDOW = document.getElementById('item-modal');
const MODAL_TEXT = document.getElementById('item-modal-text');
const MODAL_BTN = document.getElementById('item-modal-btn');
const MODAL_BACKDROP = document.getElementById('backdrop');
const POTIONS_COUNTER = document.getElementById('potions-span');
const CURRENT_WEAPON_UI = document.getElementById('weapon-span');

/*===========================================
Program Start
===========================================*/
// Initialize page with randomly selected first image to reduce delay upong 'Start Game'
DUNGEON_IMG.setAttribute('src', `/assets/images/corridor${Math.floor(Math.random() * 8 + 1)}.jpg`);

// Initialize the set that will keep track of which weapons the player has had throughout the game.
const prevWeaponSet = new Set();
prevWeaponSet.add('DAGGER');

const prevImgNum = [];

// This changes the UI when the 'Start Game' btn is clicked
const startGameHandler = () => {
    START_BTN_CONTAINER.classList.add('invisible');
    H1.classList.add('invisible');
    DUNGEON_IMG.classList.remove('invisible');
    GAME_INFO_CONTAINER.classList.remove('invisible');
    NON_COMBAT_UI.classList.remove('invisible');
};

// This chooses and displays the new dungeon image each time the 'Move Forward' btn is clicked.
const dungeonImageHandler = () => {
    let randCorridorNum = Math.floor(Math.random() * 8 + 1);
    if (prevImgNum[0] === randCorridorNum) {
        if (randCorridorNum === 8) {
            randCorridorNum--;
            DUNGEON_IMG.setAttribute('src', `/assets/images/corridor${randCorridorNum}.jpg`);
            prevImgNum[0] = randCorridorNum;
        } else {
            randCorridorNum++;
            DUNGEON_IMG.setAttribute('src', `/assets/images/corridor${randCorridorNum}.jpg`);
            prevImgNum[0] = randCorridorNum;
        }
    } else {
        DUNGEON_IMG.setAttribute('src', `/assets/images/corridor${randCorridorNum}.jpg`);
        prevImgNum[0] = randCorridorNum;
    }
};

const encounterMonster = () => {
    console.log('MONSTER ENCOUNTER!');
    NON_COMBAT_UI.classList.add('invisible');
    COMBAT_UI.classList.remove('invisible');
    MONSTER_HEALTH.classList.remove('invisible');
};

// Checking to see if the player encounters a monster or not
const checkMonsterModifier = () => {
    if (MONSTER_DATA.findMonsterModifier > 50) {
        let findMonsterCheckValue = MONSTER_DATA.findMonsterModifier + Math.floor(Math.random() * 50 + 1);
        console.log(findMonsterCheckValue);
        if (findMonsterCheckValue >= 100) {
            encounterMonster();
        } else if (findMonsterCheckValue > 50 && findMonsterCheckValue < 100) {
            if (MONSTER_DATA.showMonsterNearbyMessage) {
                modalAlert(`I hear something nearby...`);
                MONSTER_DATA.showMonsterNearbyMessage = false;
            } else {
                MONSTER_DATA.showMonsterNearbyMessage = true;
            }
        }
    }
};

// Triggered when the 'Move Forward' btn is clicked
const playerMovementHandler = () => {
    dungeonImageHandler();
    ROOM_DATA.searchedCurrentRoom = false;
    MONSTER_DATA.findMonsterModifier += 3;
    console.log('Find Monster Modifier: ' + MONSTER_DATA.findMonsterModifier);
    checkMonsterModifier();
};

const toggleModal = () => {
    MODAL_BACKDROP.classList.toggle('invisible');
};

const openModal = () => {
    MODAL_WINDOW.classList.remove('invisible');
    toggleModal();
};

const closeModal = () => {
    MODAL_WINDOW.classList.add('invisible');
    toggleModal();
};

const modalAlert = (message) => {
    MODAL_TEXT.textContent = message;
    openModal();
    MODAL_BTN.removeEventListener;
    MODAL_BTN.addEventListener('click', closeModal);
};

const gainPotion = () => {
    modalAlert(`You found a potion!`);
    PLAYER_DATA.playerPotionCount++;
    POTIONS_COUNTER.textContent = PLAYER_DATA.playerPotionCount;
};

// This swaps out the player's current weapon with the new one they just found.
const equipNewWeapon = (weapon, newWeaponLvl) => {
    // Has the player had this weapon before?
    if (!prevWeaponSet.has(weapon)) {
        // Validate if the found weapon is better or worse than current weapon
        if (newWeaponLvl > PLAYER_DATA.playerCurrentWeaponLvl) {
            // If found weapon is better, then take it
            modalAlert(`You found a(n) ${weapon}!`);
            prevWeaponSet.add(weapon);
            PLAYER_DATA.playerCurrentWeapon = weapon;
            PLAYER_DATA.playerCurrentWeaponLvl = newWeaponLvl;
            CURRENT_WEAPON_UI.textContent = weapon;
        } else {
            // If found weapon is not better, then leave it
            modalAlert(`You found a(n) ${weapon}, but who needs that?`);
            prevWeaponSet.add(weapon);
        }
    } else {
        modalAlert(`Just another rusty ${weapon}...`);
    }
};

// This determains which weapon the player found.
const selectNewWeapon = () => {
    let newWeapon = "";
    let weaponLvl;
    let randWeaponNum = Math.floor(Math.random() * 100 + 1);
    if (randWeaponNum <= 50) {
        newWeapon = "DAGGER";
        weaponLvl = WEAPON_DAGGER.weaponLvl;
    } else if (randWeaponNum > 50 && randWeaponNum <= 75) {
        newWeapon = "SWORD";
        weaponLvl = WEAPON_SWORD.weaponLvl;
    } else if (randWeaponNum > 75 && randWeaponNum <= 92) {
        newWeapon = "AXE";
        weaponLvl = WEAPON_AXE.weaponLvl;
    }  else if (randWeaponNum > 92) {
        newWeapon = "WAND";
        weaponLvl = WEAPON_WAND.weaponLvl;
    }
    equipNewWeapon(newWeapon, weaponLvl);
};

const badFindHandler = (num) => {
    if (num > 3) {
        modalAlert(`You found nothing.`);
    } else {
        modalAlert(`*LOUD NOISE* I hope nothing heard that...`);
        MONSTER_DATA.findMonsterModifier += 8;
    }
};

// This determains whether the good thing the player found is a weapon or a potion.
const goodFindHandler = (num) => {
    if (num > 8) {
        gainPotion();
    } else {
        selectNewWeapon();
    }
};

// Runs when the 'Search' btn is clicked
const searchDungeonHandler = () => {
    if (!ROOM_DATA.searchedCurrentRoom) {
        ROOM_DATA.searchedCurrentRoom = true;
        let randSearchNum1 = Math.floor(Math.random() * 10 + 1);
        let randSearchNum2 = Math.floor(Math.random() * 10 + 1);
        if (randSearchNum1 > 7) { // This determains if the player 'rolled' high enough to find something good or not.
            goodFindHandler(randSearchNum2);
        } else {
            console.log("BAD FIND");
            badFindHandler(randSearchNum2);
        }
    } else {
        modalAlert('Oops, you\'ve already searched this room!');
    }
};

BTN_START_GAME.addEventListener('click', startGameHandler);
MOVE_BTN.addEventListener('click', playerMovementHandler);
SEARCH_BTN.addEventListener('click', searchDungeonHandler);