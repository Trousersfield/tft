import React from 'react'

const Dropdown = React.lazy(() => import('../elements/Dropdown'))

class PatchSelector extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      patches: this.props.patches,
      selectedPatch: this.props.selectedPatch
    }
  }

  handlePatchSelected (patch) {
    console.log('find patch: ', patch)
    const patchObj = this.state.patches.find(p => p.patch === patch)
    this.props.onSelected(patchObj)
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
        onSelected={(patch) => this.handlePatchSelected(patch)}
        size='sm'
      />
    )
  }
}

export default PatchSelector