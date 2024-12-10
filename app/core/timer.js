export default class Timer {

  frequency;
  callback;
  
  #lastTime;
  #interval;

  constructor(frequency, callback = (deltaTime) => {}) {
    this.frequency = frequency;
    this.callback = callback;
  }

  #tick() {
    const now = Date.now();
    const deltaTime = now - this.#lastTime;
    this.callback( deltaTime );
    this.#lastTime = now;
  } 

  start() {
    this.#lastTime = Date.now();
    this.#interval = setInterval(this.#tick.bind(this), this.frequency);
  }

  stop() {
    clearInterval(this.#interval);
  }
}