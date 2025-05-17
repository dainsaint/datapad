import fs from "fs";

export default function Icon (name) {

  try {
    const text = fs.readFileSync(`./app/public/icons/${name}.svg`).toString();
    return text;
  } catch (e) {
    return `<svg></svg>`
  }

}

Icon.forArchetype = function (archetype) {
  const lookup = {
    "the aesthetic": "aesthetic",
    "the curious": "curious",
    "the enterprise": "enterprise",
    "the faithful": "faithful",
    "the grounded": "grounded",
    "the intrepid": "intrepid",
    "the mighty": "mighty",
    "the scholars": "scholars",
  };

  const name = lookup[archetype.toLowerCase?.()] || "spop";

  return Icon(name);
};
