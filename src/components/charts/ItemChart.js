import React from 'react'
import { Chart } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { buttonBase } from '../../util/styles'
import { cache as imageCache, importImages } from '../../util/imageImporter'

import DATA from '../../static/itemPopularityDiamond.json'

Chart.plugins.unregister(ChartDataLabels)

let debounce = null

class ItemChart extends React.Component {
  constructor (props) {
    super (props)
    this.chartRef = React.createRef()
    this.state = {
      data: [],
      currentAverage: null,
      includeBasicItems: false,
      width: 0,
      height: 0,
      itemChart: null,
      chartHeight: 2000,
      itemImageSize: 8
    }

    if (!imageCache['items']) importImages('items')
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
    new Promise(resolve => {
      const rawData = DATA
      this.setState(state => {
        let data
        if (state.includeBasicItems) data = rawData
        else data = rawData.filter(dataRow => dataRow.itemId > 9)
        const itemImageSize = state.chartHeight / data.length
        return { data, itemImageSize }
      }, () => { resolve() })
    })
  }

  toggleItemInclusion = async () => {
    this.setState(state => ({
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

    const average = data.reduce((result, curr) => {
      return result + curr.count
    }, 0) / data.length

    this.setState({ currentAverage: average })

    const [ counts, labels ] = data.reduce((result, curr) => {
      result[0].push(curr.count - average)
      result[1].push(curr.itemName)
      return result
    }, [[], []])

    const itemChart = new Chart(this.chartRef.current, {
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
          yAxes: [{ gridLines: { drawOnChartArea: false } }],
          xAxes: [{ display: false }]
        },
        plugins: {
          datalabels: {
            display: true,
            anchor: 'end',
            align: 'left',
            color: 'black',
            font: { size: '16' },
            formatter: (value, context) => {
              return Math.floor(value + average)
            }
          }
        }
      }
    })

    this.setState({ itemChart })
  }

  render () {
    const {
      data,
      currentAverage,
      includeBasicItems,
      chartHeight,
      itemImageSize
    } = this.state

    return (
      <div className="flex flex-col">
        <div className="flex justify-between p-5">
          <div className="flex flex-no-wrap items-center">
            <p className="mr-3 text-lg">Items in all compositions aggregated by average</p>
            <button
              className={buttonBase}
              onClick={this.toggleItemInclusion}
            >
              {(includeBasicItems ? 'Exclude' : 'Include') + ' Basic Items'}
            </button>
          </div>
          <div className="flex flex-no-wrap items-center border-2 border-indigo-500 rounded">
            <p className="px-3">Average</p>
            <p className="px-3 py-3 tracking-wider bg-indigo-500 font-bold text-white">
              {Math.floor(currentAverage)}
            </p>
          </div>
        </div>
        <div className="flex flex-no-wrap">
          <div className="flex-none flex flex-col bg-yellow-500">
            {data.map(item => (
              <img
                key={'image-item-' + item.itemId}
                src={imageCache['items'][`./${item.itemId < 10 ?
                  '0' : ''}${item.itemId}.png`]}
                style={{width: `${itemImageSize}px`,
                  height: `${itemImageSize}px`}}
              />
            ))}
          </div>
          <div
            id="item-chart-container"
            className="relative flex-1 mr-4"
          >
            <canvas
              ref={this.chartRef}
              height={chartHeight}
            />
          </div>
        </div>
        {/*<div
          id="item-chart-container"
          className="relative w-full mx-4"
        >
          <canvas
            ref={this.chartRef}
            height={2000}
          />
        </div>*/}
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
