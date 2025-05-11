import { useState } from "react";
import VideoModal from "./Modal";         
import SongItem from "./Canciones";       
import './ListaCanciones.css';

const SongList = ({ songs, onPlay, onDelete }) => {
  // Hago un estado para guardar la canción que se va a ver en el modal
  const [selectedSong, setSelectedSong] = useState(null);

  // Función para el botón de Play
  const handlePlay = (song) => {
    onPlay(song);            // Aumenta el contador
    setSelectedSong(song);   // Activa el modal 
  };

  return (
    //Creo la lista de canciones
    <div className="song-list">
      <h2>Lista de Canciones</h2>

      {/* Si no hay canciones cargadas muestro el mensaje, sino renderizo la lista */}
      {songs.length === 0 ? (
        <p>No hay canciones registradas.</p>
      ) : (
        <ul>
          {songs.map((song) => (
            // Genero una key única para cada item de la lista
            <SongItem
              key={song.id}
              song={song}
              onPlay={handlePlay}
              // Le doy el nombre de la canción al onDelete para mostrar el mensaje
              onDelete={() => onDelete(song.id, song.name)}
            />
          ))}
        </ul>
      )}

      {/* Si hay una canción seleccionada, muestro el modal con esa canción */}
      {selectedSong && (
        <VideoModal
          song={selectedSong}
          onClose={() => setSelectedSong(null)} // Cierra el modal al hacer clic en cerrar
        />
      )}
    </div>
  );
};

export default SongList;
