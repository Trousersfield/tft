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
      displayMenu: false,
      placeholder: this.props.placeholder || 'Choose option',
      selected: this.props.preselect,
      options: this.props.options || [],
      size: (this.props.size && SIZE[this.props.size]) ?
        SIZE[this.props.size] : SIZE['md']
    }
    this.showDropdownMenu = this.showDropdownMenu.bind(this)
    this.hideDropdownMenu = this.hideDropdownMenu.bind(this)
  }

  showDropdownMenu (event) {
    event.preventDefault()
    this.setState({ displayMenu: true }, () => {
      document.addEventListener('click', this.hideDropdownMenu);
    })
  }

  hideDropdownMenu (event) {
    this.setState({ displayMenu: false}, () => {
      document.removeEventListener('click', this.hideDropdownMenu)
    })
  }

  setSelected (value) {
    this.setState({ selected: value })
    this.props.onSelected(value)
  }

  render () {
    const { displayMenu, placeholder, selected, options, size } = this.state
    const header = selected && options.length ?
      options.find(option => option.value === selected).name :
      placeholder

    console.log('header: ', header)
    console.log('selected: ', selected)

    return (
      <div className={`relative inline-block cursor-pointer ${size}`}>
        <div className="w-full flex flex-no-wrap justify-between items-center
          py-1 px-3 bg-white border border-gray-900 rounded"
          onClick={this.showDropdownMenu}>
          <p className="mr-2">{header}</p>
          {displayMenu ?
            <IoIosArrowDropupCircle /> :
            <IoIosArrowDropdownCircle />}
        </div>
        {displayMenu ? (
          <div className="flex flex-col absolute w-full z-50 shadow">
            {options.map(option => (
              <div
                key={'option-' + option.value}
                className={'flex flex-no-wrap justify-between align-middle ' +
                  'bg-white py-1 px-3 whitespace-no-wrap hover:bg-gray-200 ' +
                  (selected === option.value ?
                    'font-semibold text-indigo-800 bg-gray-200' : '')}
                onClick={() => this.setSelected(option.value)}
              >
                {option.name}
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