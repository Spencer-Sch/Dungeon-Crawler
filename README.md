# A dungeon crawler game

Day 1
* Built out HTML structure.
* Built out initial CSS.
    * Visually arranged HTML content.
    * Styled buttons.

Day 2
* Added dungeon image functionality:
    * A random image will be selected at game start.
    * "Move Forward" button now randomly cycles the current image.
    * Added logic to ensure the same image will not be selected twice in a row.
* Style changes:
    * Image container changed to black.
    * Text colors added to "game-info" span tag content.

Day 3
* Added "dungeonData" object to store game data.
    * Added constants for easy object access.
* Began adding "Search" button logic.
    * "goodFindHandler" logic started.
        * "gainPotion" functionality added.
        * "gainWeapon" functionality started.
    * Added check so "Search" can only be executed once per room.
        * Modal window is now triggered if player attemtps to search in the same room more than once.

Day 4
* Adjusted percentages for 'good find' or 'bad find' selection.
* Added weapon selection logic for when the player finds a new weapon inside of a 'good find' occurence.
    * Added modal window alerts to inform the player of what they have found.
    * Added logic to swap out the player's old weapon for the newly found weapon.
        * Needs work.  found-weapon-alerts are not responding to weapon-exclusivity-logic.
* Attempting to use a Set to keep track of all weapons the player has previously aquired.