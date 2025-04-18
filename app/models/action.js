import Tags from "#core/tags";
import { oxfordize } from "#core/utils";
import Model from "#database/model";

export default class Action extends Model {
  societyId
  resourceIds = []
  round
  text= ""
  tags = new Tags()


  constructor(data) {
    super(data);
    this.update(data);
  }

  setResources( resources ) {
    this.resourceIds = resources
      .filter( resource => !resource.isExhausted )
      .map( resource => resource.id );
  }

  removeResources( resources ) {
    for( const resource of resources ) {
      const index = this.resourceIds.indexOf(resource.id);
      if( index >= 0 )
        this.resourceIds.splice(index, 1);
    }
  }

  commit() {
    this.tags.add( ActionTags.COMMITTED );
  }

  toDeclaration() {
    let result = "";
    const resources = this.resources;

    if( resources.length > 0 )
      result += `They use ${resources.at(0).name}.`
    
    if( resources.length > 1 )
      result += ` They aid with ${ oxfordize(resources.slice(1).map( x => x.name ))}.`

    else if ( resources.length == 0 )
      result = "Action not yet decided."

    return result;
  }

  get primaryResource () {
    let resourceId = this.resourceIds.at(0);
    return this.episode.getResourceById(resourceId);
  }

  get resources() {
    return this.resourceIds.map(this.episode.getResourceById);
  }

  get society() {
    return this.episode.getSocietyById( this.societyId );
  }

  toURL(append = "") {
    return `/episodes/${this.episode.id}/actions/${this.id}` + append;
  }
}


export const ActionTags = {
  COMMITTED: "committed",

  SUCCESS: "success",
  MIXED_SUCCESS: "mixed_success",
  CRITICAL_SUCCESS: "critical_success",
  FAILURE: "failure",
  MIXED_FAILURE: "mixed_failure",
  CRITICAL_FAILURE: "critical_failure",
  ADVANTAGE: "advantage",
  DISADVANTAGE: "disadvantage"
}