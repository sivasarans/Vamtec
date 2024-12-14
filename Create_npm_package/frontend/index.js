const DownloadFile = (baseFilename, fileExtension, data) => {
  const filename = `${baseFilename}.${fileExtension}`;
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(new Blob([data]));
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  link.remove();
};