const VISUAL_CONTAINER = document.getElementById('visual-container');
const BTN_START_GAME = document.getElementById('start-game-btn');
const START_BTN_CONTAINER = document.getElementById('start-btn-ui-container');
const GAME_INFO_CONTAINER = document.getElementById('game-info-container');
const NON_COMBAT_UI = document.getElementById('non-combat-ui');
const MOVE_BTN = document.getElementById('move-btn');
const DUNGEON_IMG = document.getElementById('corridor-img');
// Initialize page with randomly selected first image to reduce delay upong 'Start Game'
DUNGEON_IMG.setAttribute('src', `/assets/images/corridor${Math.floor(Math.random() * 8 + 1)}.jpg`);

const H1 = document.querySelector('h1');

const prevImgNum = [];

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

const startGameHandler = () => {
    START_BTN_CONTAINER.classList.add('invisible');
    H1.classList.add('invisible');
    DUNGEON_IMG.classList.remove('invisible');
    GAME_INFO_CONTAINER.classList.remove('invisible');
    NON_COMBAT_UI.classList.remove('invisible');
};

BTN_START_GAME.addEventListener('click', startGameHandler);
MOVE_BTN.addEventListener('click', dungeonImageHandler);