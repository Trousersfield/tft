import React from 'react'
import { cache as imageCache, importImages } from '../util/imageImporter'
import Item from '../components/Item'

// components
const ChampionPopup = React.lazy(() => import('./ChampionPopup'))

class TopComb extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      topItems: [],
      showChampionId: null
    }

    if (!imageCache['ranked-emblems']) {
      importImages('ranked-emblems')
    }
    if (!imageCache['champions']) {
      importImages('champions')
    }
    if (!imageCache['items']) {
      importImages('items')
    }
  }

  setChampionId(id) {
    this.setState({ showChampionId: id })
  }

  resetChampionId() {
    this.setState({ showChampionId: null })
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
    const { id, name, champions, numberOfTopItems } = this.props

    const slicedTopItems = topItems.slice(0, numberOfTopItems)

    return (
      <div className="flex justify-between items-center m-2 pb-5">
        <div className="bg-red-400">
          {name}
        </div>
        <div className="flex flex-no-wrap">
          {champions.map(champion => (
            <div className="relative border border-black m-1 w-16 h-16" key={id + champion.championId}>
              <img
                src={imageCache['champions'][champion.championId]}
                alt=""
                title={champion.championId}
                onMouseEnter={() => this.setChampionId(champion.championId)}
                onMouseLeave={() => this.resetChampionId()}
                // style={{width: imageSize.width, height: imageSize.height}}
              />
              <div className="absolute inset-x-0 bottom-0 flex flex-no-wrap justify-center transform translate-y-6 bg-yellow-300">
                {slicedTopItems.filter(item => item.championId === champion.championId).map(item => (
                  <div
                    key={id + champion.championId + item.itemId}
                    className="w-1/3"
                  >
                    <Item
                      id={item.itemId}
                    />
                  </div>
                ))}
              </div>
              {showChampionId === champion.championId &&
              <ChampionPopup
                id={champion.championId}
                items={topItems.filter(i => i.championId === champion.championId)}
              />}
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default TopComb