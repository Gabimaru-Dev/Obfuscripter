function scramble() {
  const type = document.getElementById('fileType').value;
  let code = document.getElementById('codeInput').value;

  if (type === 'js') {
    code = code
      .replace(/\/\/.*|\/\*[\s\S]*?\*\//g, '')
      .replace(/\s{2,}/g, ' ')
      .replace(/\n/g, '');
    code = btoa(code); // Base64 for simple obfuscation
    code = `eval(atob("${code}"))`;
  }

  if (type === 'html' || type === 'css') {
    code = code
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\s{2,}/g, ' ')
      .replace(/\n/g, '');
  }

  document.getElementById('output').value = code.trim();
}