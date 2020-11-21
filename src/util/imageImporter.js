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

const importAll = (directory, type, r) => {
  for (const file of r.keys()) {
    const fileName = path.basename(file, `.${type}`)
    // set images' src: webpack module.default required
    cache[directory][fileName] = r(file).default
    if (type === 'svg') {
      console.log('svg file: ', file)
    }
  }
}

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

// static imports
const importChampions = (directory) => {
  importAll(
    directory,
    'png',
    require.context('../../public/riot/champions', true, /\.png$/)
  )
}

const importItems = (directory) => {
  importAll(
    directory,
    'png',
    require.context('../../public/riot/items', true, /\.png$/)
  )
}

const importOther = (directory) => {
  importAll(
    directory,
    'png',
    require.context('../../public/riot/other', true, /\.png$/)
  )
}

const importRankedEmblems = (directory) => {
  importAll(
    directory,
    'png',
    require.context('../../public/riot/ranked-emblems', true, /\.png$/)
  )
}

const importTiers = (directory) => {
  importAll(
    directory,
    'png',
    require.context('../../public/riot/tiers', true, /\.png$/)
  )
}

const importTraits = (directory) => {
  importAll(
    directory,
    'svg',
    require.context('../../public/riot/traits', true, /\.svg$/)
  )
}

export {
  cache,
  importImages,
  getBackgroundOffset
}