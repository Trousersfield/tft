import React from 'react'
import http from '../util/http'
import { formatTimestamp } from '../util/formatter'

const Dropdown = React.lazy(() => import('../elements/Dropdown'))

class PatchSelector extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      patches: [],
      selected: null,
      loading: false
    }
  }

  async componentDidMount () {
    this.setState({ loading: true })
    const { data } = await http.get('patches', false)

    if (data && data.length > 0) {
      this.handlePatchSelected(data[0].patch)
      this.setState({ patches: data })
    }
    this.setState({ loading: false })
  }

  handlePatchSelected (patchNumber) {
    this.setState({ selected: patchNumber })
    http.setPatch(patchNumber)
  }

  render () {
    const { loading, patches, selected } = this.state
    const options = patches.map(p => {
      return {
        name: p.patch.toString(),
        value: p.patch,
        meta: formatTimestamp(p.earliestTime)
      }
    })

    return (
      <>
        {loading ?
        <div className="w-64 h-10 border-2 border-gray-500 rounded flex items-center">
          <p className="italic ml-3">
            Loading Patches ...
          </p>
        </div> :
        <Dropdown
          options={options}
          preselect={selected}
          selectedPrefix={'Patch'}
          onSelected={(patchNumber) => this.handlePatchSelected(patchNumber)}
          size='sm'
        />}
      </>
    )
  }
}

export default PatchSelector