const path = require('path')
const cache = {}

const importImages = (directory) => {
  if (cache[directory]) return
  cache[directory] = {}

  // TODO: perform dynamic check if the requested directory exist
  switch (directory) {
    case 'champions':
      importChampions(directory)
      break
    case 'items':
      importItems(directory)
      break
    case 'other':
      importOther(directory)
      break
    case 'ranked-emblems':
      importRankedEmblems(directory)
      break
    case 'tiers':
      importTiers(directory)
      break
    case 'traits':
      importTraits(directory)
      break
    default:
      break
  }
}

const importAll = (directory, r) => {
  for (const file of r.keys()) {
    const fileName = path.basename(file, '.png')
    cache[directory][fileName] = r(file)
  }
}

// const getImageId = (value) => {
//   // eslint-disable-next-line
//   const prefixRegex = /[|&;$%@"'<>()+,\s\-]|(TFT[\d]*_)/
//   return value.replace(prefixRegex, '')
// }

const getBackgroundOffset = (style) => {
  let baseOffset = 331 / 6 // 311px = sprite-image width
  switch (style) {
    case 'iron':
      break
    case 'bronze':
      baseOffset *= 2
      break
    case 'silver':
      baseOffset *= 3
      break
    case 'gold':
      baseOffset *= 4
      break
    case 'chromatic':
      baseOffset *= 5
      break
    case 'base':
    default:
      baseOffset = 0
      break
  }
  return baseOffset
}

/**
 * unfortunately require.context function parameters must be literals
 * the path must be statically analyzable --> put each path into a function
 */

const importChampions = (directory) => {
  console.log('importing champs')
  importAll(
    directory,
    require.context('../../public/riot/champions', true, /\.png$/)
  )
}

const importItems = (directory) => {
  importAll(
    directory,
    require.context('../../public/riot/items', true, /\.png$/)
  )
}

const importOther = (directory) => {
  importAll(
    directory,
    require.context('../../public/riot/other', true, /\.png$/)
  )
}

const importRankedEmblems = (directory) => {
  importAll(
    directory,
    require.context('../../public/riot/ranked-emblems', true, /\.png$/)
  )
}

const importTiers = (directory) => {
  importAll(
    directory,
    require.context('../../public/riot/tiers', true, /\.png$/)
  )
}

const importTraits = (directory) => {
  importAll(
    directory,
    require.context('../../public/riot/traits', true, /\.png$/)
  )
}

export {
  cache,
  importImages,
  // getImageName,
  getBackgroundOffset
}