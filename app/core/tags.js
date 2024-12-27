export default class Tags extends Set {

  constructor({ value = [] } = {}) {
    super( value )
  }

  toList() {
    return [...this.values()].join();
  }

  toJSON() {
    return {
      _type: "Tags",
      value: Array.from(this)
    }
  }
}