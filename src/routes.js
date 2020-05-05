import React from 'react'

const Home = React.lazy(() => import('./views/Home'))
const Combs = React.lazy(() => import('./views/Combs'))
const Items = React.lazy(() => import('./views/Items'))
const ChampionsByTier = React.lazy(() => import('./views/ChampionsByTier'))
const ChampionProfile = React.lazy(() => import('./views/ChampionProfile'))
const PatchNotes = React.lazy(() => import('./views/PatchNotes'))
const PatchEffect = React.lazy(() => import('./views/PatchEffect'))

export default {
  mode: 'history',
  routes: [
    {
      path: '/combs',
      name: 'Combs',
      component: Combs,
      exact: true
    }, {
      path: '/items',
      name: 'Items',
      component: Items,
      exact: true
    }, {
      path: '/champions',
      name: 'Champions',
      component: ChampionsByTier,
      exact: true,
    }, {
      path: '/champions/profile/:championName',
      category: '/champions',
      name: 'Profile',
      component: ChampionProfile,
      exact: true
    }, {
      path: '/patch-notes',
      name: 'Patch Notes',
      component: PatchNotes,
      exact: true
    }, {
      path: '/patch-notes/classify/:patchNumber',
      category: '/patch-notes',
      name: 'Classify',
      component: PatchEffect,
      exact: true
    }, {
      path: '/',
      noMenu: true,
      component: Home,
      exact: true
    }
  ]
}