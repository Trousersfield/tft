import React from 'react'
import leagues from '../util/leagues'
import { cache as imageCache, importImages } from '../util/imageImporter'

const Dropdown = React.lazy(() => import('../elements/Dropdown'))

class LeagueSelector extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      selected: this.props.preselect,
      dropdownOptions: leagues.map(league => {
        return {
          selected: false,
          name: league.name,
          value: league.key
        }
      })
    }

    if (!imageCache['ranked-emblems']) {
      importImages('ranked-emblems')
    }
    if (!imageCache.champions) {
      importImages('champions')
    }
  }

  setSelected = (value) => {
    this.setState({ selected: value })
    this.props.onSelected(value)
  }

  render () {
    const { selected, dropdownOptions } = this.state
    const imageName = leagues.find(league =>
      selected === league.key).image

    return (
      <div className="flex flex-no-wrap p-5">
        <div className="w-12 h-12 mr-4">
          <img
            src={imageCache['ranked-emblems'][imageName]}
            alt={imageName}
            className="w-12"
          />
        </div>
        <div className="flex flex-no-wrap items-center">
          <p className="mr-3 text-lg sm:hidden">Frequently played Champions in</p>
          <Dropdown
            options={dropdownOptions}
            preselect={selected}
            onSelected={this.setSelected}
            size="sm"
          />
        </div>
      </div>
    )
  }
}

export default LeagueSelector