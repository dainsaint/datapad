import Tags from "../core/tags.js";
import { SessionModel } from "./session.js";

export default function Community({ 
  name = "", 
  voice = CommunityVoice.PEOPLE,
  resources = [],
  tags = new Tags()
}) {
  const type = "Community";
  const model = SessionModel({ type });

  const community = {
    ...model,
    name,
    voice,
    resources,
    tags,

    addResource(resource) {
      resources.push(resource);
    },

    toURL(append = "") {
      return `/sessions/${community.session}/communities/${community.id}` + append;
    },

    isEndangered() {
      return resources.length == 0;
    }
  };

  return community;
}

export const CommunityVoice = {
  LEADER: "leader",
  PEOPLE: "people",
};

export const CommunityTag = {
  ENDANGERED: "endangered",
  LOST: "lost",
};