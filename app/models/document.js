import Database from "#database/database"
import Model from "#database/model";
import Gootenberg from "gootenberg";
import { toHast } from "@googleworkspace/google-docs-hast";

import credentials from "../../_config/secrets.json" with { type: "json" };

const loadedDocuments = new Map();

const database = new Database({useOffshore: false});

export default class Document extends Model {
  name
  icon = "fa-file"
  googleDocId
  content
  status

  constructor({ name, googleDocId, icon = "fa-file" }) {
    super();
    this.name = name;
    this.googleDocId = googleDocId;
    this.icon = icon;
  }

  async refresh() {
    try {
      const goot = new Gootenberg();
      await goot.auth.jwt( credentials.google );
    
      const doc = await goot.docs.get( this.googleDocId );
      const tree = toHast(doc);
      
      this.content = tree;
      this.status = DocumentStatus.OK;
      this.save();
    } catch(e) {
      this.status = DocumentStatus.ERROR;
      this.content = {
        "type": "root",
        "children": [
          {
            "type": "element",
            "tagName": "p",
            "children": [
              {
                "type": "text",
                "value": "ERROR: " + e.toString()
              }
            ]
          }
        ]
      }
      this.save();
    }
  }

  save() {
    const filename = database.getFilename({ type: "documents", id: this.id});
    database.save(filename, this);
  }

  toURL(append = "") {
    return `/documents/${this.id}` + append;
  }

  static load(id) {
    if (loadedDocuments.has(id)) {
      return loadedDocuments.get(id);
    }

    const filename = database.getFilename({ type: "documents", id });
    const document = database.load(filename);

    loadedDocuments.set(id, document);
    return document;
  };

}


export const DocumentStatus = {
  OK: "ok",
  ERROR: "error"
}