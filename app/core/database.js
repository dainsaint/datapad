import fs from "fs";
import moment from "moment";

import Community from "../models/community.js";
import Game from "../models/game.js";
import Phase from "../models/phase.js";
import Player from "../models/player.js";
import Resource from "../models/resource.js";
import Round from "../models/round.js";
import Session from "../models/session.js";
import Society from "../models/society.js";

const types = {Game, Session, Player, Society, Resource, Community, Round, Phase};

export default class Database {
  static instance;

  data = {
    games: []
  };

  constructor() {
    this.read();
  }

  read() {
    try {
      const text = fs.readFileSync("./data/data.json");
      this.data = Database.fromJSON( text.toString() );
    } catch(e) {
      if( e.code === "ENOENT") {
        this.write();
        this.read();
      } else {
        console.error(`Unhandled error: ${e}`);
      }
    }
  }

  write() {
    try {
      fs.writeFileSync("./data/data.json", JSON.stringify(this.data, null, 2));
    } catch(e) {
      if( e.code === "ENOENT") {
        fs.mkdirSync("./data");
        this.write();
      } else {
        console.error(`Unhandled error: ${e}`);
      }
    } 
  }

  update( callback ) {
    callback(this.data);
    this.write();
  }

  static get Instance() {
    if(!Database.instance)
      Database.instance = new Database();

    return Database.instance;
  }

  static fromJSON(json) {
    const references = new Set();

    return JSON.parse(json, (key, value) => {

      if ( moment(value, moment.ISO_8601, true).isValid() ) return new Date(value);

      if (typeof value !== "object") return value;

      if ("_type" in value) {
        if (references[value._id]) 
        return references[value._id]; 

        const Type = types[value._type];
        if( !Type )
          return value;

        const reference = Object.assign(new Type(), value);
        references[value._id] = reference;
        return reference;
      }


      return value;
    });
  }
}