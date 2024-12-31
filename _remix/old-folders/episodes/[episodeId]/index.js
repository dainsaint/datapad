import Episode from "#models/episode";

export async function get(req, res) {
  const { episodeId } = req.params;
  res.redirect(`/episodes/${episodeId}/gm`)
};


export async function post(req, res) {
  try {
    const episode = new Episode(req.body);
    //todo: validation
    episode.save();

    res.redirect( episode.toURL() );
  } catch (e) {
    res.status(404).send(e.toString());
  }
}
