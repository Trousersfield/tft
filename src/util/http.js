import axios from 'axios'
import env from '../env'

let PATCH = ''

const sanitizeUrl = (url) => {
  return url ? url.charAt(0) === '/' ? url : '/' + url : ''
}

const getApiUrl = (url, usePatch) => {
  return env.API_URL + sanitizeUrl(url) + (usePatch ? `/${PATCH}` : '')
}

const get = async (url, usePatch = true) => {
  const result = await axios.get(getApiUrl(url, usePatch))
  return result
}

const setPatch = (patch) => {
  PATCH = `patch-${patch.toString().replace('.', '-')}`
}

export default {
  get,
  setPatch
}
