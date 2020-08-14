import React, { useState } from "react";
import { Switch, Route, useHistory, useParams } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { NavLink, Button } from "react-bootstrap";



function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/:city" exact component={Weatherpage} />
      </Switch>
    </div>
  );
}

function HomePage() {
  const history = useHistory();
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light color-nav">
        <NavLink className="navbar-brand" to="/#">
          <span className="icon">⛅️</span>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/#">
                <div className="name">Sunny's Weather</div>
              </NavLink>
            </li>
          </ul>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log(e.target.city.value);
              history.push(`/${e.target.city.value}`);
            }}
          >
            <input
              className="mb-1 mr-3 d-flex-center"
              type="text"
              name="city"
              placeholder="Enter your place/city name"
            />
            <Button variant="warning" type="submit" value="enter">
              Search
            </Button>
          </form>
        </div>
      </nav>
      
    </div>
  );
}

function Weatherpage() {
  const history = useHistory();
  // const { city } = useParams();
  const city = React.useRef(useParams().city);
  let [weatherData, setWeatherData] = useState("");
  console.log("Weather Page");
  React.useEffect(() => {
    async function getData() {
      try {
        console.log("using useEffect on Weather Page");
        console.log(city);
        const res = await fetch(`https://sunny-weather.herokuapp.com/?city=${city.current}`);
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error);
        }
        setWeatherData(data.data);
      } catch (err) {
        console.log(err);
      }
    }
    getData();
    if (city) {
      console.log(city);
    }
  }, [city]);

  const getInfo = (arg1, arg2) => {
    if (weatherData[arg1]) return weatherData[arg1][arg2];
    else return null;
  };
  const getInfo3 = (arg1, arg2, arg3) => {
    if (weatherData[arg1] && weatherData[arg1][arg2])
      return weatherData[arg1][arg2][0][arg3];
    else return null;
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light color-nav">
        <NavLink className="navbar-brand" to="/#">
          <span className="icon">⛅️</span>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink className="nav-link active">
                <div className="name">Sunny's Weather</div>
                {/* <a className="nav-link name" href="/">Sunny's Weather <span class="sr-only">(current)</span></a> */}
              </NavLink>
            </li>
          </ul>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log(e.target.city.value);
              history.push(`/${e.target.city.value}`);
              history.go();
            }}
          >
            <input
              className="mb-1 mr-3 d-flex-center"
              type="text"
              name="city"
              placeholder="Enter your place/city name"
            />
            <Button variant="warning" type="submit" value="enter">
              Search
            </Button>
          </form>
        </div>
      </nav>
      <div className="card-style">
        <div className="card" style={{ width: "38rem" }}>
          <div className="card-body">
            <h5 className="card-title"> {weatherData.timezone}</h5>
            <h6 className="card-subtitle mb-2">
             {getInfo("current", "temp")}°C
            </h6>
            <h6 className="card-subtitle mb-2">
              <strong>{getInfo3("current", "weather", "description")}</strong>
            </h6>
            <p className="card-text">
              Feels like: {getInfo("current","feels_like")}°C
            </p>
            <h6>
              <span>{getInfo3("current", "weather", "description")}</span>
              <span>{getInfo3("current", "weather", "description")}</span>
              <span>{getInfo3("current", "weather", "description")}</span>
              <span>{getInfo3("current", "weather", "description")}</span>
              <span>{getInfo3("current", "weather", "description")}</span>
              <span></span>
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
