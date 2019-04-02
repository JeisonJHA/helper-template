export default (file, handleFile) => {
  let fileReader;
  fileReader = new FileReader();
  fileReader.onloadend = handleFileRead;
  fileReader.readAsText(file);

  function handleFileRead(e) {
    const content = fileReader.result;
    handleFile(content)
  }
}

