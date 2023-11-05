class IS {
  static exist(v) {
    return v !== undefined && v !== null
  }

  static nil(v) {
    return v === undefined || v === null
  }

  /**
   * ! Note: null / undefined => false
   */
  static empty(v) {
    if (IS.string(v) || IS.array(v)) {
      return v.length === 0
    }
    return !!v && Object.getOwnPropertyNames(v).length === 0 && Object.getOwnPropertySymbols(v).length === 0
  }

  static numeric(v) {
    return /^[+-]?\d+(\.\d+)?$/.test(`${v}`)
  }

  static int(v) {
    return /^[+-]?\d+$/.test(`${v}`)
  }

  static truely(v) {
    return v === true || /^t(rue)?$/i.test(`${v}`) || `${v}` === '1'
  }

  static falsy(v) {
    return v === false || /^f(alse)?$/i.test(`${v}`) || `${v}` === '0'
  }

  static string(v) {
    return typeof v === 'string' || v instanceof String
  }

  static bool(v) {
    return v === true || v === false || v instanceof Boolean
  }

  static array(v) {
    return Array.isArray ? Array.isArray(v) : Object.prototype.toString.call(v) === '[object Array]'
  }

  static date(v) {
    return v && Object.prototype.toString.call(v) === '[object Date]' && !Number.isNaN(v)
  }

  static func(v) {
    return typeof v === 'function'
  }

  static promise(v) {
    return v && Object.prototype.toString.call(v) === '[object Promise]'
  }

  static primitive(v) {
    return (typeof v !== 'object' && typeof v !== 'function') || v === null
  }
}

export default IS
