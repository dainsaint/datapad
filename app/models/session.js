import Datastore from "../core/datastore.js";
import Tags from "../core/tags.js";
import Model from "../core/model.js";
import { PhaseStatus } from "./phase.js";
import Ledger from "./ledger.js";

const datastore = Datastore();

export default function Session({
  name = "",
  date = new Date()
}) {
  const type = "Session";
  const model = Model({ type });

  //Properties
  const game = {},
    communities = [],
    phases = [],
    players = [],
    resources = [],
    societies = [],
    tags = new Tags();

  //Helper functions
  function addTo (key) {
    return (model) => {
      model.session = model.id;
      session[key].push(model);
    }
  }

  function getById(key) {
    return (id) => session[key].find( element => element.id === id );
  }

  //Final session object
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

    addCommunity: addTo("communities"),
    addPhase: addTo("phases"),
    addPlayer: addTo("players"),
    addResource: addTo("resources"),
    addSociety: addTo("societies"),

    getCommunityById: getById("communities"),
    getPhaseById: getById("phases"),
    getPlayerById: getById("players"),
    getResourceById: getById("resources"),
    getSocietyById: getById("societies"),

    getActivePhases() {
      return phases.filter((phase) => phase.status !== PhaseStatus.COMPLETE);
    },

    getAllResources() {
      return communities.map((community) => community.resources).flat();
    },

    makeActive() {
      tags.add(SessionTags.ACTIVE);
    },

    isActive() {
      return tags.has( SessionTags.ACTIVE );
    },

    save() {
      const filename = datastore.getModelFilename(session);
      datastore.save(filename, session);
      Ledger.updateSession(session);
    },

    toURL(append = "") {
      return `/sessions/${session.id}` + append;
    },
  };

  return session;
}

//STATIC FUNCTIONS
//Make sure we don't load from file if we don't need to
const loadedSessions = new Map();

Session.load = (id) => {
  if( loadedSessions.has(id) ) {
    return loadedSessions.get(id)
  }

  const filename = datastore.getModelFilename({type: "Session", id});
  const session = datastore.load(filename);
  loadedSessions.set(id, session);
  return session;
}


//Helper Objects
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