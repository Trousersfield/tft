import React from 'react'
import { cache as imageCache, importImages } from '../util/imageImporter'
import leagues from '../util/leagues'
import { cache as dataCache } from '../util/setDataImporter'

const Dropdown = React.lazy(() => import('../components/Dropdown'))
const ChampionCategory = React.lazy(() => import('../components/ChampionCategory'))

class Champions extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      selectedLeague: 'diamond',
      championsByCost: dataCache['champions'].reduce((result, curr) => {
        result[result.length - curr.cost].push(curr)
        return result
      }, [[], [], [], [], []]),
      dropdownOptions: leagues.map(league => {
        return {
          selected: false,
          name: league.name,
          value: league.key
        }
      })
    }

    if (!imageCache['ranked-emblems']) importImages('ranked-emblems')
    if (!imageCache['champions']) importImages('champions')
  }

  componentDidMount () {
    console.log('did mount')
  }

  setSelected = (value) => {
    this.setState({ selectedLeague: value })
  }

  render () {
    const {selectedLeague, dropdownOptions, championsByCost } = this.state
    const imageName = leagues.find(league =>
      selectedLeague === league.key).image

    // console.log('selected league: ', selectedLeague)
    // console.log('dropdown options: ', dropdownOptions)

    return (
      <div className="flex flex-col">
        <div className="flex justify-between p-5">
          <div className="flex flex-no-wrap items-center">
            <p className="mr-3 text-lg">Frequently played Champions in</p>
            <Dropdown
              options={dropdownOptions}
              preselect={selectedLeague}
              onSelected={this.setSelected}
            />
          </div>
          <div className="w-12 h-12">
            <img
              src={imageCache['ranked-emblems'][imageName]}
              alt={imageName}
            />
          </div>
        </div>
        {championsByCost.map((champions, index) =>
          <ChampionCategory
            key={'champion-' + index}
            champions={champions}
            league={selectedLeague}
          />
        )}
      </div>
    )
  }
}

export default Champions