import React from 'react'
import { cache as dataCache } from '../util/setDataImporter'
import axios from 'axios'

const LeagueSelector = React.lazy(() => import('../components/LeagueSelector'))
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
      patchEffects: null
    }
  }

  async componentDidMount () {
    await this.loadPatchEffects()
  }

  async loadPatchEffects () {
    try {
      const { data } = await axios
        .get(`http://localhost:8080/patch/effects/${'10.8'}`)

      if (data && data !== '') this.setState({ patchEffects: data })
    } catch (error) {
      console.error(error)
    }
  }

  setSelectedLeague = (value) => {
    this.setState({ selectedLeague: value })
  }

  render () {
    const { selectedLeague, championsByCost, patchEffects } = this.state

    return (
      <div className="relative mx-auto flex flex-col
        xs:w-full
        sm:w-full sm:px-2
        md:w-full md:px-4
        lg:w-full lg:px-4
        xl:w-3/5">
        <div className="flex justify-between">
          <LeagueSelector
            preselect={selectedLeague}
            onSelected={this.setSelectedLeague}
          />
        </div>
        {championsByCost.map((champions, index) =>
          <ChampionCategory
            key={'champion-' + index}
            champions={champions}
            league={selectedLeague}
            patchEffects={patchEffects}
          />
        )}
      </div>
    )
  }
}

export default Champions