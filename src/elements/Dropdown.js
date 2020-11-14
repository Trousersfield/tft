import React from 'react'
import {
  IoIosArrowDropdownCircle,
  IoIosArrowDropupCircle
} from 'react-icons/io'

const SIZE = {
  'sm': 'w-64',
  'md': 'w-96',
  'lg': 'w-128',
  'full': 'w-full',
  'auto': 'w-auto'
}

class Dropdown extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      menuVisible: false,
      selected: null
    }
    this.showDropdownMenu = this.showDropdownMenu.bind(this)
    this.hideDropdownMenu = this.hideDropdownMenu.bind(this)
  }

  showDropdownMenu (event) {
    event.preventDefault()
    this.setState({ menuVisible: true }, () => {
      document.addEventListener('click', this.hideDropdownMenu);
    })
  }

  hideDropdownMenu (event) {
    event.preventDefault()
    this.setState({ menuVisible: false}, () => {
      document.removeEventListener('click', this.hideDropdownMenu)
    })
  }

  setSelected (value) {
    this.setState({ selected: value })
    this.props.onSelected(value)
  }

  getSizeClass () {
    const size = this.props.size

    if (size && SIZE[size]) {
      return SIZE[this.props.size]
    }
    return SIZE['md']
  }

  componentDidMount () {
    if (this.props.preselect) {
      this.setSelected(this.props.preselect)
    }
  }

  render () {
    const { menuVisible, selected } = this.state
    const {
      options,
      placeholder,
      selectedPrefix
    } = this.props

    const sizeClass = this.getSizeClass()

    const header = selected && options.length ?
      options.find(option => option.value === selected).name :
      placeholder || 'Select option'

    return (
      <div className={`relative inline-block cursor-pointer ${sizeClass}`}>
        <div className="w-full flex flex-no-wrap justify-between items-center rounded
          py-1 px-3 bg-transparent border-2 border-gray-600 text-gray-100"
          onClick={this.showDropdownMenu}
        >
          <p className="mr-2">
            {(selectedPrefix ? `${selectedPrefix} ` : '') + header}
          </p>
          {menuVisible ?
            <IoIosArrowDropupCircle /> :
            <IoIosArrowDropdownCircle />
          }
        </div>
        {menuVisible ? (
          <div className="bg-gray-700 flex flex-col absolute w-full z-50 shadow rounded overflow-hidden">
            {options.map(option => (
              <div
                key={'option-' + option.value}
                className={'flex flex-no-wrap justify-between items-center h-12 hover:bg-gray-600 ' +
                  (selected === option.value ? 'font-semibold text-green-300' : '')}
                onClick={() => this.setSelected(option.value)}
              >
                <p className="ml-2">{option.name}</p>
                <p className="mr-2 text-sm font-normal italic tracking-wide whitespace-no-wrap">
                  {option.meta}
                </p>
              </div>
            ))}
          </div>
        ):
        ( null )}
       </div>
    )
  }
}

export default Dropdown