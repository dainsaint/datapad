import Datastore from "../core/datastore.js";
import Tags from "../core/tags.js";
import Model from "../core/model.js";
import { PhaseStatus } from "./phase.js";
import { debounce } from "../core/utils.js";

const datastore = Datastore({ root: "datastore" });

export default function Session({
  date = new Date(),
  name = "",
  players = [],
  phases = [],
  societies = [],
  communities = [],
  resources = [],
  tags = new Tags(),
  game = {},
}) {
  const type = "Session";
  const model = Model({ type });
  const { id } = model;
  
  function save() {
    const filename = datastore.getFilename(session);
    datastore.save(filename, session);
  }

  function getById(array, id) {
    return (id) => array.find( element => element.id === id );
  }

  const session = {
    ...model,
    name,
    date,
    tags,
    game,
    players,
    phases,
    societies,
    communities,
    resources,

    save: debounce(save, 2000),

    makeActive() {
      tags.add(SessionTags.ACTIVE);
    },

    addPlayer(player) {
      players.push(player);
      player.session = id;
    },

    addPhase(phase) {
      phases.push(phase);
      phase.session = id;
    },

    addSociety(society) {
      societies.push(society);
      society.session = id;
    },

    addCommunity(community) {
      communities.push(community);
      community.session = id;
    },

    addResource(resource) {
      resources.push(resource);
      resource.session = id;
    },

    getPlayerById: getById(players),
    getPhaseById: getById(phases),
    getResourceById: getById(resources),
    getCommunityById: getById(communities),
    getSocietyById: getById(societies),

    getActivePhases() {
      return phases.filter((phase) => phase.status !== PhaseStatus.COMPLETE);
    },

    getAllResources() {
      return communities.map((community) => community.resources).flat();
    },

    toURL(append = "") {
      return `/sessions/${session.id}` + append;
    },
  };

  return session;
}

//MAKE SURE WE DONT LOAD FROM FILE IF WE DON"T NEED TO
const loadedSessions = new Map();

Session.load = (id) => {
  if( loadedSessions.has(id) ) {
    return loadedSessions.get(id)
  }

  const filename = datastore.getFilename({type: "Session", id});
  const session = datastore.load(filename);
  loadedSessions.set(id, session);
  return session;
}


export function SessionModel({ type, session = "" }) {
  const model = Model({ type });
  return {
    ...model,
    session,
  };
}

export const SessionTags = {
  ACTIVE: "active",
  COMPLETE: "complete",
};
