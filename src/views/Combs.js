import React, { Suspense } from 'react'
import Data from '../static/ComboStatsDiamond.json'
import { cache as imageCache, importImages } from '../util/imageImporter'

const CombChart = React.lazy(() => import('../components/charts/CombChart'))

class Combs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      data: []
    }

    if (!imageCache['ranked-emblems']) importImages('ranked-emblems')
  }

  componentDidMount () {
    this.setState({ loading: true })
    /* const { data } = await axios.get(
      "http://localhost:3000/comboStats/diamond") */
    this.setState({ data: Data, loading: false })
  }

  render () {
    const { data, loading } = this.state
    const betaData = [
      { name: 'diamond', data: data }
    ]

    if (loading) {
      return (
        <p>Loading Data...</p>
      )
    }

    return (
      <div>
        <Suspense fallback={<div>Loading Comb...</div>}>
          <CombChart
            key={'comb-chart-' + data.name}
            data={data}
          />
        </Suspense>
      </div>
    )
  }
}

export default Combs