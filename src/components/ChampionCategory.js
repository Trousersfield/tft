import React from 'react'
import { cache as imageCache, importImages, getImageName } from '../util/imageImporter'

const Champion = React.lazy(() => import('./Champion.js'))

class ChampionCategory extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      champions: this.props.champions,
      data: this.props.data
    }

    if (!imageCache['champions']) importImages('champions')
    if (!imageCache['tiers']) importImages('tiers')
    if (!imageCache['other']) importImages('other')
  }

  championData (id) {
    return this.state.data.find(entry => entry.championId === id)
  }

  render () {
    const { champions } = this.state
    const cost = champions[0].cost
    const imageName = getImageName(`tier${cost}`)

    return (
      <div className="flex flex-col">
        <div className="flex flex-no-wrap">
          <div className="flex-none">
            <img
              src={imageCache['tiers'][imageName]}
              alt={`Tier ${cost}`}
            />
          </div>
          <div className="flex-none">{cost} Gold</div>
          <div className="flex-1">line</div>
        </div>
        {champions.map((champion, index) =>
          <Champion
            key={'champion-entry-' + champion.championId}
            champion={champion}
            data={this.championData(champion.championId)}
          />
        )}
      </div>
    )
  }
}

export default ChampionCategory