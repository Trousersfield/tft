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
    case 'ranked-emblems':
      importRankedEmblems(directory)
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

/**
 * unfortunately require.context function parameters must be literals
 * the path must be statically analyzable
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

const importRankedEmblems = (directory) => {
  importAll(
    directory,
    require.context('../../public/riot/ranked-emblems', true, /\.png$/)
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
  importImages
}