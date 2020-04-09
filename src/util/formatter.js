const makePercent = (number, decimals = 2) => {
  const pow = Math.pow(10, decimals)
  return (Math.floor(number.toFixed(decimals) * pow)) /
    Math.pow(10, decimals-2).toString() + '%'
}

export {
  makePercent
}