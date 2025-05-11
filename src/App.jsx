import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import SongForm from "./components/FormCanciones";
import SongList from "./components/ListaCanciones";
import SearchAndSort from "./components/Buscador";
import './App.css';

//Creo los estados para poder tener todas las canciones existentes y las que fueron filtradas
function App() {
  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);

  //Cargo las canciones al localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("songs")) || []; // [] vacio porque el efecto se ejecuta solo cuando se usa el componente. UNA HORA PELEANDO POR ESTOS CORCHETES
    const storedWithIds = stored.map((song) => ({
      ...song,
      id: song.id || uuidv4(), //Me aseguro que tengan un id y sino se lo asigno. 
    }));
    setSongs(storedWithIds);
    setFilteredSongs(storedWithIds);
  }, []);

  //Actualizo el localStorage recibiendo la lista actualizada
  const updateLocalStorage = (updatedSongs) => {
    setSongs(updatedSongs);
    setFilteredSongs(updatedSongs);
    localStorage.setItem("songs", JSON.stringify(updatedSongs));
  };

  //Funcion que recorre las canciones, actualiza el contador al encontrar el id y actualizo la lista
  const handlePlay = (song) => {
    const updatedSongs = songs.map((s) =>
      s.id === song.id ? { ...s, plays: s.plays + 1 } : s
    );
    updateLocalStorage(updatedSongs);
  };

  //Funcion para borrar una canción con confirmación mostrando el nombre
  const handleDelete = (id, name) => {
    const confirmDelete = window.confirm(`¿Estás seguro de que deseas eliminar la canción "${name}"?`);
    if (!confirmDelete) return;

    const updatedSongs = songs.filter((song) => song.id !== id);
    updateLocalStorage(updatedSongs);
  };

  return (
    //Creo los componentes de las caniones, la busqueda y la lista, basicamente todo lo del componente Ordenar we
    <div className="app-container">
      <h1>Reproductor de Canciones</h1>
      <SongForm songs={songs} setSongs={updateLocalStorage} /> {/* Actualizo el localStorage segun el estado de las canciones de la lista*/}
      <SearchAndSort songs={songs} setFilteredSongs={setFilteredSongs} /> {/* Actualizo el estado de las canciones filtradas */}
      <SongList songs={filteredSongs} onPlay={handlePlay} onDelete={handleDelete} /> {/* Muestro la lista de canciones al recibir el filtro y la reproduccion del video */}
    </div>
  );
}

//Me costó una banda.
export default App;
