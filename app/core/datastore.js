import fs from "fs";
import path from "node:path";
import moment from "moment";

import { debounce } from "./utils.js";

import Community from "../models/community.js";
import Phase from "../models/phase.js";
import Player from "../models/player.js";
import Resource from "../models/resource.js";
import Session from "../models/session.js";
import Society from "../models/society.js";
import Game from "../models/game.js";

const Types = { Community, Game, Phase, Player, Resource, Session, Society };
const references = new Map();

export default function Datastore({ root = "data", diskWriteDelay = 2000 } = {}) {
  function save(filename, data) {
    const fullPath = path.join(root, filename);
    
    try {
      //ensure subdir exists
      fs.mkdirSync(path.dirname(fullPath), { recursive: true });
    } catch (e) {
      //subdir already exists
    }

    try {
      //save file
      fs.writeFileSync(fullPath, JSON.stringify(data, null, 2));
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  function load(filename) {
    const fullPath = path.join(root, filename);
    const file = fs.readFileSync(fullPath);
    return file.toString();
  }

  function parse(text) {
    return JSON.parse(text, (_, value) => {
      //TODO: Figure out how to rehydrate dates...
      // if (moment(value, moment.ISO_8601, true).isValid())
      //   return new Date(value);

      if (typeof value !== "object") return value;

      if ("type" in value) {
        if (references.has(value.id)) return references.get(value.id);

        const Type = Types[value.type];
        if (!Type) {
          console.log( "Warning: Couldn't hydrate", value.type, "(has it been added to Types in datastore.js?");
          return value;
        }
        
        const reference = Object.assign( Type(value), value );
        references.set(value.id, reference);
        return reference;
      }

      return value;
    });
  }

  const debouncedSave = debounce(save, diskWriteDelay);

  return {
    save(filename, data) {
      debouncedSave(filename, data);
    },

    load(filename) {
      const text = load(filename);
      const json = parse(text);
      return json;
    },

    has(filename) {
      const fullPath = path.join(root, filename);
      return fs.existsSync(fullPath);
    },

    getModelFilename({ id, type }) {
      return `${type.toLowerCase()}/${id}.json`;
    },
  };
}