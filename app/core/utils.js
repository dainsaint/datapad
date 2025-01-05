export function html(strings, ...values) {
  return strings.reduce( (result, string, i) => {
    const value = values[i];
    
    result += string;

    if( Array.isArray(value) ) {
      result += value.join("");
    } else if (typeof value === "string") {
      result += value;
    } else if (typeof value === "number") {
      result += String(value);
    } else if (typeof value === "object") {
      result += Object.keys(value).map( key => {
        const val = value[key];
        if (val === true ) {
          return key;
        } else if( val ) {
          return `${key}="${val}"`
        } else {
          return "";
        }
      }).join(' ')
    }
      

    return result;
  }, "");
}


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
      invokeCallback(); // Throttle behavior
    } else {
      timeout = setTimeout(invokeCallback, wait); // Debounce behavior
    }
  }
}