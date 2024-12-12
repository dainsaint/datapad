export default class Tags extends Set {
  toJSON() {
    return Array.from(this);
  }
}