import Episode from "#models/episode";

export async function get(req, res) {
  const { episodeId } = req.params;
  
  const episode = Episode.load(episodeId);

  req.session.facilitator ??= {}  
  req.session.facilitator.societyId ??= episode.societies.at(0)?.id;
  res.redirect(
    `/facilitator/${req.session.facilitator.societyId}`
  );
};