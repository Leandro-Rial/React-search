import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((res) => {
        setCountries(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    setFilteredCountries(
      countries.filter((country) =>
        country.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, countries]);

  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading Countries</p>;
  }

  const filtered = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="App">
      <h1>COUNTRIES LIST</h1>
      <input
        type="text"
        placeholder="Search Countrie"
        className="alotflags"
        onChange={filtered}
      />
      {filteredCountries.map((country, i) => (
        <CountryDetails key={i} {...country} />
      ))}
    </div>
  );
}

const CountryDetails = (props) => {
  const { name, flag } = props;

  return (
    <div className="paises">
      <p>
        <img src={flag} alt={name} className="flags" />
      </p>
      <h1>{name}</h1>
    </div>
  );
};

export default App;
