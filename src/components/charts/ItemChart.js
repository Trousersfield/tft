import React from 'react'
import { Chart } from 'chart.js'

class ItemChart extends React.Component {
  constructor (props) {
    super (props)
    this.chartRef = React.createRef()
    this.state = {

    }
  }

  componentDidMount () {
    const  [ counts, labels ] = this.props.data.reduce((result, curr) => {
      result[0].push(curr.count)
      result[1].push(curr.itemName)
      return result
    }, [[], []])

    this.itemBar = new Chart(this.chartRef.current, {
      type: 'horizontalBar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Popularity',
          data: counts,
          backgroundColor: 'rgba(149, 24, 24, 0.85)', // array should have same number of elements as number of dataset
          borderColor: 'rgba(149, 24, 24, 0.85)',// array should have same number of elements as number of dataset
          borderWidth: 1,
          barThickness: 5
        }]
      },
      options: {
        tooltips: {
          enabled: false
        },
        legend: {
          display: false
        },
        scales: {
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Popularity',
              fontColor: '#000000',
              fontStyle: 'bold',
              fontFamily: 'arial'
            },
            stacked: true,
            ticks: {
              beginAtZero: true,
              stepSize: 5,
              suggestedMax: 15
            }
          }],
          xAxes: [{
            scaleLabel: {
            },
            ticks: {
              fontColor: '#000000',
              fontStyle: 'bolder',
              fontFamily: 'arial'
            },
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

export default ItemChart
