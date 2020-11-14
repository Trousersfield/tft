const makePercent = (number, decimals = 2) => {
  const pow = Math.pow(10, decimals)
  return (Math.floor(number.toFixed(decimals) * pow)) /
    Math.pow(10, decimals-2).toString() + '%'
}

const scaleToPercent = (numbers, decimals = 2) => {
  const total = numbers.reduce((result, curr) => {return result += curr}, 0)
  const scaledNumbersInPercent = numbers.reduce((result, curr) => {
    if (curr === 0) result.push(0)
    else result.push(makePercent((curr / total), decimals))
    return result
  }, [])
  return scaledNumbersInPercent
}

const makeRanking = (number, whitespace = false) => {
  const num = number.toString()
  const numSuffix = num.slice(num.length - 2)
  let suffix = 'th'
  if (numSuffix !== '11' && numSuffix !== '12') {
    if (num.charAt(num.length - 1) === '1') suffix = 'st'
    else if (num.charAt(num.length -1) === '2') suffix = 'nd'
    else if (num.charAt(num.length -1
    ) === '3') suffix = 'rd'
  }
  return `${num}${whitespace ? ' ' : ''}${suffix}`
}

const printTraitName = (trait) => {

  const addWhiteSpaces = (value) => {
    const index = value.search(/[a-z][A-Z]/g)

    if (index > -1) {
      const prefix = value.substring(0, index + 1)
      const suffix = value.substring(index + 1)
      const result = prefix + ' ' + suffix

      if (result.search(/[a-z][A-Z]/g) > -1) {
        return addWhiteSpaces(result)
      }
      return result
    }
    return value
  }
  return addWhiteSpaces(trait)
}

const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp)

  let duration = new Date() - date
  console.log('duration: ', duration)

  duration -= duration % 1000
  duration /= 1000 // cut milliseconds
  duration -= duration % 60
  duration /= 60 // cut seconds
  duration -= duration % 60
  duration /= 60 // cut minutes 4683
  const hours = duration % 24
  duration -= hours
  duration /= 24 // cut hours
  const days = duration
  duration -= days // cut days
  duration /= 7

  return `${days} days ${hours} hours old`
}

export {
  makePercent,
  scaleToPercent,
  makeRanking,
  printTraitName,
  formatTimestamp
}