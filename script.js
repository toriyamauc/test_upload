function readFile(file) {
  return new Promise((resolve, reject) => {
    if (!file) return resolve(null);
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  });
}

async function processFiles() {
  const file1 = document.getElementById("file1").files[0];
  const file2 = document.getElementById("file2").files[0];

  const [text1, text2] = await Promise.all([readFile(file1), readFile(file2)]);

  let output = "";
  if (text1 && text2) {
    output = (text1 === text2) ? "Files are identical!" : "Files differ.";
  } else if (text1) {
    output = `File 1 length: ${text1.length} characters`;
  } else if (text2) {
    output = `File 2 length: ${text2.length} characters`;
  } else {
    output = "No files uploaded.";
  }

  document.getElementById("output").textContent = output;
}
