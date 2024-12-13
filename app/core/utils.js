export function pluralize( number, one, many = "" ) {
  return number == 1 
    ? one 
    : many
      ? many
      : one + 's';
}

export function secondsToTime( seconds ) {
  const minutes = Math.floor( seconds / 60 );
  const remaining = seconds - minutes * 60;
  return `${ minutes.toString().padStart(2, '0') }:${ remaining.toString().padStart(2, '0') }`
}

export function iconForArchetype(archetype) {
  const lookup = {
    "the mighty": "mighty",
    "the intrepid": "intrepid",
    "the enterprise": "enterprise",
  };
  return lookup[archetype.toLowerCase()] || "spop";
};


// I got tired of adding .join("\n") everywhere
export function map(array, ...transformers) {
  return transformers.reduce( (result, transformer) => result.map(transformer), array ).join("\n");
}

export function debounce(func, duration) {
  let timeout;

  return function (...args) {
    const effect = () => {
      timeout = null;
      return func.apply(this, args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(effect, duration);
  };
}

export function rateLimit( callback, wait ) {  
  let lastTime = 0; // Last time the callback was invoked
  let timeout; // Timeout reference for the debounce

  return function (...args) {
    const now = Date.now();
    const timeSinceLastCall = now - lastTime;

    const invokeCallback = () => {
      callback.apply(this, args);
      lastTime = Date.now();
    };

    clearTimeout(timeout);

    if (timeSinceLastCall >= wait) {
      console.log("throttle triggered");
      invokeCallback(); // Throttle behavior
    } else {
      console.log("timeout triggered");
      timeout = setTimeout(invokeCallback, wait); // Debounce behavior
    }
  }
}