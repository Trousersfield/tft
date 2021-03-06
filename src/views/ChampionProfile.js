import React from 'react'
import { cache as imageCache, importImages } from '../util/imageImporter'
import { costColor } from '../util/styles'
import { data as setData } from '../util/setDataImporter'

class ChampionProfile extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      champion: null
    }

    if (!imageCache.champions) {
      importImages('champions')
    }
  }

  componentDidMount () {
    // nicht sicher, ob das klappt
    const champion = setData.champions[this.state.champion.championId]
    this.setState({ champion })
  }

  render () {
    const champion = this.state.champion
    if (!champion) return (<div></div>)
    const color = costColor(champion.cost)

    return (
      <div className="flex justify-center m-5">
        <div className="flex flex-col sm:w-4/5 md:w-2/3 lg:w-1/2 xl:w.1/2 shadow-lg">
          <div className="w-full h-20 relative bg-green-300">
            Background with Image of Champ
            <div className={`absolute bottom-0 left-0 overflow-hidden
              rounded-full w-16 h-16 bg-blue-500 border-4 border-${color}-900`}>
              <img
                src={imageCache.champions[champion.championId]}
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