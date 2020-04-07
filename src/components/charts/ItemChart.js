import React from 'react'
import { Chart } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { makePercent } from '../../util/formatter'

Chart.plugins.unregister(ChartDataLabels)

class ItemChart extends React.Component {
  constructor (props) {
    super (props)
    this.chartRef = React.createRef()
    this.state = {}
  }

  componentDidMount () {
    // add resize listener
    // document.getElementById('item-chart-container')
    window.addEventListener('resize', this.resizeCanvas)
    this.resizeCanvas()
    const data = this.props.data
    let min = data[0].count
    let max = data[0].count

    const median = data.reduce((result, curr) => {
      if (curr.count < min) min = curr.count
      if (curr.count > max) max = curr.count
      return result + curr.count
    }, 0) / data.length
    const range = max + min

    const [ counts, labels ] = data.reduce((result, curr) => {
      result[0].push((curr.count - median) / range)
      result[1].push(curr.itemName)
      return result
    }, [[], []])

    this.itemBar = new Chart(this.chartRef.current, {
      type: 'horizontalBar',
      plugins: [ChartDataLabels],
      data: {
        labels: labels,
        datasets: [{
          label: 'Popularity',
          data: counts,
          backgroundColor: 'rgba(149, 24, 24, 0.85)',
          minBarThickness: 10,
          maxBarThickness: 30,
          hoverBorderWidth: 0
        }]
      },
      options: {
        responsive: false,
        tooltips: {
          enabled: false
        },
        legend: {
          display: false
        },
        scales: {
          yAxes: [{ gridLines: { display: false } }],
          xAxes: [{ display: false }]
        },
        plugins: {
          datalabels: {
            display: true,
            align: 'end',
            anchor: 'end',
            formatter: (value, context) => {
              return makePercent(value)
            }
          }
        }
      }
    })
  }

  componentWillUnmount () {
    document.getElementById('item-chart-container')
      .removeEventListener('resize', this.resizeCanvas())
  }

  render () {
    return (
      <div className="w-full mx-4" id="item-chart-container">
        <canvas
          ref={this.chartRef}
          height={2000}
        />
      </div>
    )
  }

  resizeCanvas = () => {
    console.log('resizing!')
    const chartContainer = document.getElementById('item-chart-container')
      .getBoundingClientRect()

    console.log('chart ref: ', this.chartRef)
    this.chartRef.current.width = chartContainer.width
    console.log('container: ', chartContainer)
  }
}

export default ItemChart
