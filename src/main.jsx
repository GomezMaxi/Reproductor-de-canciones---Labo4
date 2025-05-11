import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './main.css';
import App from './App.jsx';
import '@justinribeiro/lite-youtube';

//Creo una raiz donde busco en el html un elemento con el id root y renderizo dentro el contenido de App
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

