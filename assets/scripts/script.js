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
            },
            sword: {
                baseAtkDmg: 15,
                normalAtkModifier: 10,
                bigAtkModifier: 15,
                specialAtk: null, // make a function?
                // rarityModifier: 5,
            },
            axe: {
                baseAtkDmg: 20,
                normalAtkModifier: 20,
                bigAtkModifier: 30,
                specialAtk: null, // make a function?
                // rarityModifier: 10,
            },
            wand: {
                baseAtkDmg: 0,
                normalAtkModifier: 0,
                bigAtkModifier: 0,
                specialAtk: null, // spend all potions = insta kill
                // rarityModifier: 25,
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
        playerPrevWeapons: [],
    },
    monsterData: {
        monsterCount: 0,
        monsterModifier: 0,
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
PLAYER_DATA.playerPrevWeapons = prevWeaponSet;

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
    ROOM_DATA.searchedCurrentRoom = false;
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

const gainPotion = () => {
    PLAYER_DATA.playerPotionCount++;
    POTIONS_COUNTER.textContent = PLAYER_DATA.playerPotionCount;
};

const modalAlert = (message) => {
    MODAL_TEXT.textContent = message;
    openModal();
    MODAL_BTN.removeEventListener;
    MODAL_BTN.addEventListener('click', closeModal);
};

// HAVING PROBLEM: there is some sort of disconnect between what weapons the player has found/currnetly has and what appears in modal text alerts when searching the dungeon.
// This swaps out the player's current weapon with the new one they just found.
const equipNewWeapon = (weapon) => {
    if (!prevWeaponSet.has(weapon)) {
        modalAlert(`You found a(n) ${weapon}!`);
        prevWeaponSet.add(PLAYER_DATA.playerCurrentWeapon);
        PLAYER_DATA.playerCurrentWeapon = weapon;
        CURRENT_WEAPON_UI.textContent = PLAYER_DATA.playerCurrentWeapon;
    } else {
        modalAlert(`Just another rusty ${weapon}...`);
    }
    console.log("your new weapon is:" + PLAYER_DATA.playerCurrentWeapon);
    console.log(PLAYER_DATA.playerPrevWeapons);
};

// This determains which weapon the player found.
const selectNewWeapon = () => {
    let newWeapon = "";
    let randWeaponNum = Math.floor(Math.random() * 100 + 1);
    if (randWeaponNum <= 50) {
        newWeapon = "DAGGER"
    } else if (randWeaponNum > 50 && randWeaponNum <= 75) {
        newWeapon = "SWORD";
    } else if (randWeaponNum > 75 && randWeaponNum <= 92) {
        newWeapon = "AXE";
    }  else if (randWeaponNum > 92) {
        newWeapon = "WAND";
    }
    equipNewWeapon(newWeapon);
};

// const badFindHandler = (num) => {

// };

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
        console.log('Good vs Bad Find Number:' + randSearchNum1);
        if (randSearchNum1 > 7) { // This determains if the player 'rolled' high enough to find something good or not.
            goodFindHandler(randSearchNum2);
        } else {
            console.log("BAD FIND");
            // badFindHandler(randSearchNum2);
        }
    } else {
        modalAlert('Oops, you\'ve already searched this room!');
    }
};

BTN_START_GAME.addEventListener('click', startGameHandler);
MOVE_BTN.addEventListener('click', dungeonImageHandler);
SEARCH_BTN.addEventListener('click', searchDungeonHandler);