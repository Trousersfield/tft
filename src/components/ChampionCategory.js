import React from 'react'
import { cache as imageCache, importImages, getImageName } from '../util/imageImporter'

class ChampionCategory extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      data: this.props.data
    }

    if (!imageCache['champions']) importImages('champions')
  }

  render () {
    const data = this.state.data

    return (
      <div className="flex flex-col">
        <div className="flex flex-no-wrap">
          <div className="p-2">ICON</div>
          <div className="p-2">costs</div>
          <div className="p-2">line</div>
        </div>
        {data.map(champion =>
          <Champion
            key={'champion-entry-' + champion.championId}
            data={champion}
          />
        )}
      </div>
    )
  }
}

const Champion = (props) => {
  const { name, championId, cost, traits } = props.data
  const imageName = getImageName(name)
  console.log('image name: ', imageName)

  return (
    <div className="flex flex-no-wrap">
      <div className="p-2">
        <img
          src={imageCache['champions'][imageName]}
          alt={name}
        />
      </div>
      <div className="p-2">name: {name}</div>
      <div className="p-2">cost: {cost}</div>
      <div className="p-2">
        traits: {traits.map((trait, index) =>
        <div key={'trait-' + index + '-' + championId}>
          {trait}
        </div>
      )}
      </div>
    </div>
  )
}

export default ChampionCategory