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
  r.keys().forEach(key => cache[directory][key] = r(key))
}

const getImageName = (value) => {
  // eslint-disable-next-line
  const regex = /[|&;$%@"'<>()+,\s\-]|(TFT_)/
  return `./${value.replace(regex, '').toLowerCase()}.png`
}

/**
 * unfortunately require.context function parameters must be literals
 * the path must be statically analyzable --> put each path into a function
 */

const importChampions = (directory) => {
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
  getImageName
}