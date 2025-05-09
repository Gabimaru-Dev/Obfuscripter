const input = document.getElementById("input");
const output = document.getElementById("output");
const type = document.getElementById("type");
const encryptBtn = document.getElementById("encryptBtn");

encryptBtn.addEventListener("click", () => {
  const code = input.value.trim();
  if (!code) return alert("Paste some code first.");

  let encrypted = "";

  if (type.value === "js") {
    const obfuscated = JavaScriptObfuscator.obfuscate(code, {
      compact: true,
      controlFlowFlattening: true,
      deadCodeInjection: true,
      stringArray: true,
      stringArrayEncoding: ["base64"],
      transformObjectKeys: true,
      rotateStringArray: true
    });
    encrypted = obfuscated.getObfuscatedCode();
  } else if (type.value === "css") {
    encrypted = code.replace(/\s+/g, ' ').replace(/\/\*[\s\S]*?\*\//g, '');
  } else if (type.value === "html") {
    encrypted = code
      .replace(/\s+/g, ' ')
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  output.value = encrypted;
});

function copyCode() {
  const encrypted = output.value;
  if (!encrypted) return alert("Nothing to copy.");
  navigator.clipboard.writeText(encrypted).then(() => {
    alert("Encrypted code copied!");
  });
}