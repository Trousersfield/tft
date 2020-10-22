import React, { Suspense } from 'react'
import { Chart } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { cache as imageCache, importImages } from '../../util/imageImporter'
import InfoTag from '../InfoTag'
import Button from '../../elements/Button'
import http from '../../util/http'

Chart.plugins.unregister(ChartDataLabels)

const LeagueSelector = React.lazy(() => import('../../components/LeagueSelector'))

let debounce = null

class ItemChart extends React.Component {
  constructor (props) {
    super (props)
    this.chartRef = React.createRef()
    this.state = {
      selectedLeague: 'diamond',
      data: {},
      currentGraphData: [],
      currentAverage: null,
      includeBasicItems: false,
      itemChart: null,
      chartHeight: 2000,
      itemImageSize: 8,
      itemGap: 1
    }

    if (!imageCache['items']) {
      importImages('items')
    }
  }

  componentDidMount () {
    this.loadData()
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.resizeCanvas)

    if (debounce) clearTimeout(debounce)
  }

  async loadData () {
    const selectedLeague = this.state.selectedLeague
    const { data } = await http.get(`itemPopularity/${selectedLeague}`)
    this.setState(state => {
      const stateDataObj = Object.assign({}, state.data)
      stateDataObj[selectedLeague] = data
      let currentGraphData
      if (state.includeBasicItems) currentGraphData = stateDataObj[selectedLeague]
      else currentGraphData = stateDataObj[selectedLeague].filter(dataRow => dataRow.itemId > 9)
      const itemImageSize = (state.chartHeight - 16 - state.itemGap *
        currentGraphData.length) / currentGraphData.length
      return { data: stateDataObj, currentGraphData, itemImageSize }
    }, () => { this.makeGraph() })
  }

  setSelectedLeague = (value) => {
    this.setState({ selectedLeague: value }, () => this.loadData())
  }

  toggleItemInclusion = async () => {
    this.setState(state => ({
      includeBasicItems: !state.includeBasicItems
    }))
    this.loadData()
  }

  makeGraph () {
    if (this.state.itemChart) this.state.itemChart.destroy()
    const data = this.state.currentGraphData
    // add resize listener
    window.addEventListener('resize', this.resizeCanvas)
    this.setChartWidth()

    const average = data.reduce((result, curr) => {
      return result + curr.count
    }, 0) / data.length

    this.setState({ currentAverage: average })

    const [ counts, labels ] = data.reduce((result, curr) => {
      result[0].push(curr.count)
      result[1].push(' ')
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
        maintainAspectRatio: false,
        tooltips: {
          enabled: false
        },
        legend: {
          display: false
        },
        scales: {
          // yAxes: [{ gridLines: { drawOnChartArea: false } }],
          yAxes: [{
            scaleLabel: { display: false },
            gridLines: {
              drawBorder: false,
              tickMarkLength: 0,
              zeroLineWidth: 0
            }
          }],
          xAxes: [{ display: false }]
        },
        plugins: {
          datalabels: {
            display: true,
            anchor: 'end',
            align: 'right',
            color: 'black',
            font: { size: '16' },
            formatter: (value, context) => {
              return Math.floor(value)
            }
          }
        }
      }
    })

    this.setState({ itemChart })
  }

  render () {
    const {
      selectedLeague,
      currentGraphData,
      currentAverage,
      includeBasicItems,
      chartHeight,
      itemImageSize,
      itemGap
    } = this.state

    return (
      <div className="flex flex-col">
        <div className="text-xl font-semibold leading-relaxed p-2 mt-2">
          <p className="text-center">Absolute Numbers of Items</p>
        </div>
        <div className="flex justify-between items-center px-5 pb-5">
          <Button
            onClick={this.toggleItemInclusion}
            text={(includeBasicItems ? 'Exclude' : 'Include') + ' Basic Items'}
          />
          <div>
            <Suspense fallback={<div>Loading League Selector ...</div>}>
              <LeagueSelector
                preselect={selectedLeague}
                onSelected={this.setSelectedLeague}
              />
            </Suspense>
          </div>
          <InfoTag
            title={'Average'}
            value={Math.floor(currentAverage)}
          />
        </div>
        <div className="flex flex-no-wrap ml-5">
          <div className="flex-none flex flex-col"
            style={{paddingTop: '8px', paddingBottom: '8px'}}>
            {currentGraphData.map(item =>
              <ItemImageLabel
                key={'image-item-' + item.itemId + '-' + itemImageSize}
                item={item}
                imageSize={itemImageSize}
                gap={itemGap}
              />
            )}
          </div>
          <div
            id="item-chart-container"
            className="relative flex-1 mr-4 overflow-hidden"
          >
            <canvas
              ref={this.chartRef}
              height={chartHeight}
            />
          </div>
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

class ItemImageLabel extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      item: this.props.item,
      imageSize: this.props.imageSize,
      gap: this.props.gap,
      tooltipVisible: false
    }
  }

  toggleTooltip () {
    this.setState(state => ({ tooltipVisible: !state.tooltipVisible }))
  }

  render () {
    const { item, imageSize, gap, tooltipVisible } = this.state

    return (
      <div
        className="relative cursor-pointer"
        onClick={() => this.toggleTooltip()}
      >
        <img
          src={imageCache['items'][`${item.itemId < 10 ?
            '0' : ''}${item.itemId}`]}
          style={{width: `${imageSize}px`,
            height: `${imageSize}px`,
            marginBottom: `${gap}px`}}
          alt={item.itemName}
        />
        {tooltipVisible &&
          <ItemTooltip
            translate={imageSize}
            itemName={item.itemName}
          />}
      </div>
    )
  }
}

const ItemTooltip = (props) => {
  const height = 32
  const yTranslate = (props.translate - height) / 2

  return (
    <div className='absolute z-10 top-0 whitespace-no-wrap px-2 py-1
      bg-indigo-500 text-white rounded-sm shadow cursor-pointer
      tracking-wide font-semibold'
      style={{transform: `translate(${props.translate + 8}px, ${yTranslate}px)`,
        height: `${height}px`}}>
      {props.itemName}
      <div className="absolute left-0 border z-10"
        style={{marginLeft: '-5px', borderWidth: '5px',
          borderColor: `transparent #667eea transparent transparent`,
          transform: `translate(-5px, -${height/2}px)`}} />
    </div>
  )
}

export default ItemChart
