const isNull = (value: string | string[]) => {
  value = value instanceof Array ? value.flat().join() : value.trim()
  return value.length === 0
}

export default isNull
