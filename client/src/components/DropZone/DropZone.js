import React, { useState } from "react";
import Dropzone from "react-dropzone";

function DropZone(props) {
  // const [fileNames, setFileNames] = useState([]);
  const handleDrop = acceptedFiles => {
    // setFileNames(acceptedFiles.map(file => file.name));
    props.uploadImage(acceptedFiles[0]);
  }

  return (
    <div style={{
      textAlign: "center",
      padding: "20px",
      border: "3px dashed #eeeeee",
      backgroundColor: "#fafafa",
      color: "#bdbdbd"
    }}>
      <Dropzone onDrop={handleDrop}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps({ className: "dropzone" })}>
            <input {...getInputProps()} />
            <p>Drag'n'drop files, or click to select files</p>
          </div>
        )}
      </Dropzone>
      {/* <div>
        <strong>Files:</strong>
        <ul>
          {fileNames.map(fileName => (
            <li key={fileName}>{fileName}</li>
          ))}
        </ul>
      </div> */}
    </div>
  );
}

export default DropZone;

