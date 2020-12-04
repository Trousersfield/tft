import React from 'react'
import { cache as imageCache, importImages } from '../util/imageImporter'
import { data as setData } from '../util/setDataImporter'
import Item from './Item'

// components
const ChampionPopup = React.lazy(() => import('./ChampionPopup'))

class MetaComposition extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      topItems: [],
      showChampionId: null
    }

    if (!imageCache['ranked-emblems']) {
      importImages('ranked-emblems')
    }
    if (!imageCache.champions) {
      importImages('champions')
    }
    if (!imageCache.items) {
      importImages('items')
    }
    if (!imageCache.traits) {
      importImages('traits')
    }
  }

  setChampionId(id) {
    this.setState({ showChampionId: id })
  }

  componentDidMount () {
    let topItems = []

    for (const champion of this.props.champions) {
      const topThreeItems = champion.itemCounts
        .sort((a, b) => a.count > b.count ? -1 : 1)
        .slice(0, 3)
        .map(x => ({ championId: champion.championId, ...x }))

      topItems = topItems.concat(topThreeItems)
    }

    topItems = topItems.sort((a, b) => a.count > b.count ? -1 : 1)

    this.setState({ topItems })
  }

  render () {
    const { topItems, showChampionId } = this.state
    const { id, name, champions, traits, numberOfTopItems } = this.props

    // will be changed in the future
    const teamName = name.trim().split(' ').reduce((acc, curr) => {
      curr = curr.replace('Set4_', '')
      acc = acc + (curr === 'Chosen' ? curr : setData.traits[curr].name) + ' '
      return acc
    }, '')

    const slicedTopItems = topItems.slice(0, numberOfTopItems)

    return (
      <div className="relative my-4 border-2 border-gray-300 rounded h-28">
        <div className="absolute top-0 transform -translate-y-1/2 translate-x-6 bg-gray-900 px-3">
          <p className="whitespace-no-wrap font-semibold text-lg tracking-widest text-gray-100">
            {teamName.trim()}
          </p>
        </div>
        <div className="flex">
          <div className="flex-1 flex flex-no-wrap mt-4">
            {champions.map(champion => (
              <div className="w-16 ml-2" key={id + champion.championId}>
                <div
                  className="border-2 border-gray-300"
                >
                  <img
                    src={imageCache.champions[champion.championId]}
                    alt=""
                    onMouseEnter={() => this.setChampionId(champion.championId)}
                    onMouseLeave={() => this.setChampionId(null)}
                  />

                  {showChampionId === champion.championId &&
                  <ChampionPopup
                    id={champion.championId}
                    items={topItems.filter(i => i.championId === champion.championId)}
                  />}
                </div>
                <div className="flex flex-no-wrap justify-center mt-1">
                  {slicedTopItems.filter(item => item.championId === champion.championId).map(item => (
                    <Item
                      key={id + champion.championId + item.itemId}
                      id={item.itemId}
                      size="w-1/3"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="w-48 mt-1 text-white flex flex-wrap justify-center">
            {traits.map(trait => (
              trait.count > 1 &&
              <div
                key={id + trait.id}
                className="relative w-10 h-10 flex items-center justify-center cursor-default text-white m-1 border-2 border-gray-300 rounded-full"
                title={setData.traits[trait.id].name}
              >
                <div className="w-6 h-6 flex justify-center items-center">
                  <img src={imageCache.traits[trait.id.toLowerCase()]} alt=""/>
                </div>
                <p className="absolute right-0 bottom-0 font-semibold text-lg transform translate-y-2 rounded-full bg-gray-900">
                  {trait.count}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default MetaComposition