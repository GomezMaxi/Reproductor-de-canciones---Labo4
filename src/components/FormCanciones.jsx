import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import './FormCanciones.css';

const FormCanciones = ({ songs, setSongs }) => {
  //Declaro los estados de nombre, url y el mensaje de error de carga de la canción
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  //Verifico que sea una URL válida de YouTube
  const isValidYouTubeUrl = (url) => {
    const pattern = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]{11}/;
    return pattern.test(url);
  };

  //Manejo el evento de envío del formulario, evitando el refresh automático
  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); //Reinicia el mensaje de error

    //Valido que los campos no esten vacíos
    if (!name.trim() || !url.trim()) {
      setError("Debe completar todos los campos.");
      return;
    }

    //Valido que la URL pertenezca a YouTube
    if (!isValidYouTubeUrl(url)) {
      setError("La URL debe ser válida y de YouTube.");
      return;
    }

    //Valido que la canción no haya sido agregada antes
    const alreadyExists = songs.some((song) => song.url === url);
    if (alreadyExists) {
      setError("Esta canción ya está en la lista.");
      return;
    }

    //Crear canción asignando ID único, nombre, url y cantidad de reproducciones en 0
    const newSong = {
      id: uuidv4(),            
      name: name.trim(),       
      url: url.trim(),
      plays: 0,               
    };

    //Actualizo la lista de canciones con la cancion agregada
    const updatedSongs = [...songs, newSong];
    setSongs(updatedSongs);

    //Limpio los inputs 
    setName("");
    setUrl("");
  };

  return (
    //Creo el formulario
    <form onSubmit={handleSubmit} className="form-container">
      <h2>Agregar Canción</h2>

      {/* Muestro el error */}
      {error && <p className="error-message">{error}</p>}

      {/* Genero el label para que escriban el nombre de la canción y le asigno id y nombre y lo actualizo con onChange */}
      <input
        type="text"
        placeholder="Nombre de la canción"
        value={name}
        onChange={(e) => setName(e.target.value)}
        id="song-name"
        name="song-name"
        autoComplete="off"
      />

      {/* Lo mismo que arriba pero con la URL */}
      <input
        type="text"
        placeholder="URL de YouTube"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        id="song-url"
        name="song-url"
        autoComplete="off"
      />

      {/* Botón para agregar la canción */}
      <button type="submit">Agregar</button>
    </form>
  );
};

export default FormCanciones;
