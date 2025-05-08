async function obfuscateCode() {
  const input = document.getElementById("inputCode").value;
  const lang = document.getElementById("language").value;
  const output = document.getElementById("outputCode");

  if (!input.trim()) {
    output.value = "Please paste your code.";
    return;
  }

  if (lang === "js") {
    try {
      const result = await Terser.minify(input);
      output.value = result.code || "Obfuscation failed.";
    } catch (e) {
      output.value = "Error: " + e.message;
    }
  } else if (lang === "html") {
    output.value = input
      .replace(/\n/g, "")
      .replace(/\s{2,}/g, " ")
      .replace(/> </g, "><")
      .trim();
  } else if (lang === "css") {
    output.value = input
      .replace(/\s+/g, " ")
      .replace(/\/\*.*?\*\//g, "")
      .replace(/\s*([{}:;,])\s*/g, "$1")
      .trim();
  }
}

function copyCode() {
  const output = document.getElementById("outputCode");
  output.select();
  document.execCommand("copy");
  alert("Code copied!");
}