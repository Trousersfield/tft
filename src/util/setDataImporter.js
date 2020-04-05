const cache = {}

const importSetData = () => {
  importAll(require.context('../../public/riot', true, /\.json$/))
}

const importAll = (r) => {
  r.keys().forEach(key => {
    const newKey = key.split('\\').pop().split('/').pop().split('.').shift()
    cache[newKey] = r(key)
  })
}

export {
  cache,
  importSetData
}