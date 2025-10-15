import { useState } from "react";
import DataRender from "./dataRender";

function GetImageApi() {
  const [data, setData] = useState(null);
  const [limit, setLimit] = useState(12)

  function handleData(data) {
    setData(data);
  }

  function handleInput(e) {
    console.log("Input cambiado a:", e.target.value);
    setLimit(e.target.value)
  }

  let isFetching = false;

const getData = async (limit) => {
  if (isFetching) return;
  isFetching = true;
  const API_KEY = "H6AbYXFBaKf9ZfNmhuXa9rVMtr8ruzqy";

  try {
    const resp = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=the+simpsons&limit=${limit}&offset=0&rating=g&lang=en&bundle=messaging_non_clips`
    );
    const json = await resp.json();

    
    const dataSinPrimero = json.data.slice(1);

    handleData({ ...json, data: dataSinPrimero });
  } catch (err) {
    setData(err.message);
  } finally {
    isFetching = false;
  }
};


  return (
    <div className="data-render">
      <DataRender limit={limit} setearLimite={handleInput} dataToRender={data} getData={getData} />
    </div>
  );
}

export default GetImageApi;
