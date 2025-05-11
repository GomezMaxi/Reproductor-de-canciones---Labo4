import { useState, useEffect } from "react";
import SortButton from "./Ordenar";
import "./Buscador.css";

// Componente encargado de filtrar y ordenar la lista de canciones
const Buscador = ({ songs, setFilteredSongs }) => {
  // Declaro los estado para la búsqueda y para ordenar
  const [searchTerm, setSearchTerm] = useState("");
  const [sortDesc, setSortDesc] = useState(false);

  // useEffect para cuando cambian las canciones, la búsqueda o el orden
  useEffect(() => {
    let filtered = [...songs];

    // Verifico si se escribe en el buscador sin importar si incluye mayusculas o no
    if (searchTerm.trim()) {
      filtered = filtered.filter((song) =>
        song.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Verifico si está activado el orden descendente y ordeno por cantidad de reproducciones
    if (sortDesc) {
      filtered.sort((a, b) => b.plays - a.plays);
    }

    // Actualizo la lista filtrada
    setFilteredSongs(filtered);
  }, [songs, searchTerm, sortDesc, setFilteredSongs]);

  return (
    <div className="search-sort-container">
      {/* Input de búsqueda */}
      <input
        type="text"
        placeholder="Buscar canción..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      {/* Botón de ordenar que traigo de Ordenar.jsx*/}
      <SortButton
        sortDesc={sortDesc}
        setSortDesc={setSortDesc}
      />
    </div>
  );
};

export default Buscador;
