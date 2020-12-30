const getSalt = (length: number) => {
  const salt = Array.from(crypto.getRandomValues(new Uint8Array(length)))
    .map((byte) => String.fromCharCode(byte))
    .join('')
  return btoa(salt)
}

export default getSalt
