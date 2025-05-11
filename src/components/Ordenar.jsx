import './Ordenar.css';

// Botón para ordenar
const SortButton = ({ sortDesc, setSortDesc }) => {
  // Al hacer clic, se invierte el orden
  const handleSort = () => {
    setSortDesc(!sortDesc);
  };

  return (
    <div className="sort-button">
      {/* Cambio el texto del boton según el estado */}
      <button onClick={handleSort}>
        {sortDesc ? "Orden original" : "Ordenar por reproducciones"}
      </button>
    </div>
  );
};

export default SortButton;
