import React from 'react'
import patches from '../static/patchNotes/'
import { cache as dataCache } from '../util/setDataImporter'

class PatchEffect extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      patchNumber: this.props.match.params.patchNumber,
      patch: undefined,
      classification: null
    }
  }

  componentDidMount () {
    console.log('patches: ', patches)
    this.setState(state => {
      const patch = patches.find(p => p.number === state.patchNumber)
      const classification = patch.categories.reduce((result, curr) => {
        if (!this.isClassifiable(curr.title)) return result
        const categoryData = dataCache[curr.title.toLowerCase()]
        // console.log('category data: ', categoryData)
        console.log('curr title: ', curr.title)

        if (!categoryData) return result
        const subjects = categoryData.reduce((result, curr) => {
          const key = curr.key || curr.championId || curr.id
          result[key] = { name: curr.name, class: null }
          return result
        }, {})

        result[curr.title.toLocaleLowerCase()] = subjects
        return result
      }, {})
      return { patch, classification }
    })
  }

  isClassifiable (category) {
    return ['traits', 'champions', 'items'].findIndex(c =>
      c === category.toLowerCase()) > -1
  }

  setSubject (category, subject, value) {
    const cat = category.toLowerCase()
    switch (cat) {
      case 'traits':
        return 'Set3_'
      case 'items':
        return ''
    }
  }

  getSubject (category, note) {
    const cat = category.toLowerCase()
    const lowerNote = note.toLowerCase()
    const subject = Object.keys(this.state.classification[cat])
      .reduce((result, curr) => {
        if (result) return result
        const name = this.state.classification[cat][curr].name.toLowerCase()
        if (lowerNote.includes(name)) result = name
        return result
      }, undefined)
    // console.log('category: ', cat, 'note: ', note, 'subject: ', subject)
    return subject
  }

  computeDigitTrend (note) {
    const digits = note.match(/\d+/g)
    if (!digits) return
    const prefix = digits.slice(0, digits.length / 2)
    const suffix = digits.slice(digits.length / 2)
    console.log('prefix: ', prefix, ' suffix: ', suffix)
    return prefix < suffix ? 1 : prefix === suffix ? 0 : -1
  }

  render () {
    const { patch, classification } = this.state
    console.log('classification: ', classification)

    return (
      <div className="flex flex-col relative h-full">
        {patch ?
        <>
          <div key={patch.number}>Classify {patch.number}</div>
          {patch.categories.map(category =>
            <div key={category.title}>
              {this.isClassifiable(category.title) &&
              <>
                <div>Classify category {category.title}</div>
                {category.sections.map((section, sectionIndex) =>
                  <div key={category.title + '-' + sectionIndex}>
                    Classify section {section.title}
                    {section.notes.map((note, noteIndex) =>
                      <div
                        key={section.title + '-note-' + noteIndex}
                        className="flex"
                      >
                        <div className="w-1/2">
                          {note}
                        </div>
                        <div className="w-1/2 flex flex-no-wrap">
                          subject: {this.getSubject(category.title, note)}
                          digits: {this.computeDigitTrend(note)}
                          <button></button>
                          <button></button>
                          <button></button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </>
              }
            </div>
          )}
        </>
        : <div>Patch Selection went wrong :(</div>}
      </div>
    )
  }
}

export default PatchEffect