import React, { useState } from "react";
import "./App.css";

function FileUploader() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [responseText, setResponseText] = useState({});

  // handle the file change
  const handleFileChange = (event) => {
    let files = event.target.files;
    setSelectedFiles(files);
  };

  // submit & upload the file
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    for(let file of selectedFiles){
        formData.append('files',file);
        
    }

    fetch('http://localhost:5000/upload',{
        method:'POST',
        body:formData
    })
    .then((response)=> response.json())
    .then((data)=>{
        console.log(data);
        setResponseText(data);

        setTimeout(()=>{
            setResponseText("");

        },3000);

    })
    .catch((error)=>{
        console.error('Error occurred while uploading files:', error);
    })

  };

  // on drop
  const handleDrop = (event) => {};

  // on drag
  const handleDragOver = (event) => {};

  return (
    <div className="App">
      <div>
        <h2>{responseText.message}</h2>
      </div>
      <div className="card">
        <h1 className="card-title">File Uploader</h1>
        <form
          className="form"
          onSubmit={handleSubmit}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <label htmlFor="fileInput" className="file-label">
            Drag and drop files here or click to browse
          </label>
          <input
            type="file"
            id="fileInput"
            className="file-input"
            multiple
            onChange={handleFileChange}
          />
          <div className="selected-files">
            {selectedFiles.length > 0 && (
              <ul>
                {Array.from(selectedFiles).map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            )}
          </div>
          <button type="submit" className="submit-button">
            Upload
          </button>
        </form>
      </div>
    </div>
  );
}

export default FileUploader;
