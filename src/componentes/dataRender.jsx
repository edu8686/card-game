import Card from "./card";
import { useState, useEffect } from "react";
import Modal from "./modal";
import ScoreRender from "./scoreRender";

function DataRender({ dataToRender, getData, limit, setearLimite }) {
  const [gifsCliqueados, setGifsCliqueados] = useState([]);
  const [contador, setContador] = useState(0);
  const [gifsMostrados, setGifsMostrados] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarBoton, setMostrarBoton] = useState(true);
  const [bestScore, setBestScore] = useState(0);

  // ✨ Evita duplicados al cargar la data
  useEffect(() => {
    if (dataToRender?.data) {
      const uniqueGifs = Array.from(
        new Map(dataToRender.data.map((g) => [g.id, g])).values()
      );
      setGifsMostrados(uniqueGifs);
    }
  }, [dataToRender]);

  const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5);

  const manejarClick = () => setMostrarBoton(false);

  const handleSubirContador = () => setContador((prev) => prev + 1);

  const resetearContador = () => setContador(0);

  const handleBestScore = (contadorActual) => {
    if (contadorActual > bestScore) setBestScore(contadorActual);
  };

  const handleGifSeleccionado = (gif) => {
    const yaEsta = gifsCliqueados.some((g) => g.id === gif.id);

    if (!yaEsta) {
      // agregar a gifsCliqueados y subir contador
      setGifsCliqueados((prev) => [...prev, gif]);
      handleSubirContador();

      // mezclar los GIFs para mostrar
      setGifsMostrados(shuffleArray(gifsMostrados));
    } else {
      // GIF ya clickeado → terminar juego
      setMostrarModal(true);
      handleBestScore(contador);
      resetearContador();
      setGifsCliqueados([]);
      setGifsMostrados(shuffleArray(gifsMostrados));
    }
  };

  return (
    <div className="text-yellow-300">
      <h1>Simpson's Gif Game</h1>

      {mostrarBoton && (
        <div className="mt-4 flex flex-col gap-3">
          <label className="text-sm font-semibold">
            <input
              className="w-[300px] bg-white border border-gray-300 rounded px-3 py-1 mt-1 placeholder-gray-500 text-center text-gray-800"
              placeholder="Ingresar la cantidad de gifs"
              onChange={setearLimite}
            />
          </label>
          <button
            onClick={() => {
              manejarClick();
              getData(limit);
            }}
          >
            Obtener data
          </button>
        </div>
      )}

      {mostrarModal && <Modal cerrar="Cerrar" onClose={() => setMostrarModal(false)} />}

      {!mostrarModal && !mostrarBoton && (
        <div>
          <ScoreRender currentScore={contador} bestScore={bestScore} />
          <div className="grid grid-cols-4 gap-4 mt-4">
            {gifsMostrados.map((gif) =>
              gif ? (
                <Card
                  key={gif.id}
                  gif={gif}
                  handleClick={handleGifSeleccionado}
                  gifCliqueados={gifsCliqueados}
                  contador={contador}
                />
              ) : null
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default DataRender;
