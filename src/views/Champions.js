import React, { Suspense } from 'react'
import { cache as dataCache } from '../util/setDataImporter'
import axios from 'axios'
import http from '../util/http'

const LeagueSelector = React.lazy(() => import('../components/LeagueSelector'))
const ChampionCostHeader = React.lazy(() => import('../components/ChampionCostHeader'))
const Champion = React.lazy(() => import('../components/Champion'))

class Champions extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      selectedLeague: 'diamond',
      data: {},
      championByCostLevel: dataCache.champions ? dataCache['champions'].reduce((result, curr) => {
        result[result.length - curr.cost].push(curr)
        return result
      }, [[], [], [], [], []]) : [],
      patchEffects: null
    }
  }

  async componentDidMount () {
    await this.loadPatchEffects()
    this.loadData()
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

  async loadData () {
    const selectedLeague = this.state.selectedLeague
    const { data } = await http.get(`championPopularity/${selectedLeague}`)
    this.setState(state => {
      const stateDataObj = Object.assign({}, state.data)
      stateDataObj[selectedLeague] = data
      return { data: stateDataObj }
    }, () => {
      console.log('data loaded! Make new champions')
    })
  }

  getChampionData (id) {
    if (!this.state.data[this.state.selectedLeague]) return []
    return this.state.data[this.state.selectedLeague].find(entry => entry.championId === id) || []
  }

  sortedCostLevel (champions) {
    const result = champions.map((champion, i) => {
      if (!this.state.data[this.state.selectedLeague]) return { ...champion, index: i }
      const j = this.state.data[this.state.selectedLeague]
        .findIndex(entry => entry.championId === champion.championId)
      return { ...champion, index: j }
    }).sort((a, b) => a.index > b.index ? 1 : -1)
    return result
  }

  setSelectedLeague = (value) => {
    this.setState({ selectedLeague: value }, () => this.loadData())
  }

  render () {
    const { selectedLeague, championByCostLevel, patchEffects, width } = this.state

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
        <div
          id="champ-category-wrapper"
          className="flex flex-col w-full"
        >
          {championByCostLevel.map((costLevel, index) =>
            // top-level: cost
            <div key={`cost-level-${costLevel[0].cost}`}>
              <Suspense>
                <ChampionCostHeader
                  width={width}
                  cost={costLevel[0].cost}
                />
              </Suspense>
              {this.sortedCostLevel(costLevel).map(champion =>
                // child-level: champion
                <Suspense
                  key={'champion-entry-' + champion.championId}
                  fallback={<div>Loading Champion ...</div>}
                >
                  <Champion
                    champion={champion}
                    data={this.getChampionData(champion.championId)}
                    patchEffect={patchEffects ? patchEffects[champion.championId] : null}
                  />
                </Suspense>
              )}
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default Champions