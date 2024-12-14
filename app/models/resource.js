import Tags from "../core/tags.js";
import SessionModel from "./session-model.js";

export default class Resource extends SessionModel {
  name = "";
  relationship = "";
  tags = new Tags();

  constructor({ name = "New Resource" }) {
    super();
    this.name = name;
  }

  toURL(append = "") {
    return `/sessions/${this.session}/resources/${this.id}` + append;
  }
}

export const ResourceTag = {
  EXHAUSTED: "exhausted",
  VITAL: "vital",
  TRANSFORMED: "transformed",
  DESTROYED: "destroyed",
  SEIZED: "seized",
}; 
