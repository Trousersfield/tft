import React, { Suspense } from 'react'
import { cache as imageCache, importImages } from '../util/imageImporter'
import { data as setData } from '../util/setDataImporter'
import http from '../util/http'

// components
const MetaComposition = React.lazy(() => import('../components/MetaComposition'))

class MetaCompositions extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      metaTeams: [],
      numberOfTopItems: 6
    }

    this.handleIncrease = this.handleIncrease.bind(this)
    this.handleDecrease = this.handleDecrease.bind(this)

    if (!imageCache['ranked-emblems']) {
      importImages('ranked-emblems')
    }
  }

  handleIncrease() {
    if (this.state.numberOfTopItems < 24) {
      this.setState({ numberOfTopItems: this.state.numberOfTopItems + 1 })
    }
  }

  handleDecrease() {
    if (this.state.numberOfTopItems > 1) {
      this.setState({ numberOfTopItems: this.state.numberOfTopItems - 1 })
    }
  }

  async componentDidMount() {
    const { data } = await http.get('topCombs', false)

    if (data) {
      const metaTeams = data.reduce((acc, curr) => {
        // TODO: think about removing .slice()
        // find most played champions
        let champions = JSON.parse(curr.TopCombChamps).sort((a, b) => a.count < b.count ? 1 : -1).slice(0, 8)

        // sort champions by cost
        champions = champions.sort((a, b) => setData.champions[a.championId].cost < setData.champions[b.championId].cost ? -1 : 1)

        acc.push({
          id: curr.id,
          name: curr.Name,
          champions: champions,
          traits: JSON.parse(curr.TraitCount).map(t => ({
            id: t.key.replace('Set4_', ''),
            count: t.value
          }))
        })
        return acc
      }, [])

      this.setState({ metaTeams })
    }
  }

  render () {
    const menuItemClassNames = 'flex items-center justify-center text-gray-100'
    const { numberOfTopItems, metaTeams } = this.state

    return (
      <div className="w-md mx-auto mb-64">
        <div className="">
          {metaTeams.map(team => (
            <Suspense key={team.id}>
              <MetaComposition
                id={team.id}
                name={team.name}
                champions={team.champions}
                traits={team.traits}
                numberOfTopItems={numberOfTopItems}
              />
            </Suspense>
          ))}
        </div>

        <div className="fixed left-0 top-0 flex flex-col w-16 border-2 border-gray-500 rounded-full
          transform translate-x-2 translate-y-20 overflow-hidden select-none">
          <div className={menuItemClassNames + ' font-semibold mt-4'}>
            Items
          </div>
          <div
            className={menuItemClassNames + ' cursor-pointer hover:text-green-300 text-3xl'}
            onClick={this.handleIncrease}
          >
            +
          </div>
          <div
            className={menuItemClassNames + ' cursor-pointer hover:text-green-300 text-4xl'}
            onClick={this.handleDecrease}
          >
            -
          </div>
        </div>
      </div>
    )
  }
}

export default MetaCompositions