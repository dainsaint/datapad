import uuid from "./uuid.js";

export default function Model({ id = uuid(8), type }) {
  const model = { 
    id, 
    type,

    update( patch ) {
      Object.assign(model, patch);
    }
  };

  return model;
}