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

  render () {
    const { selectedPatch, patchNumbers } = this.state

    if (selectedPatch) {
      console.log('bool: ', selectedPatch.number === patchNumbers[0])
    }

    // use index for saying "latest patch"
    // console.log('index: ', index)

    return (
      <div className="flex">
        <div className="flex flex-col px-2 bg-yellow-200">
          <ul>
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
        <div className="flex-1 px-2 bg-green-200 leading-relaxed">
          {selectedPatch &&
            <div className="flex flex-col">
              {selectedPatch.categories.map((cat, catIndex) =>
                <div key={`category-${catIndex}`}>
                  {cat.title ?
                    <div className="font-bold text-xl tracking-wide">
                      {cat.title}
                    </div> :
                    null
                  }
                  {cat.sections.map((sec, secIndex) =>
                    <div
                      key={'cat-' + catIndex + '-sec-' + secIndex}
                      className="m-2 p-2 bg-indigo-200 border border-gray-500
                        "
                    >
                      {sec.title ?
                        <div className="text-lg tracking-wide mb-3">
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
        {/*<div className="mt-6 bg-green-200 h-48 p-4">
            <div className="relative">
              <img
                src={imageCache['traits']['./bg.png']}
                alt="bg"
              />
              <img
                src={imageCache['traits']['./blademaster.png']}
                alt="blademaster"
                className="absolute top-0"
              />
            </div>
          </div>*/}
      </div>
    )
  }
}

export default PatchNotes