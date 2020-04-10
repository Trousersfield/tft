import React from 'react'
import { Chart } from 'chart.js'

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
    console.log('keys: ', Object.keys(data))

    const [ datasets, labels ] = Object.keys(data).reduce((result, key) => {
      if (!key.includes('placement')) return result
      result[0].push({
        data: [data[key]],
        backgroundColor: 'rgb(194, 72, 38)',
        borderColor: 'rgb(194, 72, 38)'
      })
      result[1].push(key)
      return result
    }, [[], []])

    const detailCombChart = new Chart(this.chartRef.current, {
      type: 'horizontalBar',
      data: {
        datasets
      },
      options: {
        tooltips: { enabled: false },
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
        legend: { display: false }
      },
    })

    this.setState({ detailCombChart })
  }

  render () {
    return (
      <div>
        <canvas ref={this.chartRef} />
      </div>
    )
  }
}

export default DetailCombChart