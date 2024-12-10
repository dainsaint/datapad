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