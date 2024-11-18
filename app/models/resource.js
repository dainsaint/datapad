import Model from "../core/model.js";

export default class Resource extends Model {
  name = "New Resource";
  relationship = "";
  isExhausted = false;
  
  community;

  constructor(name) {
    super();
    this.name = name;
  }

}
