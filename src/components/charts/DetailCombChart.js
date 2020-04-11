import React from 'react'
import { Chart } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import {
  scaleToPercent,
  makeRanking,
  printTraitName } from '../../util/formatter'
import { placementColors } from '../../util/styles'
import InfoTag from '../InfoTag'
import Comb from '../../components/Comb'

Chart.plugins.unregister(ChartDataLabels)

class DetailCombChart extends React.Component {
  constructor (props) {
    super (props)
    this.chartRef = React.createRef()
    this.state = {
      data: this.props.data,
      detailCombChart: null
    }
  }

  componentDidMount () {
    const data = this.state.data
    let placement = 0

    const [ datasets, rawData ] = Object.keys(data)
      .reduce((result, key) => {
        if (!key.includes('placement')) return result
        result[0].push({
          data: [data[key]],
          // barThickness: '50',
          backgroundColor: placementColors()[placement],
          borderColor: 'rgb(194, 72, 38)'
        })
        result[1].push(data[key])
        placement += 1
        return result
      }, [[], []])

    const percentLabels = scaleToPercent(rawData)

    const detailCombChart = new Chart(this.chartRef.current, {
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
                  return `${makeRanking(context.datasetIndex + 1)} place`
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

    this.setState({ detailCombChart })
  }

  render () {
    const comb = this.state.data

    return (
      <div className="flex flex-col">
        <div className="flex justify-between p-5">
          <Comb name={comb.name} />
          <div className="flex flex-no-wrap items-center">
            <p className="text-lg">
              Placement Distribution {printTraitName(comb.name)}
            </p>
          </div>
          <InfoTag
            title={'Records'}
            value={comb.totalAmount}
          />
        </div>
        <div className="relative h-1/2 w-full px-4">
          <canvas ref={this.chartRef} />
        </div>
      </div>
    )
  }
}

export default DetailCombChart