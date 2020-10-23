import React, { Suspense } from 'react'
import { cache as imageCache, importImages } from '../util/imageImporter'
import { costColor } from '../util/styles'
// import { NavLink } from 'react-router-dom'
import {
  GoStar,
  GoArrowUp,
  GoArrowDown,
  GoPrimitiveDot
} from 'react-icons/go'
// import axios from 'axios'


const Traits = React.lazy(() => import('./Traits'))
const TraitInfo = React.lazy(() => import('../components/TraitInfo'))

class Champion extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      showDetails: false,
      data: this.props.data
    }

    if (!imageCache['champions']) importImages('champions')
  }

  componentDidMount () {
    this.setState({ showDetails: this.props.showDetails })
  }

  toggleDetails () {
    this.setState(state => ({ showDetails: !state.showDetails }))
  }

  render () {
    const { championId, name, cost, traits } = this.props.champion
    const { tier1Count, tier2Count, tier3Count } = this.props.data
    const patchEffect = this.props.patchEffect
    const { showDetails } = this.state
    const color = costColor(cost)

    return (
      <div className="flex flex-col my-2">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex flex-wrap items-center">
            <div
              className={`relative bg-${color}-200 border-2 border-${color}-900
                w-56 flex flex-no-wrap items-center rounded-full cursor-pointer`}
              onClick={() => this.toggleDetails()}
            >
              <div className="overflow-hidden rounded-full">
                <img
                  src={imageCache['champions'][championId]}
                  alt={name}
                />
              </div>
              <div className="mx-auto">
                <p>{name}</p>
              </div>
              {patchEffect && <BuffOrNerf value={patchEffect}/>}
            </div>
            <div className="flex-shrink-0">
              <Suspense fallback={<div>Loading Traits ...</div>}>
                <Traits
                  traitIds={traits}
                />
              </Suspense>
            </div>
          </div>
          <div className={`flex flex-no-wrap items-center border-2
            border-${color}-500 rounded-full`}>
            <p className="pl-4 pr-2 text-center">Played</p>
            <div className={`w-64 flex justify-between p-3
              bg-${color}-500 font-bold text-white rounded-r-full`}>
              <StarsCount
                tierCount={1}
                quantity={tier1Count}
              />
              <StarsCount
                tierCount={2}
                quantity={tier2Count}
              />
              <StarsCount
                tierCount={3}
                quantity={tier3Count}
              />
            </div>
          </div>
        </div>
        {showDetails &&
        <>
          <div className="flex-1 flex flex-wrap">
            {traits.map((trait) =>
              <Suspense
                key={trait}
                fallback={<div>Loading Trait Info ...</div>}
              >
                <TraitInfo
                  trait={trait}
                />
              </Suspense>
            )}
          </div>
          {/*<div className="flex-grow-0">
            <NavLink
              to={`/champions/profile/${name}`}
              exact
              activeClassName="text-indigo-900 font-semibold border-b-2 border-indigo-900"
              className="p-2 mx-1"
            >
              Link to {name}
            </NavLink>
            </div>*/}
        </>}
      </div>
    )
  }
}

const StarsCount = (props) => {
  const stars = Array(props.tierCount).fill(0)
  const quantity = props.quantity
  return (
    <div className="flex flex-col w-1/3">
      <div className="inline-flex justify-center">
        {stars.map((x, index) =>
          <GoStar key={'star-' + index} className="my-auto"/>
        )}
      </div>
      <p className="text-center">{quantity || 0}</p>
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

export default Champion