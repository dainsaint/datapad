import { Duration } from "luxon";

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

export function css(strings, ...values) {
  return strings.join('');
}


export function pluralize( number, one, many = "" ) {
  return number == 1 
    ? one 
    : many
      ? many
      : one + 's';
}

export function oxfordize( words ) {
  const strings = words.map((x) => x.toString());
  
  if (strings.length > 1)
    strings[strings.length - 1] = "and " + strings[strings.length - 1];

  return strings.length == 2 ? strings.join(" ") : strings.join(", ");
}

export function secondsToTime( seconds ) {
  const duration = Duration.fromObject({ seconds });
  return duration.toFormat('mm:ss');
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

export function from(number) {
  return {
    repeat: (count) => new Array(count).fill(number),
    to: (to) => {
      const result = [];
      const sign = Math.sign(to - number) || 1;
      for( let i = number; i <= to; i += sign )
        result.push(i);
      return result
    }
  }
}


export function filterUnique( current, i, array ) {
  return array.indexOf(current) === i
}