import React from 'react'
import { cache as imageCache, importImages, getImageName } from '../util/imageImporter'
import { costColor } from '../util/styles'

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
          <div className="flex-1">
            {tier1Count}
            {tier2Count}
            {tier3Count}
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

export default Champion