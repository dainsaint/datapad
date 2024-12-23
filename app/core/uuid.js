import crypto from "node:crypto";
const codex =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-_";

export default function uuid(length) {
  return new Array(length)
    .fill(0)
    .map((_, i) => codex[crypto.randomInt(i == 0 ? 52 : 64)])
    .join("");
} 