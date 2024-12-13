import Model from "../core/model.js";
import Tags from "../core/tags.js";

export default function Game({ 
  name = "", 
  tags = new Tags() 
}) {
  const model = Model({ type: "Game" });
  const sessions = [];
  
  const game = {
    ...model,
    name,
    tags,
    sessions,

    addSession({id, name, date}) {
      sessions.push({id, name, date})
    },

    toURL(append = "") {
      return `/games/${game.id}` + append;
    },
  };

  return game;
}

export const GameTags = {

}