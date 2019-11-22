import React from 'react';
import useUnits from './useUnits'
import './App.css';

function App() {
  const { loading, data, search } = useUnits()
  
  return (
    <main>
      <h2>Catálogo de Unidades</h2>

      <div className="card">
        <input placeholder="Buscar..." onChange={search} />
      </div>

      <div className="card">
        {loading &&
          'Cargando...'
        }

        {(!loading && data.length === 0) &&
          'No se pudieron cargar los datos'
        }

        {data.length > 0 &&
          <UnitsTable units={data} />
        }

      </div>
    </main>
  );
}

function UnitsTable({ units }) {
  return (
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Clave</th>
          <th>Nombre</th>
        </tr>
      </thead>
      <tbody>
        {units.map((unit, i) =>
          <tr key={i}>
            <td>{i + 1}</td>
            <td>{unit.c_ClaveUnidad}</td>
            <td>{unit.Nombre}</td>
          </tr>
        )}
      </tbody>
    </table>
  )
}

export default App;
