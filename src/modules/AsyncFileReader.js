class AsyncFileReader {
  constructor() {
    this.reader = new FileReader()
  }

  _readAs = (funcName) => (...args) => {
    return new Promise((resolve, reject) => {
      const onLoad = () => resolve(this.reader.result)
      const onError = () => reject(this.reader.error)
      const release = () => {
        this.reader.removeEventListener('load', onLoad)
        this.reader.removeEventListener('error', onError)
        this.reader.removeEventListener('loadend', release)
        this.reader.removeEventListener('abort', release)
      }

      this.reader.addEventListener('load', onLoad)
      this.reader.addEventListener('error', onError)
      this.reader.addEventListener('loadend', release)
      this.reader.addEventListener('abort', release)

      this.reader[funcName](...args)
    })
  }

  readAsArrayBuffer = this._readAs('readAsArrayBuffer')
  readAsBinaryString = this._readAs('readAsBinaryString')
  readAsDataURL = this._readAs('readAsDataURL')
  readAsText = this._readAs('readAsText')
}

// singleton
const reader = new AsyncFileReader()
export default reader
