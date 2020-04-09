import React from 'react'
import { Chart } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { makePercent } from '../../util/formatter'
import { buttonBase } from '../../util/stylings'

Chart.plugins.unregister(ChartDataLabels)

let debounce = null

class ItemChart extends React.Component {
  constructor (props) {
    super (props)
    this.chartRef = React.createRef()
    this.state = {
      data: [],
      includeBasicItems: false,
      width: 0,
      height: 0,
      itemChart: null
    }
  }

  async componentDidMount () {
    await this.setData()
    this.makeGraph()
  }

  componentWillUnmount () {
    document.getElementById('item-chart-container')
      .removeEventListener('resize', this.resizeCanvas())

    if (debounce) clearTimeout(debounce)
  }

  async setData () {
    const rawData = this.props.data
    if (this.state.includeBasicItems) {
      this.setState({ data: rawData })
    } else {
      this.setState({
        data: rawData.filter(dataRow => dataRow.itemId > 9)
      })
    }
  }

  toggleItemInclusion = async () => {
    await this.setState(state => ({
      includeBasicItems: !state.includeBasicItems
    }))
    await this.setData()
    this.state.itemChart.destroy()
    this.makeGraph()
  }

  makeGraph () {
    const { data } = this.state
    // add resize listener
    window.addEventListener('resize', this.resizeCanvas)
    this.setChartWidth()
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

    this.state.itemChart = new Chart(this.chartRef.current, {
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
            anchor: 'end',
            align: 'left',
            color: 'grey',
            formatter: (value, context) => {
              return makePercent(value, 4)
            }
          }
        }
      }
    })
  }

  render () {
    const { includeBasicItems } = this.state

    return (
      <div className="flex flex-col">
        <div className="flex justify-start">
          <button
            className={buttonBase}
            onClick={this.toggleItemInclusion}
          >
            {(includeBasicItems ? 'Exclude' : 'Include') + ' Basic Items'}
          </button>
        </div>
        <div
          id="item-chart-container"
          className="relative w-full mx-4"
        >
          <canvas
            ref={this.chartRef}
            height={2000}
          />
        </div>
      </div>
    )
  }

  resizeCanvas = () => {
    if (debounce) clearTimeout(debounce)

    debounce = setTimeout(() => {
      this.setChartWidth()
      this.state.itemChart.resize()
    }, 500)
  }

  setChartWidth = () => {
    const chartContainer = document.getElementById('item-chart-container')
      .getBoundingClientRect()

    this.chartRef.current.width = chartContainer.width
  }
}

export default ItemChart
