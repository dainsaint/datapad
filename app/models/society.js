import { SessionModel } from "./session.js";

export default function Society({ 
  name = "", 
  archetype = "",
  planet = "",
  communities = []
}) {
  const type = "Society";
  const model = SessionModel({ type });

  const society = {
    ...model,
    name,
    archetype,
    planet,
    communities,

    addCommunity(community) {
      communities.push(community);
    },

    getAllResources() {
      return communities.map((community) => community.resources).flat();
    },

    toURL(append = "") {
      return `/sessions/${society.session}/societies/${society.id}` + append;
    }
  };

  return society;
}

export const SocietyArchetype = {
  AESTHETIC: "the aesthetic",
  CURIOUS: "the curious",
  ENTERPRISE: "the enterprise",
  FAITHFUL: "the faithful",
  GROUNDED: "the grounded",
  INTREPID: "the intrepid",
  MIGHTY: "the mighty",
  SCHOLARS: "the scholars",
};