import React, { Suspense } from 'react'
import Data from '../static/ComboStatsDiamond.json'
import { cache as imageCache, importImages } from '../util/imageImporter'

const BarChart = React.lazy(() => import('../components/BarChart'))

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
        {betaData.map((league) =>
          <div key={'league-comb-wrapper-' + league.name}>
            <Suspense key={'loading-league-header-' + league.name}>
              <LeagueHeader
                key={'league-header-' + league.name}
                leagueName={league.name}
              />
            </Suspense>
            <Suspense key={'loading-comb-chart-' + league.name}
              fallback={<div>Loading Comb...</div>}>
              <BarChart
                key={'comb-chart-' + league.name}
                data={league.data}
              />
            </Suspense>
          </div>
        )}
      </div>
    )
  }
}

const LeagueHeader = (props) => {
  const importName = props.leagueName.charAt(0).toUpperCase() + props.leagueName.slice(1)
  return (
    <div className="flex justify-between p-5">
      <div className="flex flex-no-wrap">
        <div>Frequently played Combs in {props.leagueName}</div>
      </div>
      <div className="w-8 h-8">
        <img
          src={imageCache['ranked-emblems'][`./Emblem_${importName}.png`]}
          alt="country_flag"
        />
      </div>
    </div>
  )
}

export default Combs