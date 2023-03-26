import React from 'react';
import './Upload.css';
import axios from 'axios';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

import { Crop, PercentCrop, PixelCrop } from './../../../node_modules/react-image-crop/dist/types.d';
import { ImageToFile } from '../../Classes/ImageToFile';
import { CropImage } from '../../Classes/CropImage';
import { Base64Converter } from '../../Classes/Base64Converter';
import { ITranslatedText } from '../../Interfaces/ITranslatedText';

function App() {
  const [selectedFile, setSelectedFile] = React.useState<File>();
  const [fileName, setFileName] = React.useState<string>();
  const [preview, setPreview] = React.useState<string>();
  const [crop, setCrop] = React.useState<PixelCrop>({ unit: "px", width: 0, height: 0, x: 0, y: 0 });
  const [image, setImage] = React.useState<HTMLImageElement>();
  const [output, setOutput] = React.useState<string>();
  const [translatedData, setTranslatedData] = React.useState<Array<ITranslatedText>>();

  const base64Converter = new Base64Converter();


  const onFileChange = async (event: React.BaseSyntheticEvent) => {
    let file = event.target.files[0];
    setSelectedFile(file);

    const objectUrl = URL.createObjectURL(new Blob([file!], { type: file!.type }));
    setPreview(objectUrl)

    const img = await readImageFile(file);
    setImage(img);
  };

  function readImageFile(file: File): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const img = base64Converter.base64ToImage(e.target?.result as string);
        img.onload = () => resolve(img);
        img.onerror = reject;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  const onReadData = () => {
    axios.get('weatherforecast/gettext?fileName=' + fileName)
      .then(response => {
        setTranslatedData(response.data);
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleCropChange = (newCrop: PixelCrop, percentCrop: PercentCrop) => {
    setCrop(newCrop)
  };

  const cropImageNow = async () => {
    let cropImage = new CropImage(image!, crop, "image/png");
    let base64 = await cropImage.cropImage();
    setOutput(base64);
  };

  async function imageToFile(image: HTMLImageElement): Promise<File> {
    let imageToFile = new ImageToFile();
    let file = imageToFile.convertCanvasToFile(image);
    return file;
  }

  const onSubmit = async () => {
    if (!selectedFile)
      throw new Error('Please select a file');

    let outputImage = base64Converter.base64ToImage(output!);
    let file = await imageToFile(outputImage!);

    const formData = new FormData();
    formData.append('file', file!);

    axios.post('weatherforecast/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json'
      }
    })
      .then(response => {
        console.log(response)
        setFileName(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const fileData = () => {
    if (selectedFile) {
      return (
        <div>
          <h2>File Details:</h2>
          <p>File Name: {selectedFile.name}</p>
          <p>File Type: {selectedFile.type}</p>
          {translatedData && (
            <div>
              {translatedData.map(({ translations }) => {
                return translations?.map(({ text }) => {
                  return text?.split("\n").map((t, i) => {
                    return <p key={`${i}-${t}`}>{t}</p>
                  })
                })
              })}
            </div>
          )}
          {selectedFile && (
            <div>
              <ReactCrop
                crop={crop as Crop}
                onChange={handleCropChange}
                onComplete={cropImageNow}
              >
                <img src={preview} alt='Preview' />
              </ReactCrop>
              <div>{output && <img src={output} alt='output' />}</div>
            </div>
          )}

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
        <input type="file" accept="image/*" onChange={onFileChange} />
        <button onClick={onSubmit}>
          Upload!
        </button>
        <button onClick={onReadData}>
          ReadData!
        </button>
        <button onClick={() => console.log(translatedData)}>
          Press ME!
        </button>
      </div>
      {fileData()}
    </div>
  );
}

export default App;
