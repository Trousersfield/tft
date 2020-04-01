import React from 'react'
import { Chart } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'

Chart.plugins.unregister(ChartDataLabels)

class BarChart extends React.Component {
  constructor (props) {
    super (props)
    this.chartRef = React.createRef()
    this.state = {
      bestX: 10
    }
  }

  componentDidMount () {
    const data = this.props.data.sort((a, b) => {
      return a.totalAmount >= b.totalAmount ? -1 : 1
    })
    const bestX = this.state.bestX
    const slicedData = bestX < data.length ? data.slice(0, bestX) : data
    console.log('cut data: ', slicedData)

    // construct gained and lost LP datasets
    const [ win, loss ] = slicedData.reduce((result, curr) => {
      result[0].push(curr.placement1Amount + curr.placement1Amount +
        curr.placement1Amount + curr.placement1Amount)
      result[1].push(curr.totalAmount - result[0][result[0].length - 1])
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
              return context.chart.data.labels[context.dataIndex]
            }
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
    return (
      <canvas ref={this.chartRef} />
    )
  }
}

export default BarChart