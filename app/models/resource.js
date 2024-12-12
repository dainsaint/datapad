import { SessionModel } from "./session.js";

export default function Resource ({
  name = "New Resource",
  tags = []
}){
  const model = SessionModel({type: "Resource"});

  const resource = {
    ...model,
    name,
    tags,

    toURL(append = "") {
      return `/sessions/${resource.session}/resources/${resource.id}` + append;
    }
  }

  return resource; 
}

export const ResourceTag = {
  EXHAUSTED: "exhausted",
  VITAL: "vital",
  TRANSFORMED: "transformed",
  DESTROYED: "destroyed",
  SEIZED: "seized",
};
