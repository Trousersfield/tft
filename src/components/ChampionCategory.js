import React from 'react'
import { cache as imageCache, importImages } from '../util/imageImporter'

const Champion = React.lazy(() => import('./Champion.js'))

class ChampionCategory extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      champions: this.props.champions,
      data: this.props.data
    }

    if (!imageCache['champions']) importImages('champions')
  }

  championData (id) {
    return this.state.data.find(entry => entry.championId === id)
  }

  render () {
    const { champions } = this.state
    const cost = champions[0].cost

    return (
      <div className="flex flex-col">
        <div className="flex flex-no-wrap">
          <div className="p-2">ICON</div>
          <div className="p-2">{cost} Gold</div>
          <div className="p-2">line</div>
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