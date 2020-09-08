let cache = {}
// cache for all patches
const data = {}

let loading = false
// const importSetData = () => {
//   importAll(require.context('../../public/riot', true, /\.json$/))
// }

// const importAll = (r) => {
//   r.keys().forEach(key => {
//     const newKey = key.split('\\').pop().split('/').pop().split('.').shift()
//     cache[newKey] = r(key)
//   })
// }

const importSetData = async () => {
  if (loading) return
  await importPatches(require.context('../../public/riot/data', true, /\.json$/))

  setPatch()
}

const importPatches = async (patchFiles) => {
  return new Promise(resolve => {
    loading = true
    patchFiles.keys().forEach(patchFile => {
      const patchName = patchFile.split('/')[1]

      if (!data[patchName]) data[patchName] = {}

      const dataName = patchFile.split('/')[2].split('.').shift()
      data[patchName][dataName] = patchFiles(patchFile)
    })
    loading = false
    resolve()
  })
}

// set data for given patch from cache
const setPatch = (patchNumber = '') => {
  // data for given patch does not exist. Use latest patch data
  if (data[patchNumber]) {
    cache = data[patchNumber]
  } else {
    const patches =  Object.keys(data).sort((a, b) => a > b ? -1 : 1)
    console.log('patches: ', patches)
    const latestPatch = patches[patches.length - 1]
    cache = latestPatch ? data[latestPatch] : {}
    console.log('cache: ', cache)
  }
}

export {
  cache,
  importSetData,
  setPatch
}