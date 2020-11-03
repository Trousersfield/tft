const data = {}

let loading = false

const importSetData = async () => {
  if (loading) {
    return
  }
  await loadData(require.context('../../public/riot/data', true, /\.json$/))
}

const loadData = async (dataFiles, forceReload = false) => {
  return new Promise(resolve => {
    loading = true

    for (const dataFile of dataFiles.keys()) {
      const dataName = dataFile.split('/')[1].split('.').shift()

      if (data[dataName] && !forceReload) {
        return
      }

      const fileContent = dataFiles(dataFile)

      // for some reason riot offers data as lists
      // create objects for constant access
      if (dataName === 'champions') {
        data[dataName] = fileContent.reduce((acc, curr) => {
          acc[curr.championId] = curr
          return acc
        }, {})
      }

      else if (dataName === 'items') {
        data[dataName] = fileContent.reduce((acc, curr) => {
          acc[curr.id] = curr
          return acc
        }, {})
      }

      else if (dataName === 'traits') {
        data[dataName] = fileContent.reduce((acc, curr) => {
          acc[curr.key] = curr
          return acc
        }, {})
      }

      else {
        console.warn('Unknown name of data file: ', dataName)
      }
    }

    loading = false
    resolve()
  })
}

export {
  data,
  importSetData
}