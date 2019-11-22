import React from 'react';
import useCountries from './useCountries'
import './App.css';

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
