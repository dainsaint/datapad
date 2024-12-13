import Datastore from "../core/datastore.js";

const datastore = Datastore();
const filename = "ledger.json";

/*
- [ ] Index players?
- [ ] Cleanup references to sessions that no longer exist (on start?)
*/

const Ledger = function() {
  const file = {};

  try {
    const fromDisk = datastore.load(filename);
    Object.assign(file, fromDisk);
  } catch(e) {
    //file doesnt exist, do nothing
    //(we'll create automatically on next save)
  }

  const {
    games = [],
    sessions = [],
    players = [],
    active = []
  } = file;

  function save() {
    datastore.save(filename, ledger);
  }

  function getSessionRecord(session) {
    console.log( session );
    return {
      id: session.id,
      name: session.name,
      date: session.date
    }
  }

  function getGameRecord(session) {
    return session.game
  }

  function updateRecord( record, records ) {
    if(!record)
      return;

    const oldRecord = records.find( r => r.id === record.id );
    if( oldRecord ) {
      Object.assign(oldRecord, record);
    } else {
      records.push(record)
    }
  }

  //TODO: Make sure each game has a list of sessions
  function updateSession(session) {
    updateRecord(getSessionRecord(session), sessions);
    updateRecord(getGameRecord(session), games);

    session.players.forEach( player => {
      updateRecord(player, players);
    })

    if( session.isActive() && !active.includes(session) ) {
      active.push( session )
    } else if( !session.isActive() && active.includes(session) ) {
      active.splice( active.indexOf(session), 1 );
    }

    save();
  }

  function getById(key) {
    return (id) => ledger[key].find((element) => element.id === id);
  }

  const ledger = {
    games,
    sessions,
    players,
    active,

    getGameById: getById("games"),
    getPlayerById: getById("players"),

    getActiveSession() {
      //TODO: Fix this doofer
      return sessions.at(0);
    },

    updateSession,
  };

  return ledger;
}();

export default Ledger;