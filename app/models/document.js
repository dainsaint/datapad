import Model from "#database/model";
import Gootenberg from "gootenberg";
import { toHast } from "@googleworkspace/google-docs-hast";

import credentials from "../../_config/secrets.json" with { type: "json" };

export default class Document extends Model {
  name
  icon = "fa-file"
  googleDocId
  status
  content

  constructor({ name, googleDocId, icon = "fa-file", content = {} }) {
    super();
    this.name = name;
    this.googleDocId = googleDocId;
    this.icon = icon;
    this.content = content
  }

  async refresh() {
    try {
      const goot = new Gootenberg();
      await goot.auth.jwt( credentials.google );
    
      const doc = await goot.docs.get( this.googleDocId );
      this.content = toHast(doc);
      this.status = DocumentStatus.OK;
      this.episode.save();
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
      
      this.episode.save();
    }
  }

  toURL(append = "") {
    return `/documents/${this.episode?.id}/${this.id}` + append;
  }

}


export const DocumentStatus = {
  OK: "ok",
  ERROR: "error"
}