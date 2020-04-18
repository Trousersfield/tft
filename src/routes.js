import React from 'react'

const Combs = React.lazy(() => import('./views/Combs'))
const Items = React.lazy(() => import('./views/Items'))
const ChampionsByTier = React.lazy(() => import('./views/ChampionsByTier'))
const ChampionProfile = React.lazy(() => import('./views/ChampionProfile'))
const PatchNotes = React.lazy(() => import('./views/Patchnotes'))

export default {
  mode: 'history',
  routes: [
    {
      path: '/',
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
    }
  ]
}