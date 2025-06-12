export function sanitizeCharacter(character) {
  return {
    name: sanitizeText(character.name) || "Unknown Character",
    birthday: sanitizeText(character.birthday) || "??",
    lovedGifts: Array.isArray(character.lovedGifts)
      ? character.lovedGifts.map(sanitizeText)
      : [],
    image: typeof character.image === "string" ? character.image : "/images/default.png",
  };
}

function sanitizeText(text) {
  if (typeof text !== "string") return "";
  return text.replace(/[<>]/g, ""); // Basic XSS protection
}
