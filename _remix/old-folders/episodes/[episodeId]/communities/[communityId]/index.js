import Episode from "#models/episode";

export async function get(req) {
  const { episodeId, communityId } = req.params;

  const episode = Episode.load(episodeId);
  const community = episode.getCommunityById(communityId);

  return { community };
}

export async function patch(req, res) {
  validate(req.body);

  const { communityId, episodeId } = req.params;
  const { societyId, resourceIds = [] } = req.body;

  const episode = Episode.load(episodeId);
  const community = episode.getCommunityById(communityId);

  //update resources
  const resources = resourceIds.map(episode.getResourceById);
  community.resources = resources;

  //update societies (encapsulate!)
  const prevSociety = episode.societies.find((society) =>
    society.getCommunityById(communityId)
  );
  const nextSociety = episode.getSocietyById(societyId);

  if (prevSociety && nextSociety && prevSociety != nextSociety) {
    prevSociety.removeCommunity(community);
    nextSociety.addCommunity(community);
  }

  episode.save();

  return { community };

  //this shit should be taken care of somewhere else
  const currentUrl = req.get("hx-current-url");
  if (currentUrl) res.setHeader("HX-Location", currentUrl);
  res.sendStatus(200);
  broadcast("resources");
}

function validate(body) {
  return true;
}