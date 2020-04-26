import React from 'react'
import { cache as imageCache, importImages } from '../util/imageImporter'
import patches from '../static/patchNotes/'

class PatchNotes extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedPatch: undefined,
      patchNumbers: []
    }

    if (!imageCache['traits']) importImages('traits')
  }

  componentDidMount () {
    if (patches.length < 1) return
    this.setState({
      selectedPatch: patches[0],
      patchNumbers: patches.map(p => p.number)
    })
    console.log('statE: ', this.state)
  }

  selectPatch (patchNumber) {
    const patch = patches.find(p => p.number === patchNumber)
    this.setState({ selectedPatch: patch })
  }

  scrollToElement (id) {
    const element = document.getElementById(id)
    const container = document.getElementById('patch-notes-content')
    if (!element || !container) return
    const elementTop = element.getBoundingClientRect().top
    const containerTop = container.getBoundingClientRect().top
    const scrollPos = elementTop - containerTop
    container.scrollBy({ top: scrollPos, left: 0, behavior: 'smooth' })
  }

  render () {
    const { selectedPatch, patchNumbers } = this.state

    return (
      <div className="flex relative h-full">
        <div className="h-full">
          <ul className="mt-10 mx-3 pr-2 border-r-2 border-gray-500 text-xl">
            {patchNumbers.map(number =>
              <li key={`patch-list-item-${number}`}
                className={'cursor-pointer ' +
                  (number === selectedPatch.number ? 'font-bold' : '')}
                onClick={() => this.selectPatch(number)}
              >
                {number}
              </li>
            )}
          </ul>
        </div>
        <div
          id="patch-notes-content"
          className="flex-1 overflow-auto px-2 leading-relaxed"
        >
          {selectedPatch &&
            <div className="flex flex-col">
              {selectedPatch.categories.map((cat, catIndex) =>
                <div
                  id={`category-${cat.title}`}
                  key={`category-${catIndex}`}
                >
                  {cat.title ?
                    <div className="text-2xl tracking-wide">
                      {cat.title}
                    </div> :
                    null
                  }
                  {cat.sections.map((sec, secIndex) =>
                    <div
                      key={'cat-' + catIndex + '-sec-' + secIndex}
                      className="m-2 p-2 bg-indigo-200 border-t border-gray-800
                        shadow-lg"
                    >
                      {sec.title ?
                        <div className="text-lg tracking-wide mb-2">
                          {sec.title}
                        </div> :
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
        <div className="h-full">
          {selectedPatch &&
          <ul className="mt-10 mx-3 pl-2 border-l-2 border-gray-500 text-xl">
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