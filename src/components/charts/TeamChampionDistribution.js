import React from 'react'
import { Chart } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { scaleToPercent, makeRanking } from '../../util/formatter'
import { placementColors } from '../../util/styles'
import InfoTag from '../InfoTag'
import TraitsTag from '../TraitsTag'

Chart.plugins.unregister(ChartDataLabels)

class CompositionDistribution extends React.Component {
  constructor (props) {
    super (props)
    this.chartRef = React.createRef()
    this.state = {
      data: this.props.data,
      chartInstance: null
    }
  }

  async componentDidMount () {
    const data = this.state.data
    let placement = 0
    const colors = await placementColors()

    const [ datasets, rawData ] = Object.keys(data)
      .reduce((result, key) => {
        if (!key.includes('placement')) return result
        result[0].push({
          data: [data[key]],
          // barThickness: '50',
          backgroundColor: colors[placement],
          borderColor: 'rgb(194, 72, 38)'
        })
        result[1].push(data[key])
        placement += 1
        return result
      }, [[], []])

    const percentLabels = scaleToPercent(rawData)

    const chartInstance = new Chart(this.chartRef.current, {
      type: 'horizontalBar',
      plugins: [ChartDataLabels],
      data: {
        datasets
      },
      options: {
        tooltips: { enabled: false },
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            stacked: true,
            display: false
          }],
          xAxes: [{
            stacked: true,
            gridLines: { drawOnChartArea: false }
          }]
        },
        legend: { display: false },
        plugins: {
          datalabels: {
            display: true,
            anchor: 'center',
            color: 'black',
            font: { size: '16' },
            labels: {
              title: {
                font: { weight: 'bold' },
                formatter: (value, context) => {
                  return `${makeRanking(context.datasetIndex + 1)}`
                },
                align: 'top'
              },
              value: {
                formatter: (value, context) => {
                  return percentLabels[context.datasetIndex]
                },
                align: 'bottom'
              }
            }
          }
        },
        events: []
      }
    })

    this.setState({ chartInstance })
  }

  render () {
    const team = this.state.data
    const traitIds = team.name.trim().replace(/Set4_/g, '').split(' ')

    return (
      <div className="relative">
        <div className="w-full flex justify-between p-5">
          <TraitsTag
            ids={traitIds}
          />
          <InfoTag
            title={'Records'}
            value={team.totalAmount}
          />
        </div>
        <div className="relative h-1/2 w-full px-4">
          <canvas ref={this.chartRef} />
        </div>
      </div>
    )
  }
}

export default CompositionDistribution