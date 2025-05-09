// Obfuscation logic
document.getElementById("encryptBtn").onclick = () => {
  const type = document.getElementById("type").value;
  const input = document.getElementById("input").value;
  const output = document.getElementById("output");

  if (!input.trim()) return (output.value = "Paste some code first.");

  if (type === "js") {
    import("https://cdn.jsdelivr.net/npm/javascript-obfuscator/dist/index.browser.js")
      .then(({ default: obfuscator }) => {
        const obfuscated = obfuscator.obfuscate(input, {
          compact: true,
          controlFlowFlattening: true
        });
        output.value = obfuscated.getObfuscatedCode();
      });
  }

  else if (type === "html") {
    const encode = str => str.split("").map(c => `&#${c.charCodeAt(0)};`).join("");
    output.value = `<script>document.write('${encode(input)}');</script>`;
  }

  else if (type === "css") {
    const clean = input.replace(/\/\*[\s\S]*?\*\//g, '') // remove comments
      .replace(/\s*([\{\}:;,\n])\s*/g, '$1') // remove spaces
      .replace(/\s+/g, ' ') // extra space
      .trim();

    // rename class names to xRandom
    const classes = [...new Set(clean.match(/\.[a-zA-Z0-9_-]+/g))];
    const map = {};
    classes.forEach(c => map[c] = '.x' + Math.random().toString(36).substring(2, 7));
    let obfuscated = clean;
    for (const c in map) obfuscated = obfuscated.replaceAll(c, map[c]);

    output.value = obfuscated;
  }
};

// Copy to clipboard
document.getElementById("copyBtn").onclick = () => {
  const output = document.getElementById("output");
  navigator.clipboard.writeText(output.value)
    .then(() => alert("Copied to clipboard!"))
    .catch(() => alert("Failed to copy."));
};