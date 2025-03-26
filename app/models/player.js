import Model from "#database/model";

export default class Player extends Model {
  name
  pronouns

  toURL(append = "") {
    return `/episodes/${this.episode.id}/phases/${this.id}` + append;
  }
}