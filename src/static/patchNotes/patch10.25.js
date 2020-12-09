module.exports = {
    number: '10.25',
    sourceUrl: 'https://na.leagueoflegends.com/en-us/news/game-updates/teamfight-tactics-patch-10-25-notes/',
    timestamp: new Date(),
    title: '',
    categories: [{
      title: 'Systems',
      sections: [{
        title: 'Bench overflow changes',
        notes: [
          'If your bench is full when you return from Carousel, the extra champion will be sold automatically at the end of planning. Don’t worry, a message and red highlight will show you which champion can’t sit with cool kids. Selling any champion or increasing your team size will allow for more space for another benchwarmer or MVP.'
        ]
      }, {
        title: 'Base Roll Percentages',
        notes: [
          'Level 7: 24/35/30/10/1 ⇒ 22/35/30/12/1'
        ]
      }]
    }, {
      title: 'Traits',
      sections: [{
        title: '',
        notes: [
          'Divine Damage Reduction and True Damage: 50% ⇒ 45%',
          'Elderwood Armor and Magic Resist Stat Growth: 15/25/40 ⇒ 20/30/40',
          'Mage Spell Power: 80/110/180% ⇒ 80/120/180%',
          'Vanguard Armor: 100/250/600/1500 ⇒ 120/300/750/2000'
        ]
      }]
    }, {
      title: 'Champions',
      sections: [{
        title: 'Tier 1',
        notes: [
          'Diana Pale Cascade Orbs: 4/5/6/9 ⇒ 4/5/6/8',
          'Fiora Total Mana: 85 ⇒ 75',
          'Fiora Riposte Damage: 200/300/450 ⇒ 250/400/600',
          'Lissandra 1000 Daggers Damage: 350/450/600/800 ⇒ 350/450/550/750',
          'Maokai Armor: 35 ⇒ 40',
          'Maokai Magic Resist: 20 ⇒ 30',
          'Wukong Crushing Blow Attack Damage Ratio: 225/250/275% ⇒ 250/265/280%'
        ]
      }, {
        title: 'Tier 2',
        notes: [
          'Aphelios Attack Damage: 50 ⇒ 45',
          'Fixed a bug that prevented Aphelios’ turrets from firing during Hunter Trait activation',
          'Hecarim Total Mana: 120 ⇒ 110',
          'Jarvan IV Total Mana: 80 ⇒ 100',
          'Sylas Chain Lash Damage: 250/400/600/1000 ⇒ 250/400/700/1111',
          'Vi Denting Blows Armor Reduction: 50/75/100% ⇒ 40/60/80%',
          'Vi Total Mana: 60 ⇒ 50'
        ]
      }, {
        title: 'Tier 3',
        notes: [
          'Evelynn Execute Multiplier: 3 ⇒ 2.5',
          'Evelynn Last Caress Damage: 350/500/1400 ⇒ 350/600/1500',
          'Kalista Attack Speed: 1.0 ⇒ 0.9',
          'Fixed issues that caused Kalista to execute too early or too late. This includes her interactions with shields, damage reduction (e.g. Divine), and damage amplification (e.g. Hand of Justice, Giantslayer, Sword of the Divine).',
          'Lux Chosen Stat: Mana ⇒ Spell Power',
          'Xin Zhao Attack Speed: 0.8 ⇒ 0.85',
          'Xin Zhao Crescent Guard Attack Damage: 300/325/350% ⇒ 330/340/350%',
          'Yuumi Health: 600 ⇒ 650'
        ]
      }, {
        title: 'Tier 4',
        notes: [
          'Talon Health: 750 ⇒ 800',
          'Talon Truestrike Attack Damage Percent: 200/200/250% ⇒ 240/250/275%',
          'Warwick Primal Hunger Lifesteal: 50/50/200% ⇒ 40/40/200%'
        ]
      }, {
        title: 'Tier 5',
        notes: [
          'Kayn Reaper Damage: 400/600/6666 ⇒ 375/575/6666',
          'Sett: Showstopper will no longer fail if something happens to Sett’s target (unstoppable, untargetable, etc.) during its animation. Now it will still deal the AOE secondary damage but the primary target will continue to be unaffected.'
        ]
      }]
    }, {
      title: 'Items',
      sections: [{
        title: '',
        notes: [
          'Last Whisper Armor Reduction: 75% ⇒ 80%'
        ]
      }]
    }, {
      title: 'Other',
      sections: [{
        title: '',
        notes: [
          'The camera will now reset zoom level to default whenever the player view changes. (both PC and mobile)'
        ]
      }]
    }, {
      title: 'Bugs',
      sections: [{
        title: '',
        notes: [
          'Fixed Galio bugs: Zekes, Locket, and Chalice can no longer buff Galio. Zephyr will not try (and fail) to hit Galio.',
          'Fixed an issue where Lissandra’s hair would stick out of the side of her head like a baguette.',
          'Fixed a bug where Runaan’s Hurricane could fail to shoot at enemies that were extremely far away.',
          'Fixed a bug where Kalista would re-apply spell power to her execute which resulted in overkill damage.',
          'Fixed an issue where Warwick’s Hunter proc would delay his next attack at high attack speeds.',
          'Fixed a bug where Warwick was not triggering On Attack effects (Rageblade, Shiv) on his Hunter attacks .'
        ]
      }]
    }]
  }