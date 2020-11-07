import React from 'react'

const Champions = React.lazy(() => import('./views/Champions'))
const ChampionProfile = React.lazy(() => import('./views/ChampionProfile'))
const Compositions = React.lazy(() => import('./views/Compositions'))
const Home = React.lazy(() => import('./views/Home'))
const Items = React.lazy(() => import('./views/Items'))
const PatchNotes = React.lazy(() => import('./views/PatchNotes'))
const PatchEffect = React.lazy(() => import('./views/PatchEffect'))
const Statistics = React.lazy(() => import('./views/Statistics'))
const MetaCompositions = React.lazy(() => import('./views/MetaCompositions'))

export default {
  mode: 'history',
  routes: [
    {
      path: '/',
      noMenu: true,
      component: Home,
      exact: true
    },  {
      path: '/meta-compositions',
      name: 'metaCompositions',
      component: MetaCompositions,
      exact: true
    }, {
      path: '/team-compositions',
      name: 'teamCompositions',
      component: Compositions,
      exact: true
    }, {
      path: '/champions/profile/:championName',
      category: '/champions',
      name: 'profile',
      component: ChampionProfile,
      exact: true
    }, {
      path: '/patch-notes',
      name: 'patchNotes',
      component: PatchNotes,
      exact: true
    }, {
      path: '/patch-notes/classify/:patchNumber',
      category: '/patch-notes',
      name: 'classify',
      component: PatchEffect,
      exact: true
    }, {
      path: '/stats',
      name: 'stats',
      component: Statistics,
      exact: true
    }, {
      path: '/stats/items',
      category: '/stats',
      name: 'items',
      component: Items,
      exact: true
    }, {
      path: '/stats/champions',
      category: '/stats',
      name: 'champions',
      component: Champions,
      exact: true,
    }
  ]
}