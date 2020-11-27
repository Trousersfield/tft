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
  }

  setChampionId(id) {
    this.setState({ showChampionId: id })
  }

  componentDidMount () {
    let topItems = []
    let traits = {}

    for (const champion of this.props.champions) {
      const championTraits = setData.champions[champion.championId].traits
      if (championTraits) {
        for (const trait in championTraits) {
          if (traits[trait]) {
            traits[trait] += 1
          } else {
            traits[trait] = 1
          }
        }
      }

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
    const { id, name, champions, numberOfTopItems } = this.props

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
        <div className="flex flex-no-wrap mt-4">
          {champions.map(champion => (
            <div className="w-16 ml-2" key={id + champion.championId}>
              <div className="border border-black">
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
      </div>
    )
  }
}

export default MetaComposition