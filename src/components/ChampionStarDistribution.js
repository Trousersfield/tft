import React, { Suspense } from 'react'
import { cache as imageCache, importImages } from '../util/imageImporter'
import { costColor } from '../util/styles'
import { data as setData } from '../util/setDataImporter'
// import { NavLink } from 'react-router-dom'
import {
  GoStar,
  GoArrowUp,
  GoArrowDown,
  GoPrimitiveDot
} from 'react-icons/go'

// components
const ChampionPopup = React.lazy(() => import('./ChampionPopup'))

class ChampionStarDistribution extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      data: this.props.data,
      showChampionPopup: false
    }

    if (!imageCache.champions) {
      importImages('champions')
    }
  }

  setChampionId (id) {
    console.log('set id: ', id)
    this.setState({ showChampionId: id })
  }

  render () {
    const { championId, tier1Count, tier2Count, tier3Count } = this.props.data
    const { patchEffect, relativeWidth } = this.props
    const { showChampionId } = this.state
    const color = costColor(setData.champions[championId].cost)
    const sum = tier1Count + tier2Count + tier3Count

    const w1 = (tier1Count / sum) * 100 - 1/relativeWidth
    const w2 = (tier2Count / sum) * 100
    const w3 = (tier3Count / sum) * 100 + 1/relativeWidth

    return (
      <div className="bg-gray-800 p-3 rounded flex space-x-3 items-center">
        <div className={`w-12 h-12 border-2 border-${color}`}>
          <img src={imageCache.champions[championId]} alt="" />
        </div>
        <div className="w-5/6 space-y-2">
          <div className="flex rounded overflow-hidden" style={{width: `${relativeWidth*100}%`}}>
            <div className="bg-gray-100 h-3" style={{width: `${w1}%`}} />
            <div className="bg-blue-500 h-3" style={{width: `${w2}%`}} />
            <div className="bg-yellow-500 h-3" style={{width: `${w3}%`}} />
          </div>
          <div className="flex" style={{width: `${relativeWidth*100}%`}}>
            <div className="" style={{width: `${w1}%`}}>
              <Stars count={1}/>
            </div>
            <div className="" style={{width: `${w2}%`}}>
              <Stars count={2} />
            </div>
            <div className="" style={{width: `${w3}%`}}>
              <Stars count={3} />
            </div>
          </div>
        </div>
      </div>
    )
    // return (
    //   <div className="flex flex-col my-2">
    //     <div className="flex flex-wrap items-center justify-between">
    //       <div className="flex flex-wrap items-center">
    //         <div
    //           className={`relative bg-${color}-200 border-2 border-${color}-900
    //             w-56 flex flex-no-wrap items-center rounded-full`}
    //         >
    //           <div className="overflow-hidden rounded-full">
    //             <img
    //               src={imageCache.champions[championId]}
    //               alt={name}
    //               onMouseEnter={() => this.setChampionId(championId)}
    //               onMouseLeave={() => this.setChampionId(null)}
    //             />
    //           </div>
    //           <div className="mx-auto">
    //             <p>{name}</p>
    //           </div>
    //           {patchEffect && <BuffOrNerf value={patchEffect}/>}
    //           {showChampionId === championId &&
    //             <ChampionPopup
    //               id={championId}
    //             />
    //           }
    //         </div>
    //       </div>
    //       <div className={`flex flex-no-wrap items-center border-2
    //         border-${color}-500 rounded-full`}>
    //         <p className="pl-4 pr-2 text-center text-white">Played</p>
    //         <div className={`w-64 flex justify-between p-3
    //           bg-${color}-500 font-bold text-white rounded-r-full`}>
    //           <StarsCount
    //             tierCount={1}
    //             quantity={tier1Count}
    //           />
    //           <StarsCount
    //             tierCount={2}
    //             quantity={tier2Count}
    //           />
    //           <StarsCount
    //             tierCount={3}
    //             quantity={tier3Count}
    //           />
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // )
  }
}

const Stars = (props) => {
  const stars = Array(props.count).fill(0)
  return (
    <div className="inline-flex justify-center text-white">
      {stars.map((x, index) =>
        <GoStar key={'star-' + index}/>
      )}
    </div>
  )
}

const BuffOrNerf = (props) => {
  const { value } = props
  const classes = "w-6 h-6 absolute pr-2 right-0 my-auto z-10"

  switch (value) {
    case 'buff':
      return (
        <GoArrowUp
          className={`${classes} text-green-500`}
          title='Buffed last patch'
        />
      )
    case 'nerf':
      return (
        <GoArrowDown
          className={`${classes} text-red-500`}
          title='Nerfed last patch'
        />
      )
    case 'neutral':
      return (
        <GoPrimitiveDot
          className={`${classes} text-blue-600`}
          title='Affected last patch'
        />
      )
    default:
      return (
        null
      )
  }
}

export default ChampionStarDistribution