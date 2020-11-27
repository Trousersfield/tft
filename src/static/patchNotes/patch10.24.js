module.exports = {
    number: '10.24',
    sourceUrl: 'https://na.leagueoflegends.com/en-us/news/game-updates/teamfight-tactics-patch-10-24-notes/',
    timestamp: new Date(),
    title: '',
    categories: [{
      title: 'Mid-Patch Updates',
      sections: [{
        title: 'Ashe Bugfix November 24',
        notes: [
            'Fixed a bug where Ashe was triggering on-attack effects too many times during Hunter’s Focus.'  
        ]
      }]
    }, {
      title: 'Systems',
      sections: [{
        title: '',
        notes: [
          'Base Player Damage Per Stage: 0/0/1/2/5/10/15 ⇒ 0/0/2/3/5/8/15',
          'Increased the base odds of rolling a chosen slightly.'
        ]
      }, {
        title: 'Chosen Roll Odds',
        notes: [
          'Level 4: 40/60/0/0/0 ⇒ 60/40/0/0/0',
          'Level 5: 20/50/30/0/0 ⇒ 40/55/5/0/0',
          'Level 6: 10/45/45/0/0 ⇒ 15/45/40/0/0',
          'Level 7: 0/30/40/30/0 ⇒ 0/40/55/5/0',
          'Level 8: 0/20/40/40/0 ⇒ 0/15/45/40/0',
          'Level 9: 0/0/30/40/30 ⇒ 0/0/15/45/40'
        ]
      }, {
        title: 'Normal Roll Odds',
        notes: [
            'Level 5: 45/30/20/5/0 ⇒ 45/33/20/2/0',
            'Level 6: 30/35/25/10/0 ⇒ 35/35/25/5/0',
            'Level 7: 19/35/30/15/1 ⇒ 24/35/30/10/1',
            'Level 8: 14/25/35/20/6 ⇒ 15/25/35/20/5'
        ]
        }, {
            title: 'Loot Distribution',
            notes: [
                'Lowered the variance in the initial loot drops from Stage 1, leading to a slight increase in total loot overall.',
                'Reduced the extreme variance in item distribution by one, which should lead to less extreme cases of similar item drops in a game.',
                'Grey Orbs average value increased very slightly, but lowered Neeko drop rates from them.'
            ]
            }]
    }, {
      title: 'Traits and Chosen',
      sections: [{
        title: 'Chosen',
        notes: [
          'Chosen Bonus Attack Damage: 30 ⇒ 20',
          'This affects Yasuo, Aphelios, Zed, Xin Zhao, Ashe, Jhin, Talon, and Warwick'
        ]
      }, {
        title: 'Traits',
        notes: [
          'Cultist: A Chosen Cultist now only provides +1 star level to Galio instead of double the Chosen’s star level.',
          'A 2-star Cultist Chosen improves Galio: +4 ⇒ +3',
          'A 3-star Cultist Chosen improves Galio: +6 ⇒ +4',
          'Fortune: Fixed an issue with one of the 11 loss drops being undervalued.',
          'Fortune: Slightly lowered the drop rate of Neeko’s Help from the 6 Fortune loot table.'
        ]
      }]
    }, {
      title: 'Champions',
      sections: [{
        title: 'Tier 1',
        notes: [
          'Diana Pale Cascade Shield: 200/300/450/650 ⇒ 200/300/400/500',
          'Lissandra Pale Cascade Damage: 350/450/600/900 ⇒ 350/450/600/800',
          'Nami Starting/Total Mana: 40/80 ⇒ 60/100',
          'Yasuo Striking Steel Damage: 160/190/225% ⇒ 180/200/225%'
        ]
      }, {
        title: 'Tier 2',
        notes: [
          'Aphelios Attack Damage: 45 ⇒ 50',
          'Aphelios Starting Mana: 40 ⇒ 50',
          'Lulu Wild Growth Knockup Duration: 1.5 ⇒ 1 second',
          'Lulu Wild Growth Duration: 6 seconds ⇒ rest of combat',
          'Refreshing Wild Growth on an ally now properly heals them for the Bonus Health gain amount and triggers the knockup effect',
          'Jarvan IV Dragon Strike Stun Duration: 2 ⇒ 1 second',
          'Jarvan IV Starting/Total Mana: 60/120 ⇒ 50/80',
          'Pyke Phantom Undertow Damage: 150/250/450 ⇒ 125/200/375',
          'Zed Attack Speed: 0.75 ⇒ 0.8'
        ]
      }, {
        title: 'Tier 3',
        notes: [
          'Akali Spell Damage: 150/225/350 ⇒ 175/250/400',
          'Jinx Chosen Bonus Stat: Spell Power ⇒ Mana',
          'Jinx Starting/Total Mana: 0/50 ⇒ 70/120',
          'Jinx Fishbones Stun: Jinx’s primary target ⇒ All targets in the 1 hex explosion',
          'Jinx Fishbones Stun Duration: 1.5/1.5/1.5 seconds ⇒ 1.5/2/2.5 seconds',
          'Jinx Fishbones Damage: 200/325/550 ⇒ 150/250/450',
          'Xin Zhao Starting/Total Mana: 40/80 ⇒ 30/60'
        ]
      }, {
        title: 'Tier 4',
        notes: [
          'Cassiopeia Starting/Total Mana: 60/120 ⇒ 80/150',
          'Cassiopeia Petrifying GazeDamage Amp: 10% ⇒ 20%',
          'Jhin Attack Damage: 85 ⇒ 100',
          'Talon Truestrike no longer refunds Mana on kill',
          'Talon Total Mana: 50 ⇒ 40',
          'Fixed a bug where Truestrike’s bonus damage could not critically strike',
          'Talon Truestrike Bonus Damage: 125/200/600 ⇒ 85/135/400',
          'Talon is no longer invulnerable during his leap (he is still unstoppable and untargetable)',
          'Talon\'s Leap has been sped up slightly',
          'Warwick Attack Damage: 70 ⇒ 85',
          'Warwick Attack Speed: 0.9 ⇒ 0.8',
          'Warwick’s howl on takedowns no longer fears nearby enemies. Instead, his howl grants himself and all allies who share a Trait with him 60/75/200% Attack Speed for 3 seconds'
        ]
      }, {
        title: 'Tier 5',
        notes: [
          'Azir Starting/Total Mana: 50/125 ⇒ 75/150',
          'Lee Sin Primary Stun Duration: 1.5/2/10 ⇒ 2/3/10 seconds',
          'Lee Sin Secondary Stun Duration: 1.5 ⇒ 1 second',
          'Sett Starting Mana: 70 ⇒ 100',
          'Yone: Seal Fate no longer knocks up enemies',
          'Yone now becomes untargetable during his cast',
          'Yone Seal Fate Damage: 800/1300/9999 ⇒ 600/1200/9999',
          'Yone Unforgotten Base Damage: 250/400/1000 ⇒ 200/400/1000',
          'Yone Seal Fate Armor and MR Shred: 60% ⇒ 90%',
          'Yone Total Mana: 80 ⇒ 50',
          'Fixed a bug where Yone could become unresponsive after casting Seal Fate',
          'Fixed a bug where Yone\'s resistances reduced would not update correctly if the target’s Armor or Magic Resist changed while the shred was active.'
        ]
      }]
    }, {
      title: 'Items',
      sections: [{
        title: '',
        notes: [
          'ZZ’Rot Portal Construct Attack Damage: 150 ⇒ 100'
        ]
      }]
    }, {
      title: 'Bugs',
      sections: [{
        title: '',
        notes: [
          'Addressed an issue where ghost armies with the Hunter Trait occasionally activated the Hunter attack instantly upon combat starting.',
          'The Hunter Trait will no longer fire its first attack one second early.',
          'Zilean now correctly de-prioritizes casting his spell on summoned units (ie: Azir’s soldiers)',
          'The following Attacks can now correctly Miss (Blind) and be Dodged: Talon’s Truestrike, Yasuo’s Striking Steel, Xin Zhao’s Crescent Guard, Wukong’s Crushing Blow, and Ashe’s Hunter’s Focus',
          'Fiora will no longer sometimes change targets after casting her spell',
          'Fixed various issues around attempting to purchase a Chosen with a full bench'
        ]
      }]
    }]
  }