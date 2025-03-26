import Model from "#database/model";

export default class Resource extends Model {
  communityId

  name = "New Resource"

  
  constructor(data) {
    super(data);
    this.update(data);
  }

  exhaust() {
    this.tags.add( ResourceTag.EXHAUSTED );
  }

  unexhaust() {
    this.tags.delete( ResourceTag.EXHAUSTED );
  }
  

  get isExhausted() {
    return this.tags.has( ResourceTag.EXHAUSTED );
  }

  get isVital() {
    return this.tags.has( ResourceTag.VITAL );
  }

  get community() {
    return this.episode.communities.find( community => community.id == this.communityId );
  }


  
  toURL(append = "") {
    return `/episodes/${this.episode.id}/resources/${this.id}` + append;
  }
}


export const ResourceTag = {
  USING: "using",
  EXHAUSTED: "exhausted",
  VITAL: "vital",
  TRANSFORMED: "transformed",
  DESTROYED: "destroyed",
  SEIZED: "seized",
}; 