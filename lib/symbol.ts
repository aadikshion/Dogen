const LETTERS = "ABCDEFGHJKLMNPQRSTUVWXYZ";

function randomLetters(count: number): string {
  let out = "";
  for (let i = 0; i < count; i++) {
    out += LETTERS[Math.floor(Math.random() * LETTERS.length)];
  }
  return out;
}

export function generateTokenSymbol(prefix: string): string {
  return (prefix + randomLetters(3)).toUpperCase().slice(0, 5);
}
