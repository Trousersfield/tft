import React, { Suspense } from 'react'
import { cache as imageCache, importImages } from '../util/imageImporter'

// components
const TeamsChart = React.lazy(() => import('../components/charts/TeamsChart'))

class Compositions extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }

    if (!imageCache['ranked-emblems']) {
      importImages('ranked-emblems')
    }
  }

  render () {
    return (
      <div className="lg:w-full xl:w-3/5 mx-auto pt-8 mb-10">
        <p className="italic text-white tracking-wide font-semibold text-lg mb-8 max-w-128 text-center">
          Absolute number of games where the following teams are played
        </p>
        <Suspense fallback={<div>Loading Comb...</div>}>
          <TeamsChart />
        </Suspense>
      </div>
    )
  }
}

export default Compositions