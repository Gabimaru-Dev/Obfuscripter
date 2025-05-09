document.getElementById("encryptBtn").addEventListener("click", () => {
  const type = document.getElementById("type").value;
  const code = document.getElementById("input").value.trim();
  const output = document.getElementById("output");

  let result = "";

  if (!code) return (output.value = "Drop some code first...");

  if (type === "js") {
    result = `eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};` +
      `if(!''.replace(/^/,String)){while(c--)d[c.toString(a)]=k[c]||c.toString(a);` +
      `k=[function(e){return d[e]}];e=function(){return'\\\\w+'};c=1;};` +
      `while(c--)if(k[c])p=p.replace(new RegExp('\\\\b'+e(c)+'\\\\b','g'),k[c]);` +
      `return p;}('${btoa(code)}',36,36,'|'.split('|'),0,{}))`;
  }

  else if (type === "css") {
    result = `<style>${code.replace(/[\n\r]+/g, "").replace(/\s+/g, " ")}</style>`;
  }

  else if (type === "html") {
    const encoded = encodeURIComponent(code);
    result = `<script>eval(unescape('${encoded}'))</script>`;
  }

  output.value = result;
});
function copyCode() {
  const output = document.getElementById('output');
  output.select();
  document.execCommand('copy');
  alert('Encrypted code copied to clipboard!');
} 