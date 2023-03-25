import React from 'react';
import './Upload.css';
import axios from 'axios';

function App() {
  const [selectedFile, setSelectedFile] = React.useState<File>();
  // On file select (from the pop up)

  const onFileChange = (event: React.BaseSyntheticEvent) => {
    setSelectedFile(event.target.files[0]);
  };

  const onSubmit = () => {
    if (!selectedFile) {
      console.log('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    axios.get("weatherforecast")
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
    axios.post('weatherforecast/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json'
      }
    })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  // File content to be displayed after
  // file upload is complete
  const fileData = () => {
    if (selectedFile) {
      return (
        <div>
          <h2>File Details:</h2>
          <p>File Name: {selectedFile.name}</p>
          <p>File Type: {selectedFile.type}</p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };
  return (
    <div>
      <h1>
        GeeksforGeeks
      </h1>
      <h3>
        File Upload using React!
      </h3>
      <div>
        <input type="file" onChange={onFileChange} />
        <button onClick={onSubmit}>
          Upload!
        </button>
      </div>
      {fileData()}
    </div>
  );
}

export default App;
