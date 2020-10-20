import React from 'react'
import { cache as imageCache, importImages } from '../util/imageImporter'

// components

class TopComb extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: this.props.id,
      name: this.props.name,
      champions: this.props.champions
    }

    if (!imageCache['ranked-emblems']) {
      importImages('ranked-emblems')
    }
    if (!imageCache['champions']) {
      importImages('champions')
    }
  }

  render () {
    const { id, name, champions } = this.state

    return (
      <div className="lg:w-full xl:w-3/5 mx-auto pt-10">
        {name}
        <div className="flex flex-no-wrap">
          {champions.map(champion => (
            <ChampionCard
              key={id + champion.championId}
              combId={id}
              {...champion}
            />
          ))}
        </div>
      </div>
    )
  }
}

const ChampionCard = (champion) => {
  const { combId, championId, count, itemCounts } = champion
  console.log('item counts: ', itemCounts)

  return (
    <div className="relative">
      <img
        src={imageCache['champions'][championId]}
        alt=""
        title={championId}
        // style={{width: imageSize.width, height: imageSize.height}}
      />
      {itemCounts.length > 0 ?(
        <div class="absolute inset-x-0 bottom-0">
          {itemCounts.map(item => (
            <div key={combId + championId + item.itemId}>
              {item.name}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export default TopComb