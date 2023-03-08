import React, { useEffect, useState } from 'react';
import {API, BASE_URL} from "../servises/api";
import {Photo, Tag} from "../interfaces";

function Home() {
  const [tags, setTags] = useState<Tag[]>([]);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [query, setQuery] = useState("");

  const getPhotos = async () => {
    const photos = await API.photo.getAll(query);
    setPhotos(photos);
  }

  const getTags = async () => {
    const tags = await API.tag.getAll();
    setTags(tags);
  }

  useEffect(() => {
    getPhotos();
    getTags();
  }, []);

  useEffect(() => {
    getPhotos();
  }, [query]);

  return <>
    <h3>Home</h3>
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
