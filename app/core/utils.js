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
  return `${ minutes.toString().padStart(2, '0') }:${ remaining.toString().padStart(2, '0') } `
}