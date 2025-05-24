import Tags from "#core/tags";
import Model from "#database/model";


export default class Community extends Model {
  societyId
  
  player

  name
  voice;
  isEmissary;
  ambassadorTo;
  tags = new Tags()

  constructor(data) {
    super(data);
    this.update(data);
  }

  endanger() {
    this.tags.add( CommunityTag.ENDANGERED )
  }

  unendanger() {
    this.tags.delete( CommunityTag.ENDANGERED );
  }

  startRound( roundNumber ) {
    const hasResources = this.episode.resources.some( resource => resource.communityId == this.id );

    if( hasResources ) {
      this.unendanger();
    } else {
      this.endanger();
    }
  }


  get isEndangered() {
    return this.tags.has( CommunityTag.ENDANGERED );
  }


  get resources() {
    return this.episode.resources.filter( resource => resource.communityId == this.id );
  }

  get society() {
    return this.episode.societies.find( society => society.id == this.societyId );
  }

  get player() {
    return this.episode.players.find( player => player.id == this.playerId );
  }

  get ambassadorSociety() {
    return this.episode.societies.find( society => society.id == this.ambassadorTo );
  }

  toURL(append = "") {
    return `/episodes/${this.episode.id}/communities/${this.id}` + append;
  }
}

export const CommunityVoice = {
  LEADER: "leader",
  PEOPLE: "people",
};

export const CommunityRole = {
  NONE: "none",
  EMISSARY: "emissary",
  AMBASSADOR: "ambassador",
};

export const CommunityTag = {
  ENDANGERED: "endangered",
  LOST: "lost",
  EMISSARY: "emissary",
  AMBASSADOR: "ambassador",
};
