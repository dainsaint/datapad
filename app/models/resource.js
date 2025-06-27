import Tags from "#core/tags";
import Model from "#database/model";

export default class Resource extends Model {
  communityId

  name = "New Resource"
  tags = new Tags()

  
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

  destroy() {
    this.tags.add( ResourceTag.DESTROYED );
  }
  

  get isExhausted() {
    return this.tags.has( ResourceTag.EXHAUSTED );
  }

  get isActive() {
    return !this.tags.has( ResourceTag.DESTROYED );
  }

  get community() {
    return this.episode.getCommunityById( this.communityId );
  }


  
  toURL(append = "") {
    return `/resources/${this.episode?.id}/${this.id}` + append;
  }
}


export const ResourceTag = {
  USING: "using",
  EXHAUSTED: "exhausted",
  TRANSFORMED: "transformed",
  DESTROYED: "destroyed",
  SEIZED: "seized",
}; 