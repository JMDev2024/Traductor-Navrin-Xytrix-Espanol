// ================================
// 🌿⚡ Traductor Español ↔ Návrin ↔ Xytrix
// ================================

// ----------- Tablas de conversión -----------

// Návrin: mapa letra -> símbolo rúnico
const navrinMap = {
  a: "⌠", b: "ᚱ", c: "Ϟ", d: "⍟", e: "∴", f: "⌧", g: "ϗ",
  h: "ᛦ", i: "◊", j: "ʓ", k: "Ϟ", l: "∆", m: "Ω", n: "λ",
  ñ: "Ӝ", o: "⊙", p: "Φ", q: "ψ", r: "⊗", s: "§", t: "†",
  u: "∪", v: "√", w: "ω", x: "☒", y: "¥", z: "ζ"
};
const navrinReverse = Object.fromEntries(
  Object.entries(navrinMap).map(([k,v]) => [v,k])
);

// Xytrix: mapa letra -> símbolo digital
const xytrixMap = {
  a: "A1", b: "B0", c: "C7", d: "D9", e: "E3", f: "F4", g: "G6",
  h: "H#", i: "1", j: "J5", k: "K=", l: "L", m: "M=", n: "N-",
  ñ: "Ñ%", o: "0", p: "P+", q: "Q?", r: "R2", s: "S$", t: "T%",
  u: "U^", v: "V*", w: "W~", x: "X/", y: "Y=", z: "Z="
};
const xytrixReverse = Object.fromEntries(
  Object.entries(xytrixMap).map(([k,v]) => [v.toLowerCase(),k])
);

// ----------- Funciones de traducción -----------

function toNavrin(text) {
  return text
    .toLowerCase()
    .split("")
    .map(ch => navrinMap[ch] || ch)
    .join(" ");
}

function fromNavrin(text) {
  return text
    .split(/\s+/)
    .map(sym => navrinReverse[sym] || sym)
    .join("");
}

function toXytrix(text) {
  return text
    .toLowerCase()
    .split("")
    .map(ch => xytrixMap[ch] || ch)
    .join("|");
}

function fromXytrix(text) {
  return text
    .split(/[|\s]+/)
    .map(sym => xytrixReverse[sym.toLowerCase()] || sym)
    .join("");
}

// Traducción universal
function translate(text, from, to) {
  if (from === to) return text;

  // Convertir cualquier idioma a español primero
  let spanish = text;
  if (from === "navrin") spanish = fromNavrin(text);
  else if (from === "xytrix") spanish = fromXytrix(text);

  // Luego convertir de español al destino
  if (to === "navrin") return toNavrin(spanish);
  if (to === "xytrix") return toXytrix(spanish);
  return spanish;
}

// ----------- UI -----------

document.getElementById("translateBtn").addEventListener("click", () => {
  const input = document.getElementById("inputText").value;
  const from = document.getElementById("fromLang").value;
  const to = document.getElementById("toLang").value;
  const result = translate(input, from, to);
  document.getElementById("outputText").value = result;
});

// Intercambiar idiomas
document.getElementById("swapBtn").addEventListener("click", () => {
  const fromSel = document.getElementById("fromLang");
  const toSel = document.getElementById("toLang");
  const temp = fromSel.value;
  fromSel.value = toSel.value;
  toSel.value = temp;
});

// Copiar resultado
document.getElementById("copyBtn").addEventListener("click", () => {
  const output = document.getElementById("outputText");
  output.select();
  document.execCommand("copy");
  alert("Texto copiado al portapapeles");
});

// ----------- Voz y Audio -----------

// Configuración de voces (usando SpeechSynthesis API)
function speakText(text, voiceType="human") {
  const msg = new SpeechSynthesisUtterance(text);

  if (voiceType === "mystic") {
    msg.pitch = 0.6; msg.rate = 0.9; msg.voice = speechSynthesis.getVoices()[0];
  } else if (voiceType === "tech") {
    msg.pitch = 1.5; msg.rate = 1.2; msg.voice = speechSynthesis.getVoices()[1];
  } else {
    msg.pitch = 1; msg.rate = 1; msg.voice = speechSynthesis.getVoices()[2];
  }

  speechSynthesis.speak(msg);
}

document.getElementById("speakBtn").addEventListener("click", () => {
  const text = document.getElementById("outputText").value;
  speakText(text, "mystic"); // por defecto místico
});

// Descargar audio (usando la misma API en un blob temporal)
document.getElementById("downloadBtn").addEventListener("click", () => {
  const text = document.getElementById("outputText").value;
  // Nota: SpeechSynthesis no soporta descargar directo
  // Aquí podrías integrar meSpeak.js o una librería TTS offline
  alert("⚠ Descargar audio requiere meSpeak.js o librería TTS adicional.");
});
