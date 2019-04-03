export default (file, handleFile) => {
  const fileReader = new FileReader();
  fileReader.onloadend = handleFileRead;
  fileReader.readAsText(file);

  function handleFileRead() {
    const content = fileReader.result;
    handleFile(content);
  }
};
