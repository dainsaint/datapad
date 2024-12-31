import Episode from "#models/episode";

export async function get(req, res) {
  const { eid } = req.params;
  res.redirect(`/episodes/${eid}/gm`);
}

export async function post(req, res) {
  validate(req.body);
  const episode = new Episode(req.body);
  //todo: validation
  episode.save();

  return { episode }
}


export function validate(body) {
  return true;
}