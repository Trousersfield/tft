// do not access directly, use getTailwindCache()
let tailwindCache = null
let loading = false

const getTailwindConfig = async () => {
  if (!tailwindCache) await loadTailwindConfig()
  return tailwindCache
}

const loadTailwindConfig = async () => {
  if (loading) return
  new Promise(resolve => {
    loading = true
    const r = require.context('../..', false, /tailwind.config.js$/)
    tailwindCache = r(r.keys()[0])
    loading = false
    resolve()
  })
}

const buttonBase = 'bg-blue-500 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded'

const dropdownStyle = {
  select: 'inline-block w-full px-2 py-1 ' +
    'bg-yellow-500 border border-gray-500 rounded ' + // colors
    'overflow-hidden ' + // typography
    'cursor-pointer', // interaction
  option: 'flex flex-no-wrap cursor-pointer hover:bg-indigo-400'
}

const placementColors = async () => {
  const cache = await getTailwindConfig()
  const colors = cache.theme.colors
  return [colors.green[600],
    colors.green[500],
    colors.green[400],
    colors.green[300],
    colors.red[300],
    colors.red[400],
    colors.red[500],
    colors.red[600]]
}

const costColor = (cost) => {
  const costColors = { 1: 'gray', 2: 'green', 3: 'blue', 4: 'purple',
    5: 'orange', 7: 'red' }
  return costColors[cost]
}

export {
  buttonBase,
  dropdownStyle,
  placementColors,
  costColor
}