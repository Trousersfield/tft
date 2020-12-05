import React from 'react'
import { cache as imageCache, importImages } from '../util/imageImporter'
import { costColor } from '../util/styles'

let unmounting = false
let debounce = null

class ChampionCostHeader extends React.Component {
  constructor (props){
    super(props)
    this.state= {
      width: 0,
      cost: this.props.cost
    }

    if (!imageCache['tiers']) {
      importImages('tiers')
    }
  }

  componentDidMount () {
    unmounting = false
    window.addEventListener('resize', this.sizeHeader)

    // set default window width value
    const vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
    this.setState({ width: vw - 18 })

    // size accordingly
    debounce = setTimeout(() => {
      this.sizeHeader()
      debounce = null
    }, 1500)
  }

  componentWillUnmount () {
    unmounting = true
    if (debounce) clearTimeout(debounce)
    window.removeEventListener('resize', this.sizeHeader)
  }

  sizeHeader = async () => {
    if (unmounting) {
      return
    }
    const width = document.getElementById('champ-header-lines')
    .getBoundingClientRect().width

    if (width !== this.state.width) this.setState({ width: width })
  }

  render () {
    const { width, cost } = this.state
    const strokeColor = costColor(cost, 'rgb')

    // svg sizing
    const center = width/2
    const resizeTrigger = Math.floor(width/10) // resize approx each 10px

    return (
      <div
        id="champ-header-lines"
        className="w-full flex justify-center relative"
      >
        <img
          src={imageCache.tiers['tier' + cost]}
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
            stroke={strokeColor} strokeWidth="2" fill="none" />
          <path
            d={`M 0 20
            H ${center-20}
            L ${center} 40
            L ${center+20} 20
            H ${width}`}
            stroke={strokeColor} strokeWidth="2" fill="none" />
          <path
            d={`M 10 24
            H ${center-10}
            L ${center} 34
            L ${center+10} 24
            H ${width-10}`}
          stroke={strokeColor} strokeWidth="2" fill="none" />
        </svg>
      </div>
    )
  }
}

export default ChampionCostHeader