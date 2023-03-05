import React, { useEffect, useState } from 'react';
import {API, BASE_URL} from "../servises/api";
import {Photo, Tag} from "../interfaces";

function Home() {
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [isLogged, setLogged] = useState(false);
  const [tags, setTags] = useState<Tag[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [query, setQuery] = useState("");

  const init = async () => {
    setLogged(false);
    setResult("");
    setError("");
    try {
      const user = await API.user.getCurrentUser();
      setResult(`Добро пожаловать, ${user.login}`);
      setLogged(true);
      const tags = await API.tag.getAll();
      setTags(tags);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    }
  };

  useEffect(() => {
    init();
    getPhotos();
  }, []);

  const getPhotos = async () => {
    const photos = await API.photo.getAll(query);
    setPhotos(photos);
  }

  useEffect(() => {
    getPhotos();
  }, [query]);

  const logoutRequest = async () => {
    try {
      await API.auth.logout();
      setLogged(false);
      setResult("");
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      }
    }
  };

  const handleLogout = () => {
    logoutRequest();
  };

  return <>
    <h3>Home</h3>
    {result && <div>{result}</div>}
    {error && <div>{error}</div>}
    {isLogged && <button onClick={handleLogout}>Разлогиниться</button>}
    <div>
      <h4>Tags:</h4>
      {tags.map(tag => <span onClick={() => setQuery(tag.name)}>{tag.name}{" "}</span>)}
    </div>
    <div>
      <h4>Photos:</h4>
      {photos.map(photo => <img key={photo.id} src={`${BASE_URL}/public/${photo.filename}`} width={200}/>)}
    </div>
  </>;
}

export default Home;
