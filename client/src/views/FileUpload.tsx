import React, {ChangeEvent, ChangeEventHandler, FormEvent, useState} from 'react';

const FileUpload = () => {
  const [file, setFile] = useState<File | undefined>();

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event?.target?.files && event.target.files.length > 0) {
      setFile(event.target["files"][0]);
    }
  };

  const uploadPhoto = async () => {
    if (file) {
      const formData = new FormData()
      formData.append('photo', file);
      const response = await fetch("http://localhost:3001/file", {
/*
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
*/
        method: "post",
        body: formData
      });
      const data = await response.json();
      console.log(data);
    }
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    uploadPhoto();
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
          <input type="file" onChange={onFileChange} />
          <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default FileUpload;
