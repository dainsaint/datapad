export default class Tags extends Set {

  constructor({ value = [] } = {}) {
    super( value )
  }

  toJSON() {
    return {
      _type: "Tags",
      value: Array.from(this)
    }
  }
}