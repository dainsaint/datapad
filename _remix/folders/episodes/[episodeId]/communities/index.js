import Community from "#models/community";
import Episode from "#models/episode";

export async function get(req) {
  const { episodeId } = req.params;
  const episode = Episode.load(episodeId);
  return { episode }
};

export async function post(req) {
  const { episodeId } = req.params;
  const { societyId } = req.body;

  const episode = Episode.load(episodeId);
  const society = episode.getSocietyById(societyId);
  const community = new Community(req.body);

  society.addCommunity(community);
  episode.addCommunity(community);
  episode.save();
  
  return { community };

  const currentUrl = req.get("hx-current-url");
  if (currentUrl) res.setHeader("HX-Location", currentUrl);
  res.sendStatus(201);

  broadcast("resources");
};
