import React from 'react'
import { cache as imageCache, importImages } from '../util/imageImporter'

// components

class TopComb extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: this.props.id,
      name: this.props.name,
      champions: this.props.champions,
      numberOfTopItems: this.props.numberOfTopItems,
      topItems: []
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

  componentDidMount () {
    let topItems = []

    for (const champion of this.state.champions) {
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
    const { id, name, champions, topItems, numberOfTopItems } = this.state

    const slicedTopItems = topItems.slice(0, numberOfTopItems)

    return (
      <div className="flex justify-between items-center m-2 pb-5">
        <div className="bg-red-400">
          {name}
        </div>
        <div className="flex flex-no-wrap">
          {champions.map(champion => (
            <div className="relative border border-black m-1" key={id + champion.championId}>
              <img
                src={imageCache['champions'][champion.championId]}
                alt=""
                title={champion.championId}
                // style={{width: imageSize.width, height: imageSize.height}}
              />
              <div className="absolute inset-x-0 bottom-0 flex flex-no-wrap justify-center transform translate-y-6 bg-yellow-300">
                {slicedTopItems.filter(item => item.championId === champion.championId).map(item => (
                  <div
                    key={id + champion.championId + item.itemId}
                    className="w-1/3"
                  >
                    <img
                      src={imageCache.items[item.itemId]}
                      alt=""
                      title={item.itemId}
                    />
                  </div>
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