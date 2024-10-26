export type Release = {
  version: string;
  date: string;
  features: string[];
  fixes: string[];
  attachments?: string[];
};

export const LAST_RELEASE: Release = {
  version: '2.74.0',
  date: '2024-10-28',
  features: [
    'The ascension system is here! After reaching the top rank and winning some tournaments, you can ascend your brute and collect ears. Each ascension allows you to choose a perk you unlocked, but at level 1, replacing it in your destiny by stats.',
  ],
  fixes: [
    'Hitting a trapped brute now stuns it',
    'Throwing chances are now influenced by the weapon hit speed. THe more hit speed, the less likely the weapon is to be thrown',
    '`Chef` poison disabled for backup brutes',
    'Achievements disabled for event brutes (retroactive)',
    'Wrong achievement count in some cases (retroactive)',
    'Event brutes removed from the padawan rankings',
    'Clan points recalculation after resetting a brute could remove points instead of adding them',
    'Some fights crashes when damaging immune pets',
    'Level up button hidden after reaching the max level for event brutes',
    'Random skills/weapons are now seeded per brute, which should increase the randomness and avoid similar unlocks for most brutes',
    'The last patch note read is now stored server-side, meaning that dismissing it on one device will dismiss it on all devices',
    'The last fight watched in the even tournament is now stored server-side, meaning that watching a fight on one device will mark it as watched on all devices',
  ],
  attachments: [],
};

