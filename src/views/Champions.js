import React, { Suspense } from 'react'
import { data as setData } from '../util/setDataImporter'
import axios from 'axios'
import http from '../util/http'

const LeagueSelector = React.lazy(() => import('../components/LeagueSelector'))
const ChampionCostHeader = React.lazy(() => import('../components/ChampionCostHeader'))
const ChampionStarDistribution = React.lazy(() => import('../components/ChampionStarDistribution'))

class Champions extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      selectedLeague: 'diamond',
      championsByCost: {},
      data: {},
      championsByCost2: setData.champions ? Object.keys(setData.champions).reduce((result, curr) => {
        const champion = setData.champions[curr]
        result[result.length - champion.cost].push(champion)
        return result
      }, [[], [], [], [], []])
        :
      [],
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

      if (data && data !== '') {
        this.setState({ patchEffects: data })
      }
    } catch (error) {
      console.error(error)
    }
  }

  async loadData () {
    const selectedLeague = this.state.selectedLeague

    if (!this.state.data[selectedLeague]) {
      const { data } = await http.get(`championPopularity/${selectedLeague}`)

      if (data) {
        const aggregatedData = data.reduce((result, entry) => {
          const cost = setData.champions[entry.championId].cost
          const resultIndex = result.length - cost
          const sum = entry.tier1Count + entry.tier2Count*3 + entry.tier3Count*9

          if (!result[resultIndex].cost) {
            result[resultIndex] = { cost, count: 0, max: 0, champions: [] }
          }
          result[resultIndex].count += sum
          result[resultIndex].champions.push({ starSum: sum, ...entry })

          if (result[resultIndex].max < sum) {
            result[resultIndex].max = sum
          }

          return result
        }, [{}, {}, {}, {}, {}])

        this.setState(state => {
          const stateDataObj = Object.assign({}, state.data)
          stateDataObj[selectedLeague] = aggregatedData
          return { data: stateDataObj }
        })
      }
    }
  }

  getChampionData (id) {
    if (!this.state.data[this.state.selectedLeague]) {
      return []
    }
    return this.state.data[this.state.selectedLeague].find(entry => entry.championId === id) || []
  }

  aggregatePlayRate (champions) {
    let count = 0
    const sortedChampions = champions.map((champion, i) => {

      if (!this.state.data[this.state.selectedLeague]) {
        return { ...champion, index: i }
      }

      const j = this.state.data[this.state.selectedLeague]
        .findIndex(entry => entry.championId === champion.championId)

      return { ...champion, index: j }
    }).sort((a, b) => a.index > b.index ? 1 : -1)
    return { count, champions: sortedChampions }
  }

  setSelectedLeague = (value) => {
    this.setState({ selectedLeague: value }, () => this.loadData())
  }

  render () {
    const { selectedLeague, data, patchEffects, width } = this.state
    const selectedData = data[selectedLeague] || []

    return (
      <div className="relative mt-4 mx-auto
        xs:w-full
        sm:w-full sm:px-2
        md:w-full md:px-4
        lg:w-full lg:px-4
        xl:w-3/5">
        <div className="flex justify-center mb-4">
          <LeagueSelector
            preselect={selectedLeague}
            onSelected={this.setSelectedLeague}
          />
        </div>
        <div className="w-full min-h-screen mb-4">
          {selectedData.map((entry, index) =>
            // top-level: cost
            <div
              key={`cost-level-${entry.cost}`}
              className="mt-2 space-y-2"
            >
              <Suspense>
                <ChampionCostHeader
                  width={width}
                  cost={entry.cost}
                />
              </Suspense>
              {entry.champions.map(championEntry =>
                // child-level: champion
                <Suspense
                  key={'champion-entry-' + championEntry.championId}
                  fallback={<div>Loading Champion ...</div>}
                >
                  <ChampionStarDistribution
                    data={championEntry}
                    patchEffect={patchEffects ? patchEffects[championEntry.championId] : null}
                    relativeWidth={championEntry.starSum/entry.max}
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