export default function Timer(callback, frequency) {  
  let then, interval;

  function tick() {
    const now = Date.now();
    const deltaTime = now - then;
    callback( deltaTime );
    then = now;
  } 

  return {
    start() {
      then = Date.now();
      interval = setInterval(tick, frequency);
    },

    stop() {
      clearInterval(interval);
    }
  }
}