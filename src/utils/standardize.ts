const standardize = (value: string): [string | number, string | undefined] => {
  value = value.trim()
  let number = parseFloat(value)
  number = number < 0 ? 0 : number
  let unit =
    value
      .slice(value.match(/^((\d+\.?\d*)|(\d*\.?\d+))\s*/)?.[0].length)
      .trim() || undefined
  if (unit?.match(/^(g|kg|ml|l|tsp|tbsp|克|千克|毫升|升|茶匙|汤匙)$/i)?.[0]) {
    unit = unit.toLowerCase()
    switch (unit) {
      case '克':
        unit = 'g'
        break
      case 'kg':
      case '千克':
        number = number * 1000
        unit = 'g'
        break
      case '毫升':
        unit = 'ml'
        break
      case 'l':
      case '升':
        number = number * 1000
        unit = 'ml'
        break
      case 'tsp':
      case '茶匙':
        number = number * 5
        unit = 'ml'
        break
      case 'tbsp':
      case '汤匙':
        number = number * 15
        unit = 'ml'
        break
    }
  }
  if (Number.isNaN(number)) return [value, undefined]
  return [number, unit]
}

export default standardize
