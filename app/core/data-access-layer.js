import Community from "../models/community.js";
import Game from "../models/game.js";
import Player from "../models/player.js";
import Resource from "../models/resource.js";
import Session from "../models/session.js";
import Society from "../models/society.js";
import Database from "./database.js";

const db = Database.open("data.json");

//////////////////////////////////////////////////////
// GAMES
//////////////////////////////////////////////////////

export function createGame(params) {
  const game = new Game(params);

  db.update( data => {
    data.games ??= [];
    data.games.push( game );
  })  

  return game;
}

export function getGameById(id) {
  return db.data.games?.find( game => game._id === id);
}

export function getAllGames() {
  return db.data.games || [];
}

//////////////////////////////////////////////////////
// SESSIONS
//////////////////////////////////////////////////////

export function createSession(params) {
  const session = new Session(params);

  db.update((data) => {
    data.sessions ??= [];
    data.sessions.push(session);
  });

  return session;
}

export function getSessionById(id) {
  return db.data.sessions?.find((session) => session._id === id);
}

export function getAllSessions() {
  return db.data.sessions || [];
}


export function addSessionToGame(session, game) {
  db.update( _ => {
    game.sessions.push(session.toReference("date"));
    session.game = game.toReference("name");
  })
}

export function makeActiveSession(session) {
  db.update( data => {
    data.active ??= {}
    data.active.session = session;
  })
}

export function getActiveSession() {
  return db.data.active?.session;
}

//////////////////////////////////////////////////////
// SOCIETIES
//////////////////////////////////////////////////////

export function createSociety(params) {
  const society = new Society(params);

  db.update((data) => {
    data.societies ??= [];
    data.societies.push(society);
  });

  return society;
}

export function updateSociety(society, patch) {
  db.update((_) => {
    Object.assign(society, patch);
  });

  return true;
}

export function getSocietyById(id) {
  return db.data.societies?.find((society) => society._id === id);
}

export function getAllSocieties() {
  return db.data.societies || [];
}


export function deleteSociety(society) {
  const {_id} = society;
  db.update( (data) => {
    data.societies = data.societies.filter( society => society._id != _id );
    //TODO: Clean up references other objects have to this society;
  })
}

export function addSocietyToSession(society, session) {
  db.update( _ => {
    session.societies.push(society);
  });
}

//////////////////////////////////////////////////////
// COMMUNITIES
//////////////////////////////////////////////////////

export function createCommunity(params) {
  const community = new Community(params);

  db.update((data) => {
    data.communities ??= [];
    data.communities.push(community);
  });

  return community;
}

export function getCommunityById(id) {
  return db.data.communities?.find( community => community._id === id );
}

export function getAllCommunities() {
  return db.data.communities || [];
}

export function updateCommunity(community, patch) {  
  db.update( _ => {
    Object.assign(community, patch);
  })

  return true;
}

export function addCommunityToSociety(community, society) {
  db.update( _ => {
    society.communities.push( community );
  })
}

//////////////////////////////////////////////////////
// RESOURCES
//////////////////////////////////////////////////////

export function createResource(params) {
  const resource = new Resource(params);

  db.update((data) => {
    data.resources ??= [];
    data.resources.push(resource);
  });

  return resource;
}

export function getResourceById(id) {
  return db.data.resources?.find( resource => resource._id === id );
}

export function getAllResources() {
  return db.data.resources || [];
}

export function addResourceToCommunity(resource, community) {
  db.update((_) => {
    //Did this belong to a different community? Take it from them.
    community.resources.push( resource );
  });
}

//////////////////////////////////////////////////////
// PLAYERS
//////////////////////////////////////////////////////

export function createPlayer(params) {
  const player = new Player(params);

  db.update((data) => {
    data.players ??= [];
    data.players.push(player);
  });

  return player;
}

export function getAllPlayers() {
  return db.data.players || [];
}

export function addPlayerToSession(player, session) {
  db.update((_) => {
    session.players.push( player.toReference("name") );
  });
}