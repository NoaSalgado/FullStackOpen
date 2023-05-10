import { useState } from 'react';
import Country from './Country';

const CountriesList = ({ filteredCountries }) => {
  const [selectedCountry, setSelectedCountry] = useState('');

  const handleClick = (country) => {
    setSelectedCountry(country);
    console.log(country);
  };

  return (
    <>
      {selectedCountry ? (
        <Country country={selectedCountry} />
      ) : (
        <ul>
          {filteredCountries.map((country) => (
            <div key={country.name.common}>
              {country.name.common}{' '}
              <button onClick={() => handleClick(country)}>Show</button>
            </div>
          ))}
        </ul>
      )}
    </>
  );
};

export default CountriesList;
