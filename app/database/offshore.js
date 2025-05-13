import "dotenv/config";
import {Octokit} from "octokit";

export default class Offshore {

  options = {
    owner: "dainsaint",
    repo: "datapad-data",
    headers: {
      'X-Github-Api-Version': '2022-11-28'
    }
  }

  enabled = true;

  constructor(){
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

  async getJSONFromPath(path) {
    if(!this.enabled) return;
    try {
      const remote = await this.getRemote(path)
      const file = await fetch( remote.data.download_url )
      const text = await file.text();
      return JSON.parse(text);
    } catch(e) {
      console.logError( e );
    }
  }

  async getRemote(path) {
    if(!this.enabled) return;

    const remote = await this.octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
      ...this.options,
      path: this.getPath(path)
    })

    return remote;
  }

  async saveJSONToPath(path, json) {
    if(!this.enabled) return;

    const putOptions = {
      path: this.getPath(path),
      message: "Updating ${path}",
      committer: {
        name: 'Dain Saint',
        email: "dain@cipherprime.com"
      },
      content: btoa( JSON.stringify(json, null, 2) )
    }


    try {
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

      console.log(`Offshored ${path}`);

    } catch(e) {
      console.error( e );
    }
  }


  async listFiles() {
    if(!this.enabled) return;

    try {
      const repo = await octokit.request('GET /repos/{owner}/{repo}/git/trees/main', {
        ...this.options
      })

      console.log(repo.data.tree);

      return repo.data.tree;
    } catch(e) {
      console.log( e );
    }
  }

}