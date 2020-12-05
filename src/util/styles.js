let tailwindCache = null
let loading = false

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

const dropdownStyle = {
  select: 'inline-block w-full px-2 py-1 ' +
    'bg-yellow-500 border border-gray-500 rounded ' + // colors
    'overflow-hidden ' + // typography
    'cursor-pointer', // interaction
  option: 'flex flex-no-wrap cursor-pointer hover:bg-indigo-400'
}

const placementColors = () => {
  if (!tailwindCache) {
    return
  }
  const colors = tailwindCache.theme.colors
  return [colors.green[600],
    colors.green[500],
    colors.green[400],
    colors.green[300],
    colors.red[300],
    colors.red[400],
    colors.red[500],
    colors.red[600]]
}

const costColor = (cost, format = 'class') => {
  if (!tailwindCache) {
    return
  }
  const colors = tailwindCache.theme.colors
  const costColors = {
    1: {
      class: 'gray-500',
      rgb: colors.gray[500]
    },
    2: {
      class: 'green-500',
      rgb: colors.green[500]
    },
    3: {
      class: 'blue-500',
      rgb: colors.blue[500]
    },
    4: {
      class: 'purple-500',
      rgb: colors.purple[500]
    },
    5: {
      class: 'yellow-500',
      rgb: colors.yellow[500]
    },
    7: {
      class: 'red-500',
      rgb: colors.red[500]
    }
  }

  if (format === 'rgb') {
    return costColors[cost].rgb
  }
  return costColors[cost].class
}

const getColorCode = async (color, intensity = 500) => {
  if (!tailwindCache) {
    return
  }
  const colors = tailwindCache.theme.colors
  if (!color || !colors[color]) return color
  return colors[color][intensity]
}

export {
  dropdownStyle,
  placementColors,
  costColor,
  getColorCode,
  loadTailwindConfig
}