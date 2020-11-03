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
      <div className="flex justify-between items-center m-2 p-1 shadow-lg">
        <div className="w-24 bg-orange-200">
          <p>
            {name}
          </p>

        </div>
        <div className="flex flex-no-wrap w-full">
          {champions.map(champion => (
            <div className="w-16 m-1" key={id + champion.championId}>
              <div className="border border-black">
                <img
                  src={imageCache.champions[champion.championId]}
                  alt=""
                  onMouseEnter={() => this.setChampionId(champion.championId)}
                  onMouseLeave={() => this.resetChampionId()}
                  // style={{width: imageSize.width, height: imageSize.height}}
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

export default TopComb