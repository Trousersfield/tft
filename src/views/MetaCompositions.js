import React, { Suspense } from 'react'
import { cache as imageCache, importImages } from '../util/imageImporter'
import { data as setData } from '../util/setDataImporter'
import http from '../util/http'
import Button from '../elements/Button'

// components
const MetaComposition = React.lazy(() => import('../components/MetaComposition'))

class MetaCompositions extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      allCompositions: [],
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
    this.setState({ allCompositions: data })
  }

  render () {
    const { numberOfTopItems, allCompositions } = this.state
    const metaCompositions = allCompositions.reduce((acc, curr) => {
      // TODO: think about removing .slice()
      // find most played champions
      let champions = JSON.parse(curr.TopCombChamps).sort((a, b) => a.count < b.count ? 1 : -1).slice(0, 8)

      // sort champions by cost
      champions = champions.sort((a, b) => setData.champions[a.championId].cost < setData.champions[b.championId].cost ? -1 : 1)

      acc.push({
        id: curr.id,
        name: curr.Name,
        champions: champions
      })
      return acc
    }, [])

    return (
      <div className="w-md lg:w-lg flex flex-col lg:flex-row justify-between mx-auto">
        <div className="flex flex-grow flex-row lg:flex-col order-1 lg:order-2">
          <p className="text-gray-900 p-2 border-b-2 border-gray-900 text-lg font-semibold">Options</p>
          <div className="flex items-center mt-2">
            <p className="w-1/2">Number of items</p>
            <span className="w-1/2 flex items-center border-2 border-gray-600">
              <Button
                text="-"
                color="gray"
                onClick={this.handleDecrease}
              />
              <p className="mx-3 font-bold text-gray-900">
                {numberOfTopItems}
              </p>
              <Button
                text="+"
                color="gray"
                onClick={this.handleIncrease}
              />
            </span>
          </div>
        </div>
        <div className="order-2 lg:order-1">
          {metaCompositions.map(comb => (
            <Suspense key={comb.id}>
              <MetaComposition
                id={comb.id}
                name={comb.name}
                champions={comb.champions}
                numberOfTopItems={numberOfTopItems}
              />
            </Suspense>
          ))}
        </div>
      </div>
    )
  }
}

export default MetaCompositions