import { createContext } from 'react'
import patches from '../static/patchNotes/'

export const user = {
  name: '',
  patch: patches.length > 0 ? patches[0].number : ''
}

export const UserContext = createContext({
  user,
  setUser: () => {}
})