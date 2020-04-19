import React, { Suspense } from 'react'
import { Chart } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { makePercent } from '../../util/formatter'
import { cache as imageCache, importImages } from '../../util/imageImporter'

import DATA from '../../static/ComboStatsDiamond.json'

// components
const LeagueSelector = React.lazy(() => import('../LeagueSelector'))
const DetailCombChart = React.lazy(() => import('./DetailCombChart'))

Chart.plugins.unregister(ChartDataLabels)

class CombChart extends React.Component {
  constructor (props) {
    super (props)
    this.chartRef = React.createRef()
    this.state = {
      selectedLeague: 'diamond', // find good default
      data: {},
      combChart: null,
      bestX: 10,
      selectedComb: null
    }

    if (!imageCache['ranked-emblems']) importImages('ranked-emblems')
  }

  async componentDidMount () {
    await this.setData()
    this.makeGraph()
  }

  async setData () {
    // make setting state awaitable
    new Promise(resolve => {
      // load data here!
      const rawData = DATA
      const selectedLeague = this.state.selectedLeague
      this.setState(state => {
        // set data itself
        const data = Object.assign({}, state.data)
        data[selectedLeague] = rawData
        return { data }
      }, () => { resolve() })
    })
  }

  setSelected = (value) => {
    this.setState({ selectedLeague: value })
  }

  makeGraph () {
    const data = this.state.data[this.state.selectedLeague].sort((a, b) => {
      return a.totalAmount >= b.totalAmount ? -1 : 1
    })
    const bestX = this.state.bestX
    const slicedData = bestX < data.length ? data.slice(0, bestX) : data

    // construct gained and lost LP datasets and sum
    const [ win, loss, sum ] = slicedData.reduce((result, curr) => {
      result[0].push(curr.placement1Amount + curr.placement2Amount +
        curr.placement3Amount + curr.placement4Amount)
      result[1].push(curr.totalAmount - result[0][result[0].length - 1])
      result[2] += curr.totalAmount
      return result
    }, [[], [], 0])
    const averageLineData = Array(slicedData.length).fill(
      sum / slicedData.length)

    // prepare percentage labels
    const percentLabels = slicedData.reduce((result, curr, currIndex) => {
        result[0].push(makePercent(loss[currIndex] / curr.totalAmount))
        result[1].push(makePercent(win[currIndex] / curr.totalAmount))
        return result
      }, [[], []])

    const combChart = new Chart(this.chartRef.current, {
      type: 'bar',
      plugins: [ChartDataLabels],
      data: {
        labels: slicedData.map(comb => comb.name),
        datasets: [{
          label: 'Mean',
          data: averageLineData,
          borderColor: 'red',
          borderCapStyle: 'round',
          borderWidth: 2,
          pointRadius: 0,
          pointBackgroundColor: 'red',
          fill: false,
          spanGaps: true,
          type: 'line'
        }, {
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
              labelString: 'Comb Count',
            },
            stacked: true,
            ticks: {
              beginAtZero: true,
              // stepSize: 5,
              stepSize: 100
              // suggestedMax: 15
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
          if (!activeElements.length) return
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
              if (context.datasetIndex === 0) return '' // skip avg line
              return percentLabels[context.datasetIndex - 1][context.dataIndex]
            }
          }
        }
      }
    })
    this.setState({ combChart })
  }

  handleBarClick (dataIndex) {
    const selectedComb = this.state.data[this.state.selectedLeague][dataIndex]
    this.setState({ selectedComb })
  }

  render () {
    const { selectedLeague, selectedComb } = this.state

    return (
      <div className="flex flex-col">
        <Suspense fallback={<div>Loading League Selector ...</div>}>
          <LeagueSelector
            preselect={selectedLeague}
            onSelected={this.setSelected}
          />
        </Suspense>
        <div className="relative w-full">
          <canvas ref={this.chartRef} />
        </div>
        {selectedComb &&
          <Suspense fallback={<div>Loading Comb Details ...</div>}>
            <DetailCombChart
              key={'detail-comb-' + selectedComb.id}
              data={selectedComb}
            />
          </Suspense>}
      </div>
    )
  }
}

export default CombChart