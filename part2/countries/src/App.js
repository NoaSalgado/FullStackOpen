import { useEffect, useState } from 'react';
import axios from 'axios';
import Error from './components/Error';
import CountriesList from './components/CountriesList';
import Country from './components/Country';

function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleChange = (e) => {
    const search = e.target.value.toLowerCase();
    setFilteredCountries(
      countries.filter((country) =>
        country.name.common.toLowerCase().includes(search)
      )
    );
  };

  return (
    <div>
      <div>
        Find countries: <input type='search' onChange={handleChange} />
        {filteredCountries.length === 0 ? (
          <p>Make a search</p>
        ) : filteredCountries.length > 10 ? (
          <Error />
        ) : filteredCountries.length === 1 ? (
          <Country country={filteredCountries[0]} />
        ) : (
          <CountriesList filteredCountries={filteredCountries} />
        )}
      </div>
    </div>
  );
}

export default App;
