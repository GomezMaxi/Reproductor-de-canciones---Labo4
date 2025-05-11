import './Modal.css';

const Modal = ({ song, onClose }) => {
  // Valido que si no hay ninguna canción me devuelva como null el Modal
  if (!song) return null;

  // Extraer ID del video de la URL de YouTube
  const match = song.url.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  const videoId = match ? match[1] : null; // Guardo el id si encuentra una coincidencia con el verificador de arriba

  return (
    // Creo div para el modal
    <div className="modal-overlay" onClick={onClose}>
      {/* Creo div para el video */}
      <div
        className="modal"
        onClick={(e) => e.stopPropagation()} // Evito que se cierre el modal al clickear adentro
      >
        {/* Si se encuentra un video renderizo con iframe y sino muestro un error*/}
        {videoId ? (
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title="YouTube Video Player"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
        ) : (
          <p>Video no disponible</p>
        )}
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default Modal;
