import React from 'react'
import { cache as imageCache, importImages, getImageName } from '../util/imageImporter'
import { costColor } from '../util/styles'
import { GoStar } from 'react-icons/go'

const Traits = React.lazy(() => import('./Traits'))

class Champion extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      showDetails: false
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
    const { name, cost, traits } = this.props.champion
    const { tier1Count, tier2Count, tier3Count } = this.props.data
    const { showDetails } = this.state
    const imageName = getImageName(name)
    const color = costColor(cost)

    return (
      <div className="flex flex-col mx-4 my-2">
        <div className="flex flex-no-wrap items-center">
          <div
            className={`bg-${color}-200 border-2 border-${color}-900
              w-1/6 flex flex-no-wrap items-center rounded-full cursor-pointer`}
            onClick={() => this.toggleDetails()}
          >
            <div className="overflow-hidden rounded-full">
              <img
                src={imageCache['champions'][imageName]}
                alt={name}
              />
            </div>
            <div className="mx-auto">
              <p>{name}</p>
            </div>
          </div>
          <div className="flex-1">
            <Traits
              data={traits}
            />
          </div>
          <div className={`w-1/3 flex flex-no-wrap items-center border-2
            border-${color}-500 rounded-full`}>
            <p className="px-3">Star Count</p>
            <div className={`flex-1 flex justify-between p-3 tracking-wider
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
          <div>
            Hi! I will contain details!
          </div>}
      </div>
    )
  }
}

const StarsCount = (props) => {
  const stars = Array(props.tierCount).fill(0)
  const quantity = props.quantity
  return (
    <div className="flex flex-no-wrap">
      <div className="inline-flex justify-center mr-1">
        {stars.map((x, index) =>
          <GoStar key={'star-' + index} className="m-auto"/>
        )}
      </div>
      <p className="text-center">{quantity}</p>
    </div>
  )
}

export default Champion