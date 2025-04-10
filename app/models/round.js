import Model from "#database/model";
import Phase, { PhaseType } from "#models/phase";

export default class Round extends Model {
  number = 0
  type

  constructor({ number = 0, type = RoundType.GAMEPLAY }) {
    super();
    Object.assign( this, {number, type} );
  }

  start() {
    
  }

  end() {

  }

  initializeAsGameplay() {
    this.type = RoundType.GAMEPLAY;
    episode.addPhase(new Phase({ type: PhaseType.UNIVERSAL,    roundId: this.id, duration: 240 }));
    episode.addPhase(new Phase({ type: PhaseType.SOCIETAL,     roundId: this.id, duration: 600 }));
    episode.addPhase(new Phase({ type: PhaseType.GALACTIC,     roundId: this.id, duration: 600 }));
    episode.addPhase(new Phase({ type: PhaseType.INDIVIDUAL,   roundId: this.id, duration: 495 }));
  }

  initializeAsSetup() {
    this.type = RoundType.GAMEPLAY;
    episode.addPhase(new Phase({ type: PhaseType.SETUP,   roundId: this.id, duration: 1200 }));
  }

  initializeAsBreak() {
    this.type = RoundType.BREAK;
    episode.addPhase(new Phase({ type: PhaseType.BREAK,   roundId: this.id, duration: 1200 }));
  }

  get phases() {
    return this.episode.phases.filter( phase => phase.roundId == this.id );
  }

  get actions() {
    return this.episode.actions.filter( action => action.roundId == this.id );
  }

  toURL(append = "") {
    return `/episodes/${this.episode.id}/rounds/${this.id}` + append;
  }
}


export const RoundType = {
  GAMEPLAY: "Gameplay",
  SETUP: "Setup",
  BREAK: "Break",
}