import { useEffect, useState } from 'react';
import axios from 'axios';

const Country = ({ country }) => {
  const [currentWeather, setCurrentWeather] = useState();
  const {
    name: { common },
    capital,
    languages,
    population,
    flag: { png },
  } = country;

  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY;

    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`
      )
      .then((response) => setCurrentWeather(response.data));
  }, []);

  console.log(currentWeather);

  return (
    <div>
      <h2>{common}</h2>
      <p>Capital {capital}</p>
      <p>Population {population}</p>
      <h3>Languages</h3>
      <ul>
        {Object.values(languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt='flag' />
      {currentWeather ? (
        <>
          <h3>Weather in {capital}</h3>
          <p>Temperature: {currentWeather.current.temperature}</p>
          <img
            src={currentWeather.current.weather_icons[0]}
            alt='weather icon'
          />
          <p>
            Wind: {currentWeather.current.wind_spped}
            {currentWeather.current.wind_dir}
          </p>
        </>
      ) : (
        ''
      )}
    </div>
  );
};

export default Country;
