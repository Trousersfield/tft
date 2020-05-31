import { createContext } from 'react'
import patches from '../static/patchNotes/'

export const patch = {
  available: patches.map(patch => {
    return {
      selected: false,
      value: patch.number,
      name: patch.number
    }
  }),
  selected: patches[0].number,
  url: `patch-${patches[0].number.replace('.', '-')}`
}

export const PatchContext = createContext({
  patch,
  setPatch: () => {}
})