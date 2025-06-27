import Tags from "#core/tags";
import Model from "#database/model";

export default class Player extends Model {
  name
  pronouns

  tags = new Tags()

  toURL(append = "") {
    return `/players/${this.episode?.id}/${this.id}` + append;
  }
}