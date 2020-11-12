import React from 'react'
import http from '../util/http'

const Dropdown = React.lazy(() => import('../elements/Dropdown'))

class PatchSelector extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      patches: [],
      selected: null
    }
  }

  async componentDidMount () {
    const { data } = await http.get('patches', false)

    if (data && data.length > 0) {
      this.handlePatchSelected(data[0].patch)
      this.setState({ patches: data })
    }
  }

  handlePatchSelected (patchNumber) {
    this.setState({ selected: patchNumber })
    http.setPatch(patchNumber)
  }

  render () {
    const { patches, selected } = this.state
    const options = patches.map(p => {
      return { name: p.patch.toString(), value: p.patch }
    })

    return (
      <Dropdown
        options={options}
        preselect={selected}
        onSelected={(patchNumber) => this.handlePatchSelected(patchNumber)}
        size='md'
      />
    )
  }
}

export default PatchSelector