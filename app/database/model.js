import Tags from "#core/tags";
import uuid from "#core/uuid";

export default class Model { 
  id
  tags = new Tags()
  
  #episode

  constructor(data) {
    this.id = uuid(5);
    if(data)
      this.update(data);
  }

  setEpisode( episode ) {
    this.#episode = episode;
  }

  get episode() {
    return this.#episode;
  }

  update( patch ) {
    const props = Object.getOwnPropertyNames(this);
    const update = Object.keys(patch)
      .filter( key => props.includes(key) )
      .reduce( (result, key) => {
        result[key] = patch[key];
        return result;
      }, {})

    Object.assign( this, update );
  }
}