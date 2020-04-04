const cache = {}

const importImages = (directory) => {
  if (cache[directory]) return
  cache[directory] = {}

  // TODO: perform dynamic check if the requested directory exist
  switch (directory) {
    case 'ranked-emblems':
      importRankedEmblems(directory)
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
 * */
const importRankedEmblems = (directory) => {
  importAll(
    directory,
    require.context('../../public/riot/ranked-emblems', true, /\.png$/)
  )
}

export {
  cache,
  importImages
}