import React, {ChangeEvent, FormEvent, useState} from 'react';

const API_URL = "http://localhost:3001";

const PhotoUpload = () => {
  const [file, setFile] = useState<File | undefined>();
  const [tags, setTags] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event?.target?.files && event.target.files.length > 0) {
      setFile(event.target["files"][0]);
    }
  };

  const sendData = async () => {
    if (file) {
      try {
        setLoading(true);
        setError("");
        const formData = new FormData()
        formData.append('photo', file);
        let response = await fetch(`${API_URL}/file`, {
          credentials: "include",
          method: "post",
          body: formData
        });
        if (response.status !== 200) {
          const error = await response.json();
          throw new Error(error.error);
        }
        const data = await response.json();
        const filename = data.filename;
        const tagsArray = tags.split(" ").filter(it => it !== "");

        response = await fetch(`${API_URL}/photo`, {
          credentials: "include",
          method: "post",
          body: JSON.stringify({
            tags: tagsArray,
            filename
          })
        });
        if (response.status !== 200) {
          const error = await response.json();
          throw new Error(error.error);
        }
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        }
      } finally {
        setLoading(false);
      }
    }
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendData();
  };

  return (
    <div>
      {loading && "Loading..."}
      {error}
      <form onSubmit={onSubmit}>
        <div>
          Tags:
          <input type="text" value={tags} onChange={e => setTags(e.target.value)}/>
        </div>
        <input type="file" onChange={onFileChange}/>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default PhotoUpload;
