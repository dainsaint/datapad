import fs from "fs";
import Game from "./models/game.js";
import Session from "./models/session.js";
import Player from "./models/player.js";
import Society from "./models/society.js";

const types = {Game, Session, Player, Society};

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
    const instances = new Set();

    return JSON.parse(json, (key, value) => {
      if (typeof value !== "object") return value;

      if ("_type" in value) {
        if (instances[value._id]) 
          return instances[value._id]; 

        const Instance = types[value._type];
        const instance = Object.assign(new Instance(), value);
        instances[value._id] = instance;
        return instance;
      }

      if (Date.parse(value)) return new Date(value);

      return value;
    });
  }
}