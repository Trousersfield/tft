import React, { Suspense } from 'react'
import { Chart } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { makePercent } from '../../util/formatter'
import { cache as imageCache, importImages } from '../../util/imageImporter'
import http from '../../util/http'

// components
const LeagueSelector = React.lazy(() => import('../LeagueSelector'))
const TeamDistributionChart = React.lazy(() => import('./TeamDistributionChart'))

Chart.plugins.unregister(ChartDataLabels)

class TeamsChart extends React.Component {
  constructor (props) {
    super (props)
    this.chartRef = React.createRef()
    this.state = {
      selectedLeague: 'diamond',
      teamsByLeague: {},
      teamsChartRef: null,
      selectedTeam: null
    }

    if (!imageCache['ranked-emblems']) {
      importImages('ranked-emblems')
    }
  }

  componentDidMount () {
    this.loadData()
  }

  async loadData () {
    const selectedLeague = this.state.selectedLeague

    if (this.state.teamsByLeague[selectedLeague]) {
      this.makeGraph()
    } else {
      let { data } = await http.get(`comboStats/${selectedLeague}`)

      if (data) {
        this.setState(state => {

          data = data.sort((a, b) => {
            return a.totalAmount < b.totalAmount ? 1 : -1
          }).slice(0, 10)

          // construct graph data
          const [ win, loss, nameLabels ] = data.reduce((result, curr, index) => {
            // gained LP
            result[0].push(curr.placement1Amount + curr.placement2Amount +
              curr.placement3Amount + curr.placement4Amount)

            // lost LP
            result[1].push(curr.totalAmount - result[0][result[0].length - 1])

            // team name
            result[2].push(curr.name)
            return result
          }, [[], [], []])

          // percent labels within bars
          const percentLabels = data.reduce((result, curr, currIndex) => {
             result[0].push(makePercent(loss[currIndex] / curr.totalAmount))
             result[1].push(makePercent(win[currIndex] / curr.totalAmount))
             return result
          }, [[], []])

          const newTeamsObj = Object.assign({}, state.teamsByLeague)
          newTeamsObj[state.selectedLeague] = { win, loss, percentLabels, nameLabels, teams: data }

          return { teamsByLeague: newTeamsObj }
        }, () => {
          this.makeGraph()
        })
      }
    }
  }

  setSelectedLeague = (value) => {
    this.setState({ selectedLeague: value }, () => this.loadData())
  }

  makeGraph () {
    const { teamsChartRef, teamsByLeague } = this.state

    if (teamsChartRef) {
      teamsChartRef.destroy()
    }

    const {
      win,
      loss,
      percentLabels,
      nameLabels
    } = teamsByLeague[this.state.selectedLeague]

    const combChart = new Chart(this.chartRef.current, {
      type: 'bar',
      plugins: [ChartDataLabels],
      data: {
        labels: nameLabels,
        datasets: [{
          label: 'Loose LP: Placement 5 - 8',
          data: loss,
          backgroundColor: 'rgb(194, 72, 38)',
          borderColor: 'rgb(194, 72, 38)'
        }, {
          label: 'Gain LP: Placement 1 - 4',
          data: win,
          backgroundColor: 'rgb(38, 194, 129)',
          borderColor: 'rgb(38, 194, 129)'
        }]
      },
      options: {
        tooltips: { enabled: false },
        legend: {
          position: 'bottom',
          labels: {
            usePointStyle: false,
            fontSize: 16
          }
        },
        scales: {
          yAxes: [{
            scaleOverride: true,
            gridLines: { drawOnChartArea: false },
            scaleSteps: 10,
            scaleStepWidth: 50,
            scaleStartValue: 0,
            scaleLabel: {
              display: true,
              labelString: 'success rate',
            },
            stacked: true,
            ticks: {
              beginAtZero: true,
              stepSize: 100
            }
          }],
          xAxes: [{
            stacked: true,
            gridLines: { drawOnChartArea: false },
            ticks: {
              beingAtZero: true
            }
          }]
        },
        onClick: (event, activeElements) => {
          if (!activeElements.length) {
            return
          }
          this.handleBarClick(activeElements[0]._index)
        },
        hover: {
          animationDuration: 200
        },
        plugins: {
          datalabels: {
            display: true,
            align: 'center',
            anchor: 'center',
            color: 'black',
            font: { size: '16' },
            formatter: (value, context) => {
              return percentLabels[context.datasetIndex][context.dataIndex]
            }
          }
        }
      }
    })
    this.setState({ combChart })
  }

  handleBarClick (dataIndex) {
    const selectedTeam = this.state.teamsByLeague[this.state.selectedLeague].teams[dataIndex]
    this.setState({ selectedTeam })
  }

  render () {
    const { selectedLeague, selectedTeam } = this.state

    return (
      <div className="relative flex flex-col">
        <div className="absolute top-0 right-0 z-10">
          <Suspense fallback={<div>Loading League Selector ...</div>}>
            <LeagueSelector
              preselect={selectedLeague}
              onSelected={this.setSelectedLeague}
            />
          </Suspense>
        </div>
        <div className="relative w-full">
          <canvas ref={this.chartRef} />
        </div>
        <div className="h-64">
          {selectedTeam ?
            <Suspense fallback={<div>Loading placement distribution ...</div>}>
              <TeamDistributionChart
                key={'team-distribution-' + selectedTeam.id}
                data={selectedTeam}
              />
            </Suspense> :
            <div className="h-full flex justify-center items-center">
              <p className="text-white italic font-semibold tracking-wide text-xl">
                Select a bar to view a placement distribution
              </p>
            </div>
          }
        </div>
      </div>
    )
  }
}

export default TeamsChart