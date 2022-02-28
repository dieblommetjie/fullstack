import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Search = (props) => {
  const handleSearchChange = (event) => {
    props.setSearchFilter(event.target.value)
  }
  return (
    <p>
      find countries{" "}
      <input value={props.searchFilter} onChange={handleSearchChange} />
    </p>
  )
}

const Languages = ({country}) => {
  {country.languages.map(language =>(
        <li key={language.name}> {language.name}</li>
    ))}
}

const Show = ({country, setSearchFilter}) => {
  const handleOnClick = (event) => {
    event.preventDefault()
    setSearchFilter(country)
  }
  return (
    <p key={country.numericCode}>{country.name} <button onClick={handleOnClick}>Show</button></p>
  )
}

const Results = ({searchFilter, setSearchFilter}) => {
  const [countries, setCountries] = useState([])

  const hook = () => {
    axios
      .get(`https://restcountries.eu/rest/v2/all`)
      .then(response => {
        setCountries(response.data);
      })
      .catch(function(error) {
        console.log("Error", error.message);
      });
  };
  useEffect(hook, [searchFilter]);

  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  } else if (countries.length > 1 && countries.length < 10) {
    return countries.map(country => (
      <Show country={country} setSearchFilter={setSearchFilter} />
    ));
  } else if (countries.length === 1) {
    return (
      <div>
        <h2>{countries[0].name}</h2>
        <p>capital {countries[0].capital}</p>
        <p>population {countries[0].population}</p>
        <h3>langauges</h3>
        <ul>
          <Languages country={countries[0]} />
        </ul>
        <img
          src={`${countries[0].flag}`}
          alt={`flag of ${countries[0].name}`}
          height="150"
          width="150"
        />
      </div>
    );
  } else {
    return null;
  }
}

const App = () => {
  
  const [searchFilter, setSearchFilter] = useState('')

  return (
    <div>
      <Search searchFilter={searchFilter}
        setSearchFilter={setSearchFilter}/>
      <Results searchFilter={searchFilter} setSearchFilter={setSearchFilter}/>
      
    </div>
  )
}

export default App;
