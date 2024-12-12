import Tags from "../core/tags.js";
import { SessionModel } from "./session.js";

export default function Player({ 
  name = "", 
  tags = new Tags() 
}) {
  const model = SessionModel({ type: "Player" });
  
  const player = {
    ...model,
    name,
    tags,

    toURL(append = "") {
      return `/sessions/${player.session}/phases/${player.id}` + append;
    },
  };

  return player;
}

export const PlayerTags = {

}