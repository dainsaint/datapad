import Episode from "#models/episode";
import Resource from "#models/resource";

export async function post(req, res, next) {
  validate( req.body );

  const { episodeId, communityId } = req.body;

  const episode = Episode.load(episodeId);
  const community = episode.getCommunityById( communityId );
  const resource = new Resource( req.body );
  
  community.addResource(resource);
  episode.addResource(resource);
  episode.save();
  
  return { resource };
};

function validate(body) {
  return true;
}