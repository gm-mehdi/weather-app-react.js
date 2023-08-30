import axios from "axios";
import { useState } from "react";
const Home = () => {
  const [data, setData] = useState({});
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, setIsPending] = useState(false);

  const HandleClick = () => {
    const trimmedCity = city.trim();
    if (trimmedCity !== "") {
      const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${trimmedCity}&appid={YOUR_API_KEY}&units=metric`;
      setIsPending(true);
      axios
        .get(apiURL)
        .then((response) => {
          let iconweather = "";
          switch (response.data.weather[0].main) {
            case "Clear":
              iconweather = "/Images/clear.png";
              break;
            case "Clouds":
              iconweather = "/Images/clouds.png";
              break;
            case "Haze":
              iconweather = "/Images/mist.png";
              break;
            case "Drizzle":
            case "Rain":
              iconweather = "/Images/drizzle&rain.png";
              break;
            case "Thunderstorm":
              iconweather = "/Images/thunderstorm.png";
              break;
            case "Snow":
              iconweather = "/Images/snow.png";
              break;
            case "Mist":
              iconweather = "/Images/Mist.png";
              break;
            default:
              break;
          }
          //console.log(response.data);
          setTimeout(() => {
            setData({
              celcius: response.data.main.temp,
              name: response.data.name,
              humidity: response.data.main.humidity,
              speed: response.data.wind.speed,
              image: iconweather,
            });
            setIsPending(false);
          }, 500);
        })
        .catch((err) => {
          console.log(err);
          if (err.response.status === 404) {
            setError("Please type a valid city name");
          } else setError("");
        });
    }
  };
  if (city === "") {
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=agadir&appid={YOUR_API_KEY}&units=metric`;
    setTimeout(() => {
      axios
        .get(apiURL)
        .then((response) => {
          let iconweather = "";
          switch (response.data.weather[0].main) {
            case "Clear":
              iconweather = "/Images/clear.png";
              break;
            case "Clouds":
              iconweather = "/Images/clouds.png";
              break;
            case "Haze":
              iconweather = "/Images/mist.png";
              break;
            case "Drizzle":
            case "Rain":
              iconweather = "/Images/drizzle&rain.png";
              break;
            case "Thunderstorm":
              iconweather = "/Images/thunderstorm.png";
              break;
            case "Snow":
              iconweather = "/Images/snow.png";
              break;
            case "Mist":
              iconweather = "/Images/Mist.png";
              break;
            default:
              break;
          }
          //console.log(response.data);
          setData({
            celcius: response.data.main.temp,
            name: response.data.name,
            humidity: response.data.main.humidity,
            speed: response.data.wind.speed,
            image: iconweather,
          });
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    }, 500);
  }

  return (
    <div className="container">
      <div className="weather">
        <div className="search">
          <input
            type="text"
            placeholder="Enter a city name"
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={HandleClick}>
            <img src="/Images/search.png" alt="" />
          </button>
        </div>
        {isLoading || isPending ? (
          <div className="error">
            <p>{error}</p>
          </div>
        ) : (
          <div></div>
        )}

        {isLoading || isPending ? (
          <div className="loading">
            <div className="spinner "></div>
          </div>
        ) : (
          <div className="w_info">
            <img src={data.image} alt="clear" className="icon" />
            <h1>{Math.round(data.celcius)} °C</h1>
            <h2>{data.name}</h2>
            <div className="details">
              <div className="col">
                <img src="/Images/humidity.png" alt="humidity" />
                <div className="humidity">
                  <p>{data.humidity}%</p>
                  <p>Humidity</p>
                </div>
              </div>
              <div className="col">
                <img src="/Images/wind.png" alt="wind" />
                <div className="wind">
                  <p>{Math.round(data.speed)} km/h</p>
                  <p>Wind</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
//testing 
export default Home;
