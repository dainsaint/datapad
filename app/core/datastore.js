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

const Types = { Community, Phase, Player, Resource, Session, Society };

export default function Datastore({ root = "datastore" }) {
  function save(filename, data) {
    const fullPath = path.join(root, filename);
    //ensure path
    try {
      fs.mkdirSync(path.dirname(fullPath), { recursive: true });
    } catch (e) {
      // no prob
    }

    //save file
    try {
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
    const references = new Set();

    return JSON.parse(text, (_, value) => {
      if (moment(value, moment.ISO_8601, true).isValid())
        return new Date(value);

      if (typeof value !== "object") return value;

      if ("type" in value) {
        if (references[value.id]) return references[value.id];

        const Type = Types[value.type];
        if (!Type) return value;

        const reference = Object.assign( Type(value), value );
        references[value.id] = reference;
        return reference;
      }

      return value;
    });
  }

  const debouncedSave = debounce(save, 2000);

  return {
    save(filename, data) {
      debouncedSave(filename, data);
    },
    
    load(filename) {
      const text = load(filename);
      const json = parse(text);
      return json;
    },

    getFilename({id, type}) {
      return `${type.toLowerCase()}/${id}.json`;
    }
  };
}