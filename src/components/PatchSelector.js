import React from 'react'
import http from '../util/http'

const Dropdown = React.lazy(() => import('../elements/Dropdown'))

class PatchSelector extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      patches: [],
      selectedPatch: null
    }
  }

  async componentDidMount () {
    const { data } = await http.get('patches', false)
    this.setState({
      patches: data
    }, () => {
      // preselect latest patch
      if (data.length) {
        this.handlePatchSelected(data[0].patch)
      }
    })
  }

  handlePatchSelected (patchNumber) {
    const patchObj = this.state.patches.find(p => p.patch === patchNumber)
    console.log('handle patch selected! ', patchObj)
    this.setState({ selectedPatch: patchObj })
    http.setPatch(patchObj.patch)
  }

  render () {
    const { patches, selectedPatch } = this.state
    const options = patches.map(p => {
      return { name: p.patch.toString(), value: p.patch }
    })

    return (
      <Dropdown
        options={options}
        preselect={selectedPatch ? selectedPatch.patch : null}
        onSelected={(patchNumber) => this.handlePatchSelected(patchNumber)}
        size='md'
      />
    )
  }
}

export default PatchSelector