import Card from "./card";
import { useState, useEffect } from "react";
import Modal from "./modal";

function DataRender({ dataToRender, getData, limit, setearLimite }) {
  // console.log("Data to render: " + dataToRender)
  // console.log(typeof dataToRender)
  // console.log(dataToRender.data[0].url)

  const [gifsCliqueados, setGifsCliqueados] = useState([]);
  const [contador, setContador] = useState(0);
  const [gifsMostrados, setGifsMostrados] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarBoton, setMostrarBoton] = useState(true);

  function manejarClick() {
    setMostrarBoton(false); // oculta el botón
  }

  function handleContador() {
    setContador(contador + 1);
  }

  function handleGifsCliqueados(gif) {
    setGifsCliqueados((prev) => [...prev, gif]);
  }

  function handleGifSeleccionado(gif) {
    const yaEsta = gifsCliqueados.some((g) => g.id === gif.id);
    if (!yaEsta) {
      setGifsCliqueados((prev) => [...prev, gif]);
      const gifsAleatorios = shuffleArray(gifsMostrados);
      setGifsMostrados(gifsAleatorios); // <== Acá sí se usa realmente
    } else {
      console.log("Gif ya clickeado, deberías mostrar nuevos gifs");
      // lógica para mezclar gifs si querés
      setMostrarModal(true); // <-- Activar modal
      const gifsAleatorios = shuffleArray(gifsMostrados);
      setGifsMostrados(gifsAleatorios); // <== Acá sí se usa realmente
      setGifsCliqueados([]);
    }
  }

  function shuffleArray(arr) {
    return arr.sort(() => Math.random() - 0.5);
  }

  useEffect(() => {
    if (dataToRender?.data) {
      setGifsMostrados(dataToRender.data);
    }
  }, [dataToRender]);

  useEffect(() => {
    console.log("Gifs cliqueados (actualizados):", gifsCliqueados);
  }, [gifsCliqueados]);

  return (
    <div className="text-yellow-300">
      <h1>Simpson's Gif Game</h1>

      {mostrarBoton && (
        <div className="mt-4 flex flex-col gap-3">
          <label className="text-sm font-semibold">
            <input
              className="w-[300px] bg-white border border-gray-300 rounded px-3 py-1 mt-1 placeholder-gray-500 text-center text-gray-800"
              placeholder="Ingresar la cantidad de gifs"
              onChange={(e) => setearLimite(e)}
            />
          </label>
          <button
            onClick={() => {
              setMostrarBoton(false);
              getData(limit);
            }}
          >
            Obtener data
          </button>
        </div>
      )}
      {mostrarModal ? (
        <Modal cerrar="Cerrar" onClose={() => setMostrarModal(false)} />
      ) : (
        <div className="grid grid-cols-4 gap-4 mt-4">
          {gifsMostrados.map((gif, index) =>
            gif !== undefined ? (
              <Card
                key={gif.id}
                gif={gif}
                handleClick={handleGifSeleccionado}
                gifCliqueados={gifsCliqueados}
                contadorFunc={handleContador}
                contador={contador}
              />
            ) : null
          )}
        </div>
      )}
    </div>
  );
}

export default DataRender;
