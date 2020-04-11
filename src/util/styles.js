const tailwindConfig = () => {
  const r = require.context('../..', false, /tailwind.config.js$/)
  return r(r.keys()[0])
}

const buttonBase = 'bg-blue-500 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded'

const dropdownStyle = {
  select: 'inline-block w-full px-2 py-1 ' +
    'bg-yellow-500 border border-gray-500 rounded ' + // colors
    'overflow-hidden ' + // typography
    'cursor-pointer', // interaction
  option: 'flex flex-no-wrap cursor-pointer hover:bg-indigo-400'
}

const placementColors = () => {
  const colors = tailwindConfig().theme.colors
  return [colors.green[600],
    colors.green[500],
    colors.green[400],
    colors.green[300],
    colors.red[300],
    colors.red[400],
    colors.red[500],
    colors.red[600]]
}

export {
  buttonBase,
  dropdownStyle,
  placementColors
}