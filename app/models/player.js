import Tags from "#core/tags";
import Model from "#database/model";

export default class Player extends Model {
  name
  pronouns

  tags = new Tags()

  toURL(append = "") {
    return `/episodes/${this.episode.id}/phases/${this.id}` + append;
  }
}