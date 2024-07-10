import React, { useRef } from 'react';

const FileInputFromURL = () => {
  const fileInputRef = useRef(null);

  const setFileFromURL = async (url) => {
    // Fetch the file from the URL
    const response = await fetch(url);
    const blob = await response.blob();
    
    // Create a File object from the Blob
    const fileName = url.split('/').pop(); // Extract the file name from the URL
    const file = new File([blob], fileName, { type: blob.type });

    // Create a DataTransfer object and set the File object as a file
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);

    // Set the file input's files to the DataTransfer's files
    if (fileInputRef.current) {
      fileInputRef.current.files = dataTransfer.files;
      console.log('File set in input:', fileInputRef.current.files[0]);
    }
  };

  return (
    <div>
      <input type="file" ref={fileInputRef} />
      <button onClick={() => setFileFromURL('https://example.com/path/to/your/image.jpg')}>
        Set File from URL
      </button>
    </div>
  );
};

export default FileInputFromURL;
