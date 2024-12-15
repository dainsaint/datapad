import fs from "fs";

export default function Icon (name) {

  try {
    const text = fs.readFileSync(`./app/static/icons/${name}.svg`).toString();
    return text;
  } catch (e) {
    return `<svg></svg>`
  }

}

export function iconForArchetype(archetype) {
  const lookup = {
    "the mighty": "mighty",
    "the intrepid": "intrepid",
    "the enterprise": "enterprise",
  };
  return lookup[archetype.toLowerCase()] || "spop";
};