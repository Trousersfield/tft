import React from 'react'
import { cache as imageCache, importImages } from '../util/imageImporter'
import patches from '../static/patchNotes'
import { NavLink } from 'react-router-dom'

class PatchNotes extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedPatch: undefined,
      patchNumbers: []
    }

    if (!imageCache.traits) importImages('traits')
  }

  componentDidMount () {
    if (patches.length < 1) return
    this.setState({
      selectedPatch: patches[0],
      patchNumbers: patches.map(p => p.number)
    })
  }

  selectPatch (patchNumber) {
    const patch = patches.find(p => p.number === patchNumber)
    this.setState({ selectedPatch: patch })
  }

  scrollToElement (id) {
    const element = document.getElementById(id)
    const container = document.getElementById('patch-notes-content')
    if (!element || !container) {
      return
    }
    const elementTop = element.getBoundingClientRect().top
    const containerTop = container.getBoundingClientRect().top
    const scrollPos = elementTop - containerTop
    container.scrollBy({ top: scrollPos, left: 0, behavior: 'smooth' })
  }

  render () {
    const { selectedPatch, patchNumbers } = this.state

    return (
      <div className="flex relative h-full">
        <div className="h-full bg-gray-200">
          {false && selectedPatch &&
            <NavLink
              to={`/patch-notes/classify/${selectedPatch.number}`}
              exact
              className="p-2 mx-1"
            >
              Classify {selectedPatch.number}
            </NavLink>
          }
          <ul className="w-20 mt-10 mx-3 border-r-2 border-gray-500 text-xl">
            {patchNumbers.map(number =>
              <li key={`patch-list-item-${number}`}
                className={'cursor-pointer ' +
                  (number === selectedPatch.number ? 'font-bold text-indigo-800' : '')}
                onClick={() => this.selectPatch(number)}
              >
                {number}
              </li>
            )}
          </ul>
        </div>
        <div
          id="patch-notes-content"
          className="flex-1 overflow-auto px-2 leading-relaxed bg-white"
        >
          {selectedPatch &&
            <div className="flex flex-col">
              {selectedPatch.categories.map((cat, catIndex) =>
                <div
                  id={`category-${cat.title}`}
                  key={`category-${catIndex}`}
                >
                  <div className="flex flex-no-wrap items-center">
                    <div className="w-1/4 align-middle
                      border-t-2 border-indigo-200" />
                    {cat.title ?
                      <p className="mx-3 text-indigo-800 text-2xl tracking-wide">
                        {cat.title}
                      </p> :
                      null
                    }
                    <div className="flex-1 align-middle
                      border-t-2 border-indigo-200" />
                    </div>
                  {cat.sections.map((sec, secIndex) =>
                    <div
                      key={'cat-' + catIndex + '-sec-' + secIndex}
                      className="mx-2 lg:mx-auto my-4 p-2 bg-indigo-100 shadow-xl
                        max-w-6xl"
                    >
                      {sec.title ?
                        <p className="text-lg text-indigo-800 tracking-wide mb-2">
                          {sec.title}
                        </p> :
                        null
                      }
                      <ul className="list-disc ml-5">
                        {sec.notes.map((note, noteIndex) =>
                          <li key={'cat-' + catIndex + '-sec-' +
                            secIndex + '-note-' + noteIndex}>
                            {note}
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          }
        </div>
        <div className="h-full bg-gray-200 xs:hidden sm:hidden md:block">
          {selectedPatch &&
          <ul className="mt-10 mx-3 pl-4 border-l-2 border-gray-500 text-xl">
            {selectedPatch.categories.map(cat =>
              <li key={`category-list-item-${cat.title}`}
                className={'cursor-pointer'}
                onClick={() => this.scrollToElement('category-' + cat.title)}
              >
                {cat.title}
              </li>
            )}
          </ul>}
        </div>
      </div>
    )
  }
}

export default PatchNotes
