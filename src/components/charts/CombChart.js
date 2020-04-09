import React from 'react'
import { Chart } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { makePercent } from '../../util/formatter'
import { cache as imageCache, importImages } from '../../util/imageImporter'

Chart.plugins.unregister(ChartDataLabels)

class BarChart extends React.Component {
  constructor (props) {
    super (props)
    this.chartRef = React.createRef()
    this.state = {
      data: {},
      bestX: 10
    }

    if (!imageCache['ranked-emblems']) importImages('ranked-emblems')
  }

  async componentDidMount () {
    await this.setData()
    this.makeGraph()
  }

  async setData () {
    this.setState({ data: { name: 'diamond', data: this.props.data } })
  }

  makeGraph () {
    const data = this.state.data['data'].sort((a, b) => {
      return a.totalAmount >= b.totalAmount ? -1 : 1
    })
    const bestX = this.state.bestX
    const slicedData = bestX < data.length ? data.slice(0, bestX) : data

    // construct gained and lost LP datasets
    const [ win, loss ] = slicedData.reduce((result, curr) => {
      result[0].push(curr.placement1Amount + curr.placement1Amount +
        curr.placement1Amount + curr.placement1Amount)
      result[1].push(curr.totalAmount - result[0][result[0].length - 1])
      return result
    }, [[], []])

    // prepare percentage labels
    const percentLabels = slicedData.reduce((result, curr, currIndex) => {
        result[0].push(makePercent(loss[currIndex] / curr.totalAmount))
        result[1].push(makePercent(win[currIndex] / curr.totalAmount))
        return result
      }, [[], []])

    this.myChart = new Chart(this.chartRef.current, {
      type: 'bar',
      plugins: [ChartDataLabels],
      data: {
        labels: slicedData.map(comb => comb.name),
        datasets: [{
          label: 'Loose LP',
          data: loss,
          backgroundColor: 'rgb(194, 72, 38)',
          borderColor: 'rgb(194, 72, 38)'
        }, {
          label: 'Gain LP',
          data: win,
          backgroundColor: 'rgb(38, 194, 129)',
          borderColor: 'rgb(38, 194, 129)'
        }]
      },
      options: {
        plugins: {
          datalabels: {
            display: true,
            align: 'center',
            anchor: 'center',
            formatter: (value, context) => {
              return percentLabels[context.datasetIndex][context.dataIndex]
            }
          },
          events: ['click'],
          onclick: (event, item) => {
            console.log('item ', item)
          }
        },
        onClick: this.graphClickEvent,
        tooltips: {
          enabled: false
        },
        legend: {
          position: 'bottom',
          labels: {
            usePointStyle: false,
            fontSize: 11
          }
        },
        scales: {
          yAxes: [{
            scaleOverride: true,
            scaleSteps: 10,
            scaleStepWidth: 50,
            scaleStartValue: 0,
            scaleLabel: {
              display: true,
              labelString: 'Popularity',
            },
            stacked: true,
            ticks: {
              beginAtZero: true,
              stepSize: 5,
              suggestedMax: 15
            }
          }],
          xAxes: [{
            stacked: true,
          }]
        }
      }
    })
  }

  render () {
    const leagueName = 'diamond'
    return (
      <div className="flex flex-col">
        <LeagueHeader leagueName={leagueName} />
        <canvas ref={this.chartRef} />
      </div>
    )
  }
}

const LeagueHeader = (props) => {
  const importName = props.leagueName.charAt(0).toUpperCase() + props.leagueName.slice(1)
  return (
    <div className="flex justify-between p-5">
      <div className="flex flex-no-wrap">
        <div>Frequently played Combs in {props.leagueName}</div>
      </div>
      <div className="w-8 h-8">
        <img
          src={imageCache['ranked-emblems'][`./Emblem_${importName}.png`]}
          alt="country_flag"
        />
      </div>
    </div>
  )
}

export default BarChart