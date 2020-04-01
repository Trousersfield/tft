import React, { Suspense } from 'react'
import Data from '../static/ComboStatsDiamond.json'

const Comb = React.lazy(() => import('../components/Comb'))
const BarChart = React.lazy(() => import('../components/BarChart'))

class Combs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      data: []
    }
  }

  componentDidMount () {
    this.setState({ loading: true })
    /* const { data } = await axios.get(
      "http://localhost:3000/comboStats/diamond") */
    console.log('data: ', Data)
    this.setState({ data: Data, loading: false })
  }

  render () {
    const { data, loading } = this.state

    if (loading) {
      return (
        <p>Loading Data...</p>
      )
    }

    return (
      <div>
        <h1>Hi! I am the Combs Component</h1>
        <Suspense fallback={<div>Loading Chart...</div>}>
          <BarChart data={data}></BarChart>
        </Suspense>
        <div className="flex flex-col">
          {data.map((comb) =>
            <Suspense key={comb.id}
              fallback={<div>Loading Comb...</div>}>
              <Comb comb={comb}></Comb>
            </Suspense>
          )}
        </div>
      </div>
    )
  }
};

export default Combs;