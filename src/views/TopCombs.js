import React, { Suspense } from 'react'
import { cache as imageCache, importImages } from '../util/imageImporter'
import { data as setData } from '../util/setDataImporter'
import http from '../util/http'

// components
const TopComb = React.lazy(() => import('../components/TopComb'))

class TopCombs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      allCombs: []
    }

    if (!imageCache['ranked-emblems']) {
      importImages('ranked-emblems')
    }
  }

  async componentDidMount () {
    const { data } = await http.get('topCombs', false)
    this.setState({ allCombs: data })
  }

  render () {
    const topCombs = this.state.allCombs.reduce((acc, curr) => {
      // TODO: think about removing .slice()
      // find most played champions
      let combChampions = JSON.parse(curr.TopCombChamps).sort((a, b) => a.count < b.count ? 1 : -1).slice(0, 8)

      // sort champions by cost
      combChampions = combChampions.sort((a, b) => setData.champions[a.championId].cost < setData.champions[b.championId].cost ? -1 : 1)

      acc.push({
        id: curr.id,
        name: curr.Name,
        champions: combChampions
      })
      return acc
    }, [])

    return (
      <div className="w-lg mx-auto">
        {topCombs.map(comb => (
          <Suspense key={comb.id}>
            <TopComb
              id={comb.id}
              name={comb.name}
              champions={comb.champions}
            />
          </Suspense>
        ))}
      </div>
    )
  }
}

export default TopCombs