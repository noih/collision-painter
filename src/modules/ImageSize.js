const getSource = (src) => {
  if (typeof src === 'string') { return src }
  if (src instanceof ArrayBuffer) { return URL.createObjectURL(new Blob([new Uint8Array(src)])) }
  if (src instanceof Blob) { return URL.createObjectURL(src) }
  throw new Error('Invalid Image Source')
}

const imageSize = (src) => {
  return new Promise((resolve, reject) => {
    const image = new Image()
    const source = getSource(src)

    image.onerror = reject
    image.onload = () => {
      if (src instanceof Blob) { URL.revokeObjectURL(source) }
      resolve({ width: image.width, height: image.height })
    }

    image.src = source
  })
}

export default imageSize
