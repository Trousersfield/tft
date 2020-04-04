import React from 'react'

const Combs = React.lazy(() => import('./views/Combs'))
const Items = React.lazy(() => import('./views/Items'))
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
      path: '/patch-notes',
      name: 'Patch Notes',
      component: PatchNotes,
      exact: true
    }
  ]
}