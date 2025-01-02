import Episode from "#models/episode";
import Ledger from "#models/ledger";

export async function get(req, res, next) {
  const { id } = req.params;

  const episode = Ledger.getEpisodeByResourceId(id);
  const resource = episode.getResourceById(id);

  return { resource };
};

export async function patch (req, res, next) {
  validate( req.body );

  const { id } = req.params;
  const { communityId } = req.body;

  const episode = Ledger.getEpisodeByResourceId(id);
  const resource = episode.getResourceById(id);

  const prevCommunity = episode.communities.find(community => community.getResourceById(id));
  const nextCommunity = episode.getCommunityById(communityId);

  if( prevCommunity != nextCommunity ) {
    prevCommunity.removeResource( resource );
    nextCommunity.addResource( resource );
  }

  resource.update(req.body);
  episode.save();

  return { resource }
};


function validate(body) {
  return true;
}