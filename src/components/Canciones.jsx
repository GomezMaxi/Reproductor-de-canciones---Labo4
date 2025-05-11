import "./Canciones.css";

const SongItem = ({ song, onPlay, onDelete }) => {
  return (
    // Creo un li para cada cancion
    <li className="list">
      <div>
        {/* Muestro el nombre de la canción */}
        <p className="NombreCancion">{song.name}</p>

        {/* Muestro la cantidad de reproducciones */}
        <p className="Reproducciones">Reproducciones: {song.plays}</p>
      </div>

      {/* Contenedor de los botones Ver y Borrar */}
      <div className="button-container">
        {/* Botón para abrir el modal y reproducir la canción */}
        <button
          onClick={() => onPlay(song)} // Llama a la función onPlay con la canción actual
          className="Ver-button"
        >
          Ver
        </button>

        {/* Botón Borrar con la confirmación */}
        <button
          onClick={onDelete} // Llama a la función de eliminar desde App.jsx
          className="Borrar-button"
        >
          Borrar
        </button>
      </div>
    </li>
  );
};

export default SongItem;
