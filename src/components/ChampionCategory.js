import React from 'react'
import { cache as imageCache, importImages, getImageName } from '../util/imageImporter'

const Champion = React.lazy(() => import('./Champion.js'))

class ChampionCategory extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      champions: this.props.champions,
      data: this.props.data,
      width: 0
    }

    if (!imageCache['champions']) importImages('champions')
    if (!imageCache['tiers']) importImages('tiers')
    if (!imageCache['other']) importImages('other')
  }

  componentDidMount () {
    window.addEventListener('resize', this.sizeHeader)

    // set default window width value
    const vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
    this.setState({ width: vw - 18 })

    // size accordingly
    setTimeout(this.sizeHeader, 1000)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.sizeHeader)
  }

  sizeHeader = async () => {
    console.log('sizing header')
    // await this.waitABit()
    const width = document.getElementById('champ-header-lines')
      .getBoundingClientRect().width

    if (width !== this.state.width) this.setState({ width: width })
  }

  championData (id) {
    return this.state.data.find(entry => entry.championId === id)
  }

  render () {
    const { champions, width } = this.state
    const cost = champions[0].cost
    const imageName = getImageName(`tier${cost}`)

    // svg sizing
    const center = width/2
    const resizeTrigger = Math.floor(width/10) // resize approx each 10px

    return (
      <div
        id="champ-category-wrapper"
        className="flex flex-col w-full"
      >
        <div
          key={width}
          className="flex-1 h-4 bg-red-500">
          {width}
        </div>
        <div
          id="champ-header-lines"
          className="w-full flex justify-center relative bg-yellow-500"
        >
          <img
            src={imageCache['tiers'][imageName]}
            alt={`Tier ${cost}`}
            className="absolute top-0"
          />
          <svg
            key={resizeTrigger}
            className="w-full h-12"
          >
            <path
              d={`M 25 16
              H ${center-30}
              L ${center} 46
              L ${center+30} 16
              H ${width-25}`}
              stroke="blue" strokeWidth="2" fill="none" />
            <path
              d={`M 0 20
              H ${center-20}
              L ${center} 40
              L ${center+20} 20
              H ${width}`}
              stroke="red" strokeWidth="2" fill="none" />
            <path
              d={`M 10 24
              H ${center-10}
              L ${center} 34
              L ${center+10} 24
              H ${width-10}`}
            stroke="green" strokeWidth="2" fill="none" />
          </svg>
        </div>
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