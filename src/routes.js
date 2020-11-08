import React from 'react'

// const Champions = React.lazy(() => import('./views/Champions'))
// const ChampionProfile = React.lazy(() => import('./views/ChampionProfile'))
const Compositions = React.lazy(() => import('./views/Compositions'))
// const Items = React.lazy(() => import('./views/Items'))
const PatchNotes = React.lazy(() => import('./views/PatchNotes'))
// const PatchEffect = React.lazy(() => import('./views/PatchEffect'))
const Statistics = React.lazy(() => import('./views/Statistics'))
const MetaCompositions = React.lazy(() => import('./views/MetaCompositions'))

export default [{
      path: '/meta-compositions',
      name: 'Meta Teams',
      component: MetaCompositions,
      exact: true
    }, {
      path: '/team-compositions',
      name: 'Teams',
      component: Compositions,
      exact: true
    },// {
      // path: '/champions/profile/:championName',
      // // category: '/champions',
      // name: 'Profile',
      // component: ChampionProfile,
      // exact: true
    //}, {
    {
      path: '/patch-notes',
      name: 'Patch Notes',
      component: PatchNotes,
      exact: true
    },// {
    //   path: '/patch-notes/classify/:patchNumber',
    //   // category: '/patch-notes',
    //   name: 'Classify',
    //   component: PatchEffect,
    //   exact: true
    //}, {
    {
      path: '/stats',
      name: 'Statistics',
      component: Statistics,
      exact: true
    }//, {
    //   path: '/stats/items',
    //   // category: '/stats',
    //   name: 'Items',
    //   component: Items,
    //   exact: true
    // }, {
    //   path: '/stats/champions',
    //   // category: '/stats',
    //   name: 'Champions',
    //   component: Champions,
    //   exact: true,
    // }
  ]