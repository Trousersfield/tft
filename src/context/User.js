import { createContext } from 'react'

export const user = {
  name: 'Max Mustermann',
  patch: '10.7'
}

export const UserContext = createContext({
  // patch: user.patch,
  user,
  setUser: () => {}
})