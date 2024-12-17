import fs from "fs";

export default function Icon (name) {

  try {
    const text = fs.readFileSync(`./app/static/icons/${name}.svg`).toString();
    return text;
  } catch (e) {
    return `<svg></svg>`
  }

}