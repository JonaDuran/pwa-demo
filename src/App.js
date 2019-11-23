import React from 'react';
import useCountries from './useCountries'
import './App.css';

function App() {
  const { loading, data, search } = useCountries()
  
  return (
    <main>
      <h2>PWA Demo</h2>

      <div className="card">
        <input placeholder="Buscar..." onChange={search} />
      </div>

      <div className="card">
        {loading &&
          <div id="message" className="p">
            Cargando...
          </div>
        }

        {(!loading && data.length === 0) &&
          <div className="p">
            No se pudieron cargar los datos
          </div>
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
            <td>{i + 1}</td>
            <td>{country.region}</td>
            <td>{country.name}</td>
            <td>{country.capital}</td>
          </tr>
        )}
        { countries.length >= 50 &&
          <tr>
            <td colSpan="4">
              Solo se muestran 50 resultados
            </td>
          </tr>
        }
      </tbody>
    </table>
  )
}

export default App;