export const releases: Release[] = [
  LAST_RELEASE,
  {
    version: '2.73.0',
    date: '2024-09-27',
    features: [
      'Thread creators can now delete their threads, along with their clan master',
      'Thread creators can now edit their threads',
      '`Treat` has been reworked. In addition to the heal, it now makes the pet immune to the next attack and makes it attack next',
      'A new tab has been added to the ranking page, displaying event brutes',
    ],
    fixes: [
      'Losing a fight with an event brute now gives half a level instead of 0 XP',
      'Event brutes can now be sacrificed whenever, after the first day, though they don\'t give any gold',
      'Gendered pronouns have been replaced with neutral ones. Please notify me if you find any remaining',
      'Backups are now disabled in events',
      'Many minor visual fixes regarding the events',
      'Brutal Legends rank up notification now displays the correct rank',
      'The Focus daily modifier now correctly prevents backup brutes from being targeted',
      'New untrap animation',
      'Event brutes now show the event icon instead of the ranking icon',
      'Gold doesn\'t visually decrease anymore when using a free reset'
    ],
    attachments: [],
  },
  {
    version: '2.72.0',
    date: '2024-09-01',
    features: [
      'Recurring events are now available! The first one implemented is a Battle Royale. Have fun discovering the new event!',
      'Used fighters are now displayed on the clan war page',
      'Fighters are now displayed below clan war fights',
      'Clans can be ordered by points or elo on the clan ranking page',
      'The PioPio has been reworked, it now gives 50% Evasion and 50% Disarm. Thrown weapons that have a disarm bonus can now disarm.'
    ],
    fixes: [
      'Clan wars now store the correct winner for each fight',
      'Brutes with pets gain the HP they lost back in clan wars, since pets are not allowed',
      'Points from brute ranks are now correctly given to clans upon joining',
      'Beating a boss now rerolls another one without needing to fight the beaten one in an additional fight',
      'Changed your own brute highlight color in the daily tournament view for color blind users',
      'Elo changes are now correctly displayed on the clan war page',
      'Clan names are now clickable on the clan war page',
      'Some obscure conditions allowed pets in clan wars, it has been fixed',
      'Wins and losses are displayed in the clan war history',
      'Winning more than half of the required points in a clan war ends the war instead of waiting for the last fight',
      'Clan searches now wait for you to stop typing before searching',
      'Weapon and skill randomness increased when rolling the respective modifiers',
      'The modifier doubling agility now correctly displays the doubled value',
      'The clan war history table doesn\'t overflow on mobile anymore',
      'The correct loser is now displayed if a brute dies at the same time as its pet',
    ],
    attachments: [],
  },
  {
    version: '2.70.0',
    date: '2024-08-07',
    features: [
      'You can now declare friendly clan wars. The clan master can declare a friendly war from the opponent clan page. No rewards are given, but it\'s a good way to practice and have fun!',
    ],
    fixes: [
      '`Flash flood` now correctly throws 3 weapons',
      '`Flash flood` deals less damage and triggers less often',
      'When arriving in a fight with a weapon equipped, you now have less chances to throw it away immediately',
      'Brute ranks now have double the impact on clan points',
      'Defender clans who don\'t select their fighters can\'t select them on a later fight anymore',
      'Removed the follow button on your own brutes cell',
    ],
    attachments: [],
  },
  {
    version: '2.69.0',
    date: '2024-08-05',
    features: [
      'Clan wars are now enableable by the clan master, and clans are matched based on their current elo',
    ],
    fixes: [
      '`Shock` unlock percentage lowered',
      '`Iron Head` disarm buffed from 30% to 50%',
      '`Relentless` unlock percentage increased',
      '`Flash flood` was reworked. It deals more damage, has more uses, more chances to trigger, and throws 3 weapons',
      '`Shield` unlock percentage lowered',
      '10% Evasion added to `Ballet Shoes`',
      'Speed now affects the initiative (more chances to start the fight first the more speed you have)',
      'The weapon `Axe` was renamed to `Hammer`, and `Hatchet` to `Axe`',
      'The weapon `Axe` (previously `Hatchet`) is now considered a sharp weapon',
      'Some new combat log texts',
      'Maaaaany fixes for the previous server issues',
      '`Vampirism` works against bosses',
      'Pets don\'t attack their teammates after hypnosis anymore',
      'Logs in the user feed are now clickable and redirect to the brute cell',
      'The daily modifier `Armed and Ready` now correctly forces brutes to start with a weapon, even if the roll would have failed',
      'A backup brute with `Chef` now only poisons the ennemies upon arrival',
      'Updated Evasion and Counter stat colors',
    ],
    attachments: [],
  },
  {
    version: '2.68.0',
    date: '2024-08-02',
    features: [
      'Clan wars are here! Declare war on another clan and fight for the top spot. Clan master can declare war from the clan ranking page. Once the war is accepted, both clans will have to select 7 fighters to participate each day. Once a brute participates, it is unavailable for selection for the remainder of the war. The war will last 7 day, and the clan with the most fight wins will be the winner. The reward for now is 1000 clan points, but more rewards will be added in the future.',
    ],
    fixes: [
      'User achievements now include achievements from deleted brutes',
      '`Vampirism` got tired of listing the decimals of PI, and is now rounded'
    ],
    attachments: ['clan-declare-war.png', 'clan-war-preview.png', 'clan-war-page.png'],
  },
  {
    version: '2.67.0',
    date: '2024-07-30',
    features: [
      'Swiftness was renamed to Dexterity',
      'A login button was added smack in the middle of the cell, no more "I can\'t fight anymore"',
      '8 new achievements were added, happy hunting!',
      '`Vampirism` now deals 25% of your own missing HP, and heals from 100% to 200% of the damage dealt',
      'You can now add a fight as a favorite on the fight page, and it will be displayed on your user page. Everyone starts with 5 favorite slots, more will be unlockable in the future as rewards',
      'A new following system was added, you can now follow brutes and see their level ups and rankups in your feed (link in your profile)',
    ],
    fixes: [
      'Temporary boosters now correctly change the stats displayed in the cell',
      '`Determination` doesn\'t trigger another hit after a missed counter attack anymore',
      '`Counter attack` was not correctly implemented and gave 90% reversal chance when wielding a shield, it now gives 90% reversal chance after a block, like intended',
      '`Backup` cannot be selected as a temporary skill anymore',
      '`Regeneration` works as soon as you unlock it, not the next day',
      'DinoRPG rewards are now also applied to brutes who never fought before',
      '`Deflect` incorrectly gave 30% reversal instead of 30% deflection',
      '`Treat` can\'t be used on trapped pets anymore',
      'Being stunned now prevents you from countering',
      'Brute ranks are now displayed in the hall',
      'Stunned brutes now wake up after taking any kind of damage, not only melee',
      'Fight logs now have randomized texts, share your funny name + log combo with us on Discord!',
    ],
    attachments: ['favorite-fight.png', 'following-feed.png'],
  },
  {
    version: '2.64.1',
    date: '2024-07-11',
    features: [
      'The brute creation date is now displayed on the brute cell',
      'A new skill has been added: `Repulse`',
      'Clan brutes can now be reordered',
      'New admin panel to manage user bans and monitor multi-accounts',
      'Defeating a clan boss increases the clan points by 1000'
    ],
    fixes: [
      'The armor stat now works as a percentage, reducing the damage taken by that percentage',
      '`Counter attack` now gives 90% reversal chance after a block',
      '`Sabotage` now triggers 90% of the time',
      '`Fierce Brute` didn\'t work on throws in some edge cases, it now works as intended',
      'DinoRPG rewards now require you to have at least one brute',
      '`Chaining` now correctly resets the chain on throws and skill hits',
      'The stats at the moment of the fight are now displayed when hovering on a brute in the tournament page, instead of the current stats',
      'Some brutes were displaying the wrong clothing colors in fights, it has been fixed',
      'Stats linked to the 3 main stats (strength, agility, and speed) are now displayed in the same color as the stat',
    ],
    attachments: ['creation-date.png', 'repulse.png', 'reorder-clan-brutes.png'],
  },
  {
    version: '2.62.0',
    date: '2024-07-06',
    features: [
      'You can lock a brute appearance when creating a new brute',
      'The HP calculation is now displayed when hovering over the HP in your cell',
      '5 new modifiers have been added to the daily rotation: Low gravity, Lucky skill, Lucky weapon, Honorable Combat, and Armed and Ready',
    ],
    fixes: [
      'Every weapon now has a 1/28 chance to be thrown, instead of depending on the weapon damage',
      '`Fierce Brute` works on thrown weapons',
      '`Vampirism` deals 50% of your own missing HP',
      'Brute dying due to damage from deflected weapons stop throwing when they die',
      'The modifier `Endless supplies` had a very low chance to not work, it now works as intended',
      'Modifiers have a 4/30 chance to spawn every day. Multiple modifiers can spawn, up to 4',
    ],
    attachments: ['lock-creation.png', 'hp-calc.png'],
  },
  {
    version: '2.61.0',
    date: '2024-06-14',
    features: [
      'Patch notes are now available in the game, check them out in the footer',
    ],
    fixes: [
      'Tournaments gains are correctly given every night',
      'Logs are now correctly ordered by date',
      'Fights don\'t crash when using a `Bomb` anymore',
      'Achievement counts between the user page and the ranking page are now consistent',
    ],
    attachments: ['patch-notes.png'],
  },
  {
    version: '2.60.1',
    date: '2024-06-11',
    features: [
      'We were getting close to the database limit on the amount of fights, so the whole storing system was changed. The previous fights and logs have been purged, the tournament history will not be accurate for tournaments up to this date.',
      'You can now pause the modifier notification by clicking on it.'
    ],
    fixes: [
      'The frying pan can now deflect projectiles',
      'Deflecting uses the current weapon animation',
      'Improved hard to read colors in dark mode',
      'The missing piopio texture has been fixed',
      'Vampirism doesn\'t work on bosses anymore',
    ],
  }
];
