import React, { Suspense } from 'react'
import { cache as imageCache, importImages, getImageName } from '../util/imageImporter'
import { costColor } from '../util/styles'

import DATA from '../static/championPopularityDiamond.json'

const Champion = React.lazy(() => import('./Champion.js'))

let debounce = null
let unmounting = false

class ChampionCategory extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      champions: this.props.champions,
      league: this.props.league,
      patchEffects: this.props.patchEffects,
      data: [],
      width: 0
    }

    if (!imageCache['champions']) importImages('champions')
    if (!imageCache['tiers']) importImages('tiers')
    if (!imageCache['other']) importImages('other')
  }

  async componentDidMount () {
    await this.loadData()
    window.addEventListener('resize', this.sizeHeader)

    // set default window width value
    const vw = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
    this.setState({ width: vw - 18 })

    // size accordingly
    debounce = setTimeout(this.sizeHeader, 1500)
  }

  componentWillUnmount () {
    unmounting = true
    if (debounce) {
      clearTimeout(debounce)
      debounce = null
    }
    window.removeEventListener('resize', this.sizeHeader)
  }

  sizeHeader = async () => {
    if (unmounting) return
    const width = document.getElementById('champ-header-lines')
    .getBoundingClientRect().width

    if (width !== this.state.width) this.setState({ width: width })
    debounce = null
  }

  async loadData () {
    if (this.state.loading) return
    new Promise(resolve => {
      // load data here!
      const rawData = DATA
      this.setState({ data: rawData }, () => { resolve() })
    })
  }

  championData (id) {
    return this.state.data.find(entry => entry.championId === id) || []
  }

  render () {
    const { champions, width, patchEffects } = this.state
    const cost = champions[0].cost
    const imageName = getImageName(`tier${cost}`)
    const strokeColor = costColor(cost)

    // svg sizing
    const center = width/2
    const resizeTrigger = Math.floor(width/10) // resize approx each 10px

    return (
      <div
        id="champ-category-wrapper"
        className="flex flex-col w-full"
      >
        <div
          id="champ-header-lines"
          className="w-full flex justify-center relative"
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
        {champions.map((champion, index) =>
          <Suspense
            key={'champion-entry-' + champion.championId}
            fallback={<div>Loading Champion ...</div>}
          >
            <Champion
              champion={champion}
              data={this.championData(champion.championId)}
              patchEffect={patchEffects ? patchEffects[champion.championId] : null}
            />
          </Suspense>
        )}
      </div>
    )
  }
}

export default ChampionCategory