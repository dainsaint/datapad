export default class Timer{
  
  callback
  frequency
  
  #then
  #interval

  constructor(callback, frequency) {  
    this.callback = callback;
    this.frequency = frequency;
  }

  #tick() {
    const now = Date.now();
    const deltaTime = now - this.#then;
    this.callback( deltaTime );
    this.#then = now;
  } 


  start() {
    this.#then = Date.now();
    this.#interval = setInterval(this.#tick, this.frequency);
  }

  stop() {
    clearInterval(this.#interval);
  }
  
}