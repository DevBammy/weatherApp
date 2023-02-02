import React, { useState } from "react";

const Weather = () => {
  // store user input
  const [input, setInput] = useState("");
  // store weather from Api
  const [weather, setWeather] = useState({});
  // store loading content to be displayed before the full weather
  const [isLoading, setIsLoading] = useState(false);
  // store error state to be displayed on the template
  const [error, setError] = useState(true);
  // store error content to be displayed on the template
  const [errMsg, setErrMsg] = useState("");

  // Get our API keys and url from Open Weahter website
  const api = {
    url: "https://api.openweathermap.org/data/2.5/",
    key: "f40085961a90bf039451d4368a2d616f",
  };

  // url for weather icon
  const iconUrl = "https://api.openweathermap.org/img/w/";

  // Get & set user input
  const getInput = (e) => {
    setInput(e.target.value);
  };

  // Function to get weather
  const getWeather = (e) => {
    if (e.key === "Enter" && input === "") {
      setErrMsg("Guy, You never type your city you de press enter 🙄");
      setError(true);
    }
    if (e.key === "Enter" && input !== "") {
      fetch(`${api.url}weather?q=${input}&units=metrics&appid=${api.key}`)
        .then((res) => {
          if (!res) {
            throw Error(
              "Guy, your network no strong reach. abi you no get data?🙄"
            );
          }
          return res.json();
        })
        .then((data) => {
          setWeather(data);
          setInput("");
          setError(false);
        })
        .catch((err) => {
          setError(true);
          setErrMsg(err.message);
          console.log(err.message);
        });
    }
  };

  return (
    <div className="wrapper">
      <div className="overlay"></div>
      <div className="content">
        <h1>Weather App</h1>
        <input
          type="text"
          placeholder="Enter a city..."
          onChange={getInput}
          value={input}
          onKeyPress={getWeather}
        />

        {error ? (
          <p className="error-text">{errMsg}</p>
        ) : (
          <div className="result">
            <h2>
              {weather.name}, {weather.sys.country}
            </h2>
            <div className="date">2022/1/29</div>
            <img
              src={iconUrl + weather.weather[0].icon + ".png "}
              alt="weather icon"
              className="weather-icon"
            />
            <div className="weather-data">
              <h3>
                Temp: <span>{Math.round(weather.main.temp)} ℃</span>
              </h3>
              <h3>
                Weather: <span>{weather.weather[0].main}</span>
              </h3>
              <h3>
                Temp Range:{" "}
                <span>
                  {Math.round(weather.main.temp_min)} ℃ /{" "}
                  {Math.round(weather.main.temp_max)} ℃
                </span>
              </h3>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
