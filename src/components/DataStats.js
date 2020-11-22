import React from 'react'

class DataStats extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      patch: null,
      numberOfGames: null,
      lastUpdate: null,
      nextUpdate: null
    }
  }

  componentDidMount () {
    // load data
    const patch = '10.8'
    const numberOfGames = 0
    const lastUpdate = 2
    this.setState({ patch, numberOfGames, lastUpdate })
  }

  render () {
    const { patch, numberOfGames, lastUpdate } = this.state

    return (
      <div className="flex flex-col">
        <p>Latest Patch {patch}</p>
        <p>Games recorded {numberOfGames}</p>
        <p>Last update {lastUpdate} Minutes ago</p>
      </div>
    )
  }
}

export default DataStats