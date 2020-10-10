import React, { Suspense } from 'react'
import { cache as imageCache, importImages } from '../util/imageImporter'

// components

class TopComb extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: this.props.comb.id,
      combName: this.props.comb.Name,
      champions: this.props.comb.TopCombChamps
    }

    if (!imageCache['ranked-emblems']) importImages('ranked-emblems')
  }

  render () {
    const {  combName, champions } = this.state
    console.log('comb name: ', combName)
    console.log('champs: ', champions)

    return (
      <div className="lg:w-full xl:w-3/5 mx-auto pt-10">
        {combName}
        {champions.map(champion => (
          <ChampionCard
            {...champion}
          />
        ))}
      </div>
    )
  }
}

const ChampionCard = (champion) => {
  const [ id, name, count ] = [ champion.ChampionId, champion.Name ]
  console.log('id: ', id)
  console.log('name: ', name)
  console.log('count: ', count)


  return (
    <div>
      {name}
    </div>
  )
}

export default TopComb