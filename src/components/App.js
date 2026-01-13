
import React from "react";
import './../styles/App.css';

import React from "react";

function App() {
  const [city, setCity] = React.useState("");
  const [info, setInfo] = React.useState();
  const [loading, setLoading] = React.useState(false);

  const API_KEY = "#";
  const URL = "https://api.openweathermap.org/data/2.5/weather";

  const getData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${URL}?q=${city}&appid=${API_KEY}`);
      const data = await res.json();
      console.log(data);
      setInfo(data);
      setLoading(false);
    } catch (err) {
      console.log("couldnot fetch");
      setLoading(false);
    }

    // console.log(info)
  };

  const handleSearch = () => {
    if (city.trim() === "") return;
    getData();
  };

  return (
    <>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className='search'
      />
      <button onClick={handleSearch}>Search</button>
      {/* <p>{info}</p> */}

      {loading === true ? (
        <p>Loading... </p>
      ) : (
        <div>
          {info && (
            <div>
              <h3 className="weather">{info.name}</h3>
              <p>
                Coordinates - Lat{" "}
                <span style={{ color: "red", fontWeight: "bold" }}>
                  {" "}
                  {info.coord.lat}{" "}
                </span>
                , Lon -{" "}
                <span style={{ color: "red", fontWeight: "bold" }}>
                  {info.coord.lon}
                </span>
              </p>
              <span>Weather -{info.weather[0].main}</span>
              <span >
                <img
                  src={`https://openweathermap.org/img/wn/${info.weather[0].icon}@2x.png`}
                  style={{ width: "75px", height: "75px" }}
                />
              </span>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default App;

