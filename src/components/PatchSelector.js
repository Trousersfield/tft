import React from 'react'
import patches from '../static/patchNotes/'
import { UserContext } from '../context/User'

const Dropdown = React.lazy(() => import('./Dropdown'))

class PatchSelector extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      dropdownOptions: patches.map(patch => {
        return {
          selected: false,
          name: patch.number,
          value: patch.number
        }
      })
    }
  }

  render () {
    const { dropdownOptions } = this.state

    return (
      <UserContext.Consumer>
        {({user, setUser}) => (
          <Dropdown
            options={dropdownOptions}
            preselect={user.patch}
            onSelected={(value) => setUser({ patch: value })}
            size='sm'
          />
        )}
      </UserContext.Consumer>
    )
  }
}

export default PatchSelector