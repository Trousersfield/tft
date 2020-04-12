import React, { Suspense } from 'react'
import { cache as imageCache, importImages } from '../util/imageImporter'

// components
const CombChart = React.lazy(() => import('../components/charts/CombChart'))

class Combs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }

    if (!imageCache['ranked-emblems']) importImages('ranked-emblems')
  }

  componentDidMount () {
    this.setState({ loading: true })
    /* const { data } = await axios.get(
      "http://localhost:3000/comboStats/diamond") */
    this.setState({ loading: false })
  }

  render () {
    return (
      <div className="w-full border border-black">
        <div>asdf</div>
        <Suspense fallback={<div>Loading Comb...</div>}>
          <CombChart />
        </Suspense>
      </div>
    )
  }
}

export default Combs