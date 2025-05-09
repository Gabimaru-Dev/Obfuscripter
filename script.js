const input = document.getElementById("input");
const output = document.getElementById("output");
const encryptBtn = document.getElementById("encryptBtn");
const copyBtn = document.getElementById("copyBtn");
const type = document.getElementById("type");

encryptBtn.addEventListener("click", () => {
  const code = input.value;
  const selectedType = type.value;

  if (!code.trim()) {
    output.value = "Please enter some code.";
    return;
  }

  if (selectedType === "js") {
    const obfuscated = JavaScriptObfuscator.obfuscate(code, {
      compact: true,
      controlFlowFlattening: true,
      stringArray: true,
      stringArrayEncoding: ['rc4'],
      rotateStringArray: true
    });
    output.value = obfuscated.getObfuscatedCode();
  } else if (selectedType === "css") {
    const minified = code.replace(/\s+/g, ' ').replace(/\/\*.*?\*\//g, '');
    output.value = btoa(unescape(encodeURIComponent(minified)));
  } else if (selectedType === "html") {
    const compressed = code.replace(/\n/g, '').replace(/\s+/g, ' ');
    output.value = btoa(unescape(encodeURIComponent(compressed)));
  }
});

copyBtn.addEventListener("click", () => {
  output.select();
  document.execCommand("copy");
  alert("Encrypted code copied!");
});