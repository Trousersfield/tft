import React from 'react'
import { PatchContext } from '../context/Patch'

const Dropdown = React.lazy(() => import('./Dropdown'))

class PatchSelector extends React.Component {
  constructor (props) {
    super (props)
    this.state = {}
  }

  render () {
    return (
      <PatchContext.Consumer>
        {({patch, setPatch}) => (
          <Dropdown
            key={`patch-dropdown-${patch.available.length}`}
            options={patch.available}
            preselect={patch.selected}
            onSelected={(value) => setPatch({
              selected: value,
              url: `patch-${value.replace('.', '-')}` })}
            size='sm'
          />
        )}
      </PatchContext.Consumer>
    )
  }
}

export default PatchSelector