import { createContext } from 'react'

export const user = {
  name: 'Max Mustermann',
  patch: 'latest'
}

export const UserContext = createContext({
  user,
  setPatch: () => {}
})