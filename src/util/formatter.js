const makePercent = (number, decimals = 2) => {
  return Math.floor(number.toFixed(decimals) * 100).toString() + '%'
}

export {
  makePercent
}