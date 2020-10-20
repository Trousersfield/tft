import React, { Suspense } from 'react'
import { cache as imageCache, importImages } from '../util/imageImporter'
import http from '../util/http'

// components
const TopComb = React.lazy(() => import('../components/TopComb'))

class TopCombs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      allCombs: []
    }

    if (!imageCache['ranked-emblems']) importImages('ranked-emblems')
  }

  async componentDidMount () {
    const { data } = await http.get('topCombs', false)
    this.setState({ allCombs: data })
  }

  render () {
    const topCombs = this.state.allCombs.reduce((acc, curr) => {
      // TODO: think about removing .slice()
      const champsOfComb = JSON.parse(curr.TopCombChamps).sort((a, b) => a.Count < b.Count ? 1 : -1).slice(0, 8)
      console.log('champs list: ', champsOfComb)

      acc.push({
        id: curr.id,
        name: curr.Name,
        champions: champsOfComb
      })
      return acc
    }, [])

    console.log('top combs: ', topCombs)

    return (
      <div className="lg:w-full xl:w-3/5 mx-auto pt-10">
        {topCombs.map(comb => (
          <Suspense key={comb.id}>
            <TopComb
              id={comb.id}
              name={comb.name}
              champions={comb.champions}
            />
          </Suspense>
        ))}
      </div>
    )
  }
}

export default TopCombs