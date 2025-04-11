import uuid from "../core/uuid.js";

export default class Model {
  id

  constructor() {
    this.id = uuid(8)
  }

  update( patch = {} ) {
    const props = Object.getOwnPropertyNames(this);
    const update = Object.keys(patch)
      .filter( key => props.includes(key) )
      .reduce( (result, key) => {
        result[key] = patch[key];
        return result;
      }, {})

    Object.assign(this, update);
  }
}