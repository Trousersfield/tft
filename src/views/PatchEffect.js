import React from 'react'
import patches from '../static/patchNotes/'
import { data as setData } from '../util/setDataImporter'
import {
  GoArrowUp,
  GoArrowDown,
  GoArrowRight
} from 'react-icons/go'
import { IoIosSync } from 'react-icons/io'

import axios from 'axios'


const stats = (value) => {
  const STATS = {
    mana: 'lt',
    attack: 'gt',
    health: 'gt',
    armor: 'gt',
    magicresist: 'gt',
    spellpower: 'gt'
  }
  const stat = value.toLowerCase().trim()
  return STATS[stat]
}

class PatchEffect extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      patchNumber: this.props.match.params.patchNumber,
      patch: null,
      notes: null,
      classes: null,
      classification: null,
      loadedClasses: null,
      loadingClasses: false,
      errors: { loadedClasses: null }
    }
  }

  async componentDidMount () {
    this.loadSavedClasses()

    this.setState(state => {
      const patch = patches.find(p => p.number === state.patchNumber)

      // set possible classification classes from data cache
      const [ classes, notes ] = patch.categories.reduce((result, curr) => {
        if (!this.isClassifiable(curr.title)) return result
        const categoryData = setData[curr.title.toLowerCase()]

        if (!categoryData) return result
        const subjects = categoryData.reduce((result, curr) => {
          const key = curr.key || curr.championId || curr.id
          result[key] = { name: curr.name, class: null }
          return result
        }, {})

        const notes = curr.sections.reduce((secResult, section) => {
          const noteResults = section.notes.reduce((noteResult, note) => {
            noteResult.push(note)
            return noteResult
          }, [])
          secResult = secResult.concat(noteResults)
          return secResult
        }, [])

        result[0][curr.title.toLocaleLowerCase()] = subjects
        result[1] = result[1].concat(notes)
        return result
      }, [{}, []])
      return { patch, notes, classes }
    }, () => this.makeDefaultClassification())
  }

  async loadSavedClasses () {
    this.setState({ loadingClasses: true })
    try {
      const { data } = await axios
        .get(`http://localhost:8080/patch/effects/${this.state.patchNumber}`)

      if (data && data !== '') this.setState({ loadedClasses: data })
    } catch (error) {
      console.error(error)
    }
    this.setState({ loadingClasses: false })
  }

  isClassifiable (category) {
    return ['traits', 'champions', 'items'].findIndex(c =>
      c === category.toLowerCase()) > -1
  }

  makeDefaultClassification () {
    this.setState(state => {
      if (!state.patch) return
      const classification = state.patch.categories
        .reduce((catResult, category) => {
          if (!this.isClassifiable(category.title)) return catResult
          const secResults = category.sections.reduce((secResult, section) => {
            const noteResults = section.notes.reduce((noteResult, note) => {
              const { subject, dataStructure } =
                this.computeClassStructure(category.title, section.title, note)
              const digitTrend = this.computeDigitTrend(note, subject)
              const value = this.getClass(digitTrend)
              noteResult.push({ subject, value, dataStructure })
              return noteResult
            }, [])
            secResult = secResult.concat(noteResults)
            return secResult
          }, [])
          catResult = catResult.concat(secResults)
          return catResult
        }, [])
      return { classification }
    })
  }

  computeClassStructure (category, section, note) {
    const RESERVED_STRING = 'of the and iv'

    const cat = category.toLowerCase()
    const lowerNote = note.toLowerCase().replace(/[`´'"’]/, '')
    const structure = Object.keys(this.state.classes[cat])
      .reduce((result, curr) => {
        if (result[0]) return result
        const name = this.state.classes[cat][curr].name
          .toLowerCase().replace(/[`´'"’]/, '')
        // section might specify subject
        const sec = section ? section.toLowerCase() : ''
        if (lowerNote.includes(name) ||
          sec.includes(name)) {
            result[0] = name
            result[1] = { key1: cat, key2: curr }
          }
        else {
          // try splitting name on whitespace if shorthands are used
          const splitName = name.split(' ')
          if (splitName.length > 1) {
            for (const partition of splitName) {
              if (!result[0] && !RESERVED_STRING.includes(partition) && lowerNote.includes(partition)) {
                result[0] = name
                result[1] = { key1: cat, key2: curr }
              }
            }
          }
        }
        return result
      }, [undefined, undefined])
    return { subject: structure[0], dataStructure: structure[1] }
  }

  computeDigitTrend (note, subject) {
    const digits = note.match(/\d+/g)
    if (!digits) return
    const prefix = digits.slice(0, digits.length / 2)
    const suffix = digits.slice(digits.length / 2)

    switch (stats[subject]) {
      case 'lt':
        return prefix > suffix ? 1 : prefix === suffix ? 0 : -1
      case 'gt':
      default:
        return prefix < suffix ? 1 : prefix === suffix ? 0 : -1
    }
  }

  getClass (value) {
    switch (value) {
      case -2:
        return 'rework'
      case -1:
        return 'nerf'
      case 1:
        return 'buff'
      case 0:
      default:
        return 'neutral'
    }
  }

  toggleClass (index) {
    const classMapping = { nerf: 1, buff: 0, neutral: -1 }
    this.setState(state => {
      let classification = state.classification
      const currentValue =  classification[index].value
      classification[index].value = this.getClass(classMapping[currentValue])
      return { classification }
    })
  }

  applySavedClasses () {
    this.setState(state => {
      const setClasses = state.classification.reduce((result, entry) => {
        const key = entry.dataStructure.key2
        const loadedClass = state.loadedClasses[key]
        if (loadedClass && entry.value !== loadedClass) {
          const newEntry = entry
          newEntry.value = loadedClass
          result.push(newEntry)
        } else result.push(entry)
        return result
      }, [])
      return { classification: setClasses }
    })
  }

  async save () {
    if (this.state.saving) return
    this.setState({ saving: true })
    try {
      await axios.post(
        `http://localhost:8080/patch/classify/${this.state.patchNumber}`,
        { data: this.state.classification })

        this.loadSavedClasses()
    } catch (error) {
      console.error(error)
    }
    this.setState({ saving: false })
  }

  render () {
    const {
      patchNumber,
      notes,
      classification,
      loadedClasses,
      loadingClasses,
      saving
    } = this.state

    return (
      <div className="flex flex-col mx-5 pb-10">
        {patchNumber ?
        <>
          <div
            key={patchNumber}
            className="my-5"
          >
            <p className="text-xl mx-auto">
              Classify {patchNumber}
            </p>
          </div>
          <div className="flex mb-2 text-lg">
            <div className="w-1/2">
              Notes
            </div>
            <div className="w-1/4">Subject</div>
            <div className="w-1/4 flex justify-between">
              <div>Computed</div>
              {loadingClasses ?
                <div>Loading ...</div>
                : loadedClasses ?
                    <div className="flex flex-col">
                      <p className="mx-auto">Saved</p>
                      <button className="inline-flex items-center bg-blue-500
                        text-white font-semibold rounded px-2 py-1"
                        onClick={() => this.applySavedClasses()}
                      >
                        <IoIosSync className="mr-2"/>
                        Apply
                      </button>
                    </div>
                  : <div>No Save found</div>
              }
            </div>
          </div>
          {notes && classification && notes.map((note, index) =>
            <div
              key={'note-' + index}
              className={`flex items-center p-2
                ${index % 2 === 0 ? 'bg-gray-200' : ''}`
              }
            >
              <div className="w-1/2 align-middle">
                {note}
              </div>
              <div className="w-1/4">
                {classification[index].subject}
              </div>
              <div className="w-1/4 flex justify-between items-center">
                <button
                  className={`w-24 inline-flex items-center px-3 py-1
                    rounded text-white font-bold
                    ${classification[index].value === 'buff' ?
                      'bg-green-500 hover:bg-green-600' :
                      classification[index].value === 'nerf' ?
                        'bg-red-500 hover:bg-red-600' :
                        'bg-gray-500 hover:bg-gray-600'}`}
                  onClick={() => this.toggleClass(index)}
                >
                  <StatusIcon value={classification[index].value}/>
                  <span className="ml-2">{classification[index].value}</span>
                </button>
                {loadedClasses &&
                loadedClasses[classification[index].dataStructure.key2] &&
                  <StatusIcon
                    value={loadedClasses[classification[index].dataStructure.key2]}
                    colored={true}
                  />
                }
              </div>
            </div>
          )}
          <div className="mt-2 pt-2 px-3 flex justify-end border-t-2 border-gray-400">
            <button
              className={`py-3 w-28 rounded text-white font-bold text-white
                bg-blue-500 hover:bg-blue-600
                ${saving ? 'disabled' : ''}
              `}
              onClick={() => this.save()}
            >
              {saving ? 'Saving ...' : 'Save' }
            </button>
          </div>
        </>
        : <div>Patch Selection went wrong :(</div>}
      </div>
    )
  }
}

const StatusIcon = (props) => {
  const colored = props.colored

  switch (props.value) {
    case 'buff':
      return (
        <GoArrowUp className={colored ? 'text-green-500' : ''}/>
      )
    case 'nerf':
      return (
        <GoArrowDown className={colored ? 'text-red-500' : ''}/>
      )
    case 'neutral':
    default:
      return (
        <GoArrowRight className={colored ? 'text-gray-500' : ''}/>
      )
  }
}

export default PatchEffect