import React from "react";
import "../styles/card.css";

function Card({ gif, handleClick, gifCliqueados, contador, contadorFunc }) {
  const { images } = gif;

  return (
    <div className="relative drop-shadow-xl w-48 h-64 overflow-hidden rounded-xl bg-[#3d3c3d]">
      <div className="absolute flex items-center justify-center text-white z-[1] opacity-90 rounded-xl inset-0.5 bg-[#323132]">
        <img
          src={images.original.url}
          alt="GIF"
          className="object-cover w-full h-full rounded-xl cursor-pointer"
          onClick={() => {
            handleClick(gif);
            contadorFunc();
            console.log(contador)
            console.log("Gif clickeado:", gif, "Gifs cliqueados:", gifCliqueados);
          }}
        />
      </div>
    </div>
  );
}


export default Card;
