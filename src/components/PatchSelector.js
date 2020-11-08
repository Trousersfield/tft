import React from 'react'
import http from '../util/http'

const Dropdown = React.lazy(() => import('../elements/Dropdown'))

class PatchSelector extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      // patches: this.props.patches,
      // selectedPatch: this.props.selectedPatch
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
    console.log('patch obj: ', patchObj)
    // this.props.onSelected(patchObj)
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
        size='sm'
      />
    )
  }
}

export default PatchSelector