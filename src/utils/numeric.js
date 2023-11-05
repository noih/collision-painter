class Numeric {
  static round(value, precision) {
    const factor = 10 ** precision
    return Math.round(value * factor) / factor
  }
}

export default Numeric
