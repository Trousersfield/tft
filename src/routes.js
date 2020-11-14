import React from 'react'

const Compositions = React.lazy(() => import('./views/Compositions'))
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
    }, {
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
      component: Statistics
    }
  ]