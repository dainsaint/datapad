import { DateTime, Interval } from "luxon";

const Types = new Map();
const instances = new Map();

function replacer(_, value) {
  const typeName = [...Types.entries()].find( ([_, Type]) => value instanceof Type )?.[0];

  if( !typeName ) {
    return value;
  } else  {
    return {
      _type: typeName,
      ...value
    }
  }
}

function reviver(key, value) {

  if( value === null )
    return undefined;

  if( typeof value === "string" && DateTime.fromISO( value ).isValid ) {
    return DateTime.fromISO( value )
  }

  if( value?.isLuxonInterval ) {
    return Interval.fromDateTimes( DateTime.fromISO(value.s), DateTime.fromISO(value.e) );
  }

  if (!Object.hasOwn(value, "_type")) {
    return value;
  }

  if (Object.hasOwn(value, "id") && instances.has(value.id)) {
    return instances.get(value.id);
  }

  const Type = Types.get(value._type);

  if (!Type) {
    console.log( "Warning: Couldn't hydrate", value._type, "(not registered with serializer)");
    return value;
  }

  const instance = Object.assign( new Type(value), value );
  instances.set(value.id, instance);
  return instance;
}

const Serializer = {
  register(name, type) {
    Types.set(name, type);
  },

  serialize(object) {
    return JSON.stringify(object, replacer, 2);
  },

  deserialize(json) {
    return JSON.parse(json, reviver);
  }
}

export default Serializer