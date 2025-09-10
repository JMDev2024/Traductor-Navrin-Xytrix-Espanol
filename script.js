// ================================
// 🌿⚡ Traductor Español ↔ Návrin ↔ Xytrix
// ================================

// ----------- Mapas fonéticos -----------

// Fonético Návrin (para pronunciación en caracteres ES)
const navrinPhonetic = {
  a: "a", b: "ba", c: "ka", d: "da", e: "e", f: "fa", g: "ga",
  h: "ha", i: "i", j: "ya", k: "ka", l: "la", m: "ma", n: "na",
  ñ: "ña", o: "o", p: "pa", q: "ka", r: "ra", s: "sa", t: "ta",
  u: "u", v: "va", w: "wa", x: "xa", y: "ya", z: "za"
};

// Símbolos Návrin (rúnicos)
const navrinSymbols = {
  a: "⌠", b: "ᚱ", c: "Ϟ", d: "⍟", e: "∴", f: "⌧", g: "ϗ",
  h: "ᛦ", i: "◊", j: "ʓ", k: "Ϟ", l: "∆", m: "Ω", n: "λ",
  ñ: "Ӝ", o: "⊙", p: "Φ", q: "ψ", r: "⊗", s: "§", t: "†",
  u: "∪", v: "√", w: "ω", x: "☒", y: "¥", z: "ζ"
};

// Fonético Xytrix (pronunciación)
const xytrixPhonetic = {
  a: "ax", b: "b", c: "k", d: "dex", e: "ei", f: "f", g: "gx",
  h: "h", i: "1", j: "jx", k: "k", l: "l", m: "mek", n: "nek",
  ñ: "ñx", o: "0", p: "p", q: "kx", r: "rax", s: "sys", t: "tek",
  u: "ux", v: "v", w: "w", x: "x", y: "yx", z: "zx"
};

// Símbolos digitales Xytrix
const xytrixSymbols = {
  a: "A1", b: "B0", c: "C7", d: "D9", e: "E3", f: "F4", g: "G6",
  h: "H#", i: "1", j: "J5", k: "K=", l: "L", m: "M=", n: "N-",
  ñ: "Ñ%", o: "0", p: "P+", q: "Q?", r: "R2", s: "S$", t: "T%",
  u: "U^", v: "V*", w: "W~", x: "X/", y: "Y=", z: "Z="
};

// ----------- Funciones de traducción -----------

function toNavrin(text) {
  return {
    phonetic: text.toLowerCase().split("").map(ch => navrinPhonetic[ch] || ch).join(""),
    symbols: text.toLowerCase().split("").map(ch => navrinSymbols[ch] || ch).join(" ")
  };
}

function toXytrix(text) {
  return {
    phonetic: text.toLowerCase().split("").map(ch => xytrixPhonetic[ch] || ch).join("-"),
    symbols: text.toLowerCase().split("").map(ch => xytrixSymbols[ch] || ch).join("|")
  };
}

function translate(text, from, to) {
  if (from === to) return { phonetic: text, symbols: text };

  // Paso 1: convertir todo a español
  let spanish = text;
  // (Por simplicidad aún no implementamos reverso fonético → ES,
  // pero lo puedes ampliar después)

  // Paso 2: español → destino
  if (to === "navrin") return toNavrin(spanish);
  if (to === "xytrix") return toXytrix(spanish);

  return { phonetic: spanish, symbols: spanish };
}

// ----------- UI -----------

document.getElementById("translateBtn").addEventListener("click", () => {
  const input = document.getElementById("inputText").value;
  const from = document.getElementById("fromLang").value;
  const to = document.getElementById("toLang").value;
  const result = translate(input, from, to);

  document.getElementById("outputSymbols").value = result.symbols;
  document.getElementById("outputPhonetic").value = result.phonetic;
});

// Intercambiar idiomas
document.getElementById("swapBtn").addEventListener("click", () => {
  const fromSel = document.getElementById("fromLang");
  const toSel = document.getElementById("toLang");
  const temp = fromSel.value;
  fromSel.value = toSel.value;
  toSel.value = temp;
});

// Copiar pronunciación
document.getElementById("copyBtn").addEventListener("click", () => {
  const output = document.getElementById("outputSymbols");
  output.select();
  document.execCommand("copy");
  alert("Simbologia copiada al portapapeles");
});
