const digest = async (value: string) => {
  const textArray = new TextEncoder().encode(value)
  const hashBuffer = await crypto.subtle.digest('SHA-512', textArray)
  const hash = Array.from(new Uint8Array(hashBuffer))
    .map((byte) => String.fromCharCode(byte))
    .join('')
  return btoa(hash)
}

export default digest
