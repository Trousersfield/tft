import axios from 'axios'
import env from '../env'

const send = async (url, payload = {}) => {
  // console.log('selected patch: ', patch.selected)
  const sanitizedUrl = url ?
    url.charAt(0) === '/' ? url : '/' + url :
    ''
  const result = await axios.get(`${env.API_URL}${sanitizedUrl}`)
  return result
}

export default {
  send
}
