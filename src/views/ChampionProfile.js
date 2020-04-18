import React from 'react'
import { cache as imageCache, importImages, getImageName } from '../util/imageImporter'
import { costColor } from '../util/styles'
import { cache as dataCache } from '../util/setDataImporter'

class ChampionProfile extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      champion: null
    }

    if (!imageCache['champions']) importImages('champions')
  }

  componentDidMount () {
    const championName = this.props.match.params.championName
    const champion = dataCache['champions'].find(c => c.name === championName)
    this.setState({ champion })
  }

  render () {
    const champion = this.state.champion
    if (!champion) return (<div></div>)
    const imageName = getImageName(champion.name)
    const color = costColor(champion.cost)

    return (
      <div className="flex justify-center m-5">
        <div className="flex flex-col sm:w-4/5 md:w-2/3 lg:w-1/2 xl:w.1/2 shadow-lg">
          <div className="w-full h-20 relative bg-green-300">
            Background with Image of Champ
            <div className={`absolute bottom-0 left-0 overflow-hidden
              rounded-full w-16 h-16 bg-blue-500 border-4 border-${color}-900`}>
              <img
                src={imageCache['champions'][imageName]}
                alt={champion.name}
              />
            </div>
          </div>
          <div className="w-full h-32 bg-yellow-300 flex flex-col">
            <div className="font-semibold text-lg text-center">{champion.name}</div>
            <div>Content</div>
          </div>
        </div>
      </div>
    )
  }
}

export default ChampionProfile