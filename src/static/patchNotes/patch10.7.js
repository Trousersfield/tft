module.exports = {
  number: '10.7',
  sourceUrl: 'https://euw.leagueoflegends.com/en-gb/news/game-updates/tft-patch-10-7-notes/',
  timestamp: new Date(),
  title: '',
  categories: [{
    title: 'System',
    sections: [{
      title: 'Galaxies Mechanic',
      notes: [
        'The Neekoverse: Everyone gets two free copies of Neeko’s Help.',
        'Lilac Nebula: The first carousel contains only four cost units.',
        'Medium Legends: Little Legends are larger and you have +25 starting health.'
      ]
    }, {
      title: 'Other System Stuff',
      notes: [
        'Shop Level 8 Drop Rates: 13/20/35/25/7% ⇒ 14/20/35/25/6%',
        'The rules for which items stay and which bounce off when combining champions now prioritizes items on champs on the board over those you get from the carousel.',
        'The odds of seeing a “special” carousel has been reduced.',
        'Removed the additional 5 seconds per planning phase that is done at the start of each set. Timers are now back to normal.'
      ]
    }]
  }, {
    title: 'Traits',
    sections: [{
      notes: [
        'Blademaster chance to activate: 30%/55% ⇒ 30%/60%',
        'Brawler Health: 300/750 ⇒ 300/700',
        'Chrono Attack Speed: 15%/35%/65% ⇒ 15%/35%/75%',
        '(Rework) Dark Star: When a Dark Star Champion dies, all other allied Dark Star Champions gain +25 (3), +35 (6) Attack Damage and Spell Power',
        '(Rework) Mana-Reaver Reworked to: (2) bonus is now: Mana-Reaver attacks increase the mana cost of their target’s next spell by 40%. There is no longer a 4-piece bonus.',
        'Mystic Magic Resist: 30/120 ⇒ 35/105',
        'Sniper Bonus Damage: 12% ⇒ 15%'
      ]
    }]
  }, {
    title: 'Champions',
    sections: [{
      title: 'Tier 1 Champions',
      notes: [
        'Caitlyn Spell Cast time: 1.5 seconds ⇒ 1.1',
        'Caitlyn now resumes attacking more quickly after firing her bullet',
        'Xayah Attack Speed: 0.75 ⇒ 0.8',
        'Ziggs Total Mana: 40 ⇒ 45',
        'Zoe Starting Mana/Total: 90/120 ⇒ 70/100',
        'Zoe Spell Damage: 150/225/300 ⇒ 150/225/400'
      ]
    }, {
      title: 'Tier 2 Champions',
      notes: [
        'Darius Health: 650 ⇒ 750',
        'Xin Zhao Total Mana: 50 ⇒ 60',
        'Xin Zhao Spell Damage: 175/250/350 ⇒ 200/275/375'
      ]
    }, {
      title: 'Tier 3 Champions',
      notes: [
        'Ezreal Total/Starting Mana: 60/120 ⇒ 50/125',
        'Ezreal Spell Damage: 250/350/700 ⇒ 200/300/600',
        'Kassadin Total Mana: 100 ⇒ 80',
        'Shaco Spell Bonus Damage: 250%/325%/450% ⇒ 250%/325%/400%',
      ]
    }, {
      title: 'Tier 4 Champions',
      notes: [
        'Soraka Total Mana: 150 ⇒ 125',
        'Soraka Spell Healing: 300/450/2000 ⇒ 350/500/2000',
        'Vel\'koz Total Mana: 80 ⇒ 70',
        'Wukong Health: 850 ⇒ 950'
      ]
    }, {
      title: 'Tier 5 Champions',
      notes: [
        'Aurelion Sol Spell Damage: 120/175/750 ⇒ 100/150/750',
        'Aurelion Sol’s target selection per fighter launched is now random (from weighted random favoring nearby)',
        'Ekko Spell Damage: 250/450/2000 ⇒ 225/400/2000',
        'Gangplank Starting/Total Mana: 50/150 ⇒ 75/175',
        'Gangplank Spell Damage: 650/850/9001 ⇒ 450/600/9001',
        'Lulu Attack Speed: 0.85 ⇒ 0.8'
      ]
    }, {
      title: 'Miss Fortune',
      notes: [
        'Attack Speed: 1.1 ⇒ 1.0',
        'Mana: 50/150 ⇒ 75/175',
        'Spell Damage: 70%/90%/999% ⇒ 60%/80%/999%'
      ]
    }]
  }, {
    title: 'Items',
    sections: [{
      notes: [
        'Morellonomicon & Redbuff Burn Damage: 30% ⇒ 27%',
        'Statikk Shiv Damage: 75 ⇒ 80',
        'Warmogs Health Regen: 4% ⇒ 5%'
      ]
    }]
  }, {
    title: 'Miscellaneous',
    sections: [{
      notes: [
        'Ekko, Irelia, Lucian, Xin Zhao, and Ekko’s attacks performed as a part of their spell can now trigger the effects of Statikk Shiv, Guinsoo’s Rageblade, and Runaan’s Hurricane.',
        'Champions now celebrate when they are victorious in combat.',
        'Graves’ Splash Art has been updated to more closely match his in-game model.'
      ]
    }],
  }, {
    title: 'Bugfixes',
    sections: [{
      notes: [
        'Hand of Justice healing no longer scales with AP',
        'Rebel Shield no longer scales with AP',
        'Lucian’s Relentless Pursuit now properly counts as an attack for the purposes of the Blaster Trait',
        'Fixed an issue where Miss Fortune would sometimes not turn during Bullet Time if there were no enemies being hit by her cone',
        'Aurelion Sol now works properly after GA triggers.',
        'Clarified Shaco’s spell tooltip: the ability causes a critical hit on top of the spell’s bonus damage',
        'Updated Zoe’s tooltip to specify she deals magic damage.',
        'Updated Poppy’s tooltip to specify she deals magic damage.',
        'Hextech Gunblade now correctly heals when dealing damage against shields',
        'Space Pirates no longer generate gold from attempting to deal lethal damage to Fiora while she’s invulnerable.'
      ]
    }]
  }, {
    title: 'Mobile Corner',
    sections: [{
      notes: [
        'We\'ve made some changes to the way phone keyboards work. You shouldn\'t notice any difference unless things get better, in which case: You\'re Welcome.',
        'Mysterious account errors during login have been unmasked and destroyed. Begone!',
        'When you\'ve completed all your available missions you will see a fun little pengu friend instead of...a bunch of completed missions you didn\'t care about.',
        'No more mysterious enemy missing pings. Or any pings, why did we even have pings?'
      ]
    }]
  }]
}