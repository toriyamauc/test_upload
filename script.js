function readFile(file) {
  return new Promise((resolve, reject) => {
    if (!file) return resolve(null);
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  });
}

function renderCIF(cifData, viewerId) {
  const element = document.getElementById(viewerId);
  element.innerHTML = ""; // clear previous content
  const viewer = $3Dmol.createViewer(element, { backgroundColor: "white" });
  viewer.addModel(cifData, "cif");
  viewer.setStyle({}, { stick: {}, sphere: { scale: 0.3 } });
  viewer.zoomTo();
  viewer.render();
}

async function loadStructures() {
  const file1 = document.getElementById("file1").files[0];
  const file2 = document.getElementById("file2").files[0];

  const [cif1, cif2] = await Promise.all([readFile(file1), readFile(file2)]);

  if (cif1) renderCIF(cif1, "viewer1");
  if (cif2) renderCIF(cif2, "viewer2");
}
