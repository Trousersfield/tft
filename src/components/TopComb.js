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
    console.log('comb name: ', name)
    console.log('champs: ', champions)

    return (
      <div className="lg:w-full xl:w-3/5 mx-auto pt-10">
        {name}
        {champions.map(champion => (
          <ChampionCard
            key={id + champion.championId}
            {...champion}
          />
        ))}
      </div>
    )
  }
}

const ChampionCard = (champion) => {
  console.log('champion: ', champion)
  const { championId, count, itemCounts } = champion
  console.log('id: ', championId)
  console.log('count: ', count)
  console.log('items: ', itemCounts)
  console.log('image cache champs: ', imageCache['champions'])

  return (
    <div>
      {championId}
      <img
        src={imageCache['champions'][championId]}
        alt=""
        // style={{width: imageSize.width, height: imageSize.height}}
      />
    </div>
  )
}

export default TopComb