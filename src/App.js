import React, { useState, useEffect } from 'react';
import './App.css';

function useCountries() {
  const [state, setState] = useState({
    loading: true,
    data: []
  })

  useEffect(() => {
    fetch('https://restcountries.eu/rest/v2/all')
      .then(res => res.json())
      .then(countries => {
        setState({
          loading: false,
          data: countries
        })
      })
  }, [])

  return state
}

function App() {
  const { loading, data } = useCountries()

  return (
    <main>
      <h2>PWA Demo</h2>

      <div className="card">
        {loading &&
          'Loading...'
        }

        {(!loading && data.length === 0) &&
          'Could not load data'
        }

        {data.length > 0 &&
          <CountriesTable countries={data} />
        }

      </div>
    </main>
  );
}

function CountriesTable({ countries }) {
  return (
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Region</th>
          <th>Name</th>
          <th>Capital</th>
        </tr>
      </thead>
      <tbody>
        {countries.map((country, i) =>
          <tr key={i}>
            <td>{i}</td>
            <td>{country.region}</td>
            <td>{country.name}</td>
            <td>{country.capital}</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default App;
