const crypto = await import("crypto");


export function createHexId() {
  return [...crypto.getRandomValues(new Uint8Array(20))]
    .map((m) => ("0" + m.toString(16))
      .slice(-2))
    .join("");
}
