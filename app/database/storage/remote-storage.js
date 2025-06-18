import "dotenv/config";
import {Octokit} from "octokit";
import Storage from "#database/storage/storage";
import Serializer from "#database/serializer";

function atou(b64) {
  return decodeURIComponent(escape(atob(b64)));
}

function utoa(data) {
  return btoa(unescape(encodeURIComponent(data)));
}

export default class RemoteStorage extends Storage {
  enabled = true;

  options = {
    owner: "dainsaint",
    repo: "datapad-data",
    headers: {
      'X-Github-Api-Version': '2022-11-28'
    }
  }

  constructor({ root = "data", diskWriteDelay = 2000 } = {}) {
    super({ root, diskWriteDelay });

    if( !process.env.DATAPAD_CLIENT ) {
      console.log("You need to set DATAPAD_CLIENT in your environment variables to offshore data!");
      this.enabled = false;
    }

    if( !process.env.GITHUB_TOKEN ) {
      console.log("You need to set GITHUB_TOKEN in your environment variables to offshore data! ");
      this.enabled = false;
    }

    if( !this.enabled ) {
      console.log("Data offshoring is disabled.")
      return;
    }

    this.octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN
    });
  }

  getPath(path) {
    return process.env.DATAPAD_CLIENT + "/" + path;
  }

  async getRemote(path) {
    if(!this.enabled) return;

    const remote = await this.octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
      ...this.options, path
    })

    return remote;
  }

  async _save(filename, data) {
    if(!this.enabled) return;

    const content = Serializer.serialize(data);

    const putOptions = {
      path: this.getPath(filename),
      message: `Updating ${filename}`,
      committer: {
        name: 'Dain Saint',
        email: "dain@cipherprime.com"
      },
      content: utoa( content )
    }


    try {
      const path = this.getPath(filename);
      const remote = await this.getRemote(path);
      putOptions.sha = remote.data.sha;
    } catch(e) {
      // console.log(e);
      // all good, no existing file, lets update
    }

    try {

      const putRequest = await this.octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
        ...this.options,
        ...putOptions
      })

      console.log(`Saved ${filename}`);

    } catch(e) {
      console.error( e );
    }
  }

  async _load(filename) {
    if(!this.enabled) return;

    try {
      const path = this.getPath(filename);
      const remote = await this.getRemote(path);
      const file = await fetch( remote.data.download_url );
      const text = await file.text();
      return text;
    } catch(e) {
      console.error( e );
    }
  }



}
